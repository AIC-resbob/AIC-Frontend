import { useState, useEffect } from 'react';
import { MOCK_PRODUCTS } from '../utils/constants';

interface DiscountFormProps {
  loading: boolean;
  onSubmit: (data: { productId: number; currentStock: number; targetDays: number; cogs: number; sellingPrice: number }) => void;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7700';

export default function DiscountForm({ loading, onSubmit }: DiscountFormProps) {
  const [productId, setProductId] = useState<number>(MOCK_PRODUCTS[0]?.id || 1);
  const [currentStock, setCurrentStock] = useState<string>('');
  const [targetDays, setTargetDays] = useState<string>('7');
  const [cogs, setCogs] = useState<string>('');
  const [sellingPrice, setSellingPrice] = useState<string>('');
  const [fetchingProduct, setFetchingProduct] = useState<boolean>(false);

  useEffect(() => {
    const fetchProductData = async () => {
      setFetchingProduct(true);
      const token = localStorage.getItem('stockflow_token') || '';

      try {
        const res = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!res.ok) {
          throw new Error(`Server returned status ${res.status}`);
        }

        const data = await res.json();
        const stockValue = data.inventory?.current_stock ?? data.current_stock ?? data.stock ?? 0;
        
        setCurrentStock(String(stockValue));
        setCogs(String(data.cogs ?? ''));
        setSellingPrice(String(data.selling_price ?? ''));
      } catch (err) {
        console.error("Failed to fetch product data:", err);
      } finally {
        setFetchingProduct(false);
      }
    };

    fetchProductData();
  }, [productId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      productId,
      currentStock: Number(currentStock),
      targetDays: Number(targetDays),
      cogs: Number(cogs),
      sellingPrice: Number(sellingPrice)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">Produk Overstock</label>
        <select 
          value={productId} 
          onChange={(e) => setProductId(Number(e.target.value))} 
          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition text-slate-700 font-medium"
        >
          {MOCK_PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Sisa Stok</label>
          <input 
            type="number" 
            required 
            placeholder={fetchingProduct ? "Loading..." : "0"} 
            value={currentStock} 
            onChange={(e) => setCurrentStock(e.target.value)} 
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition text-slate-700 font-medium" 
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Target Habis (Hari)</label>
          <input 
            type="number" 
            required 
            placeholder="e.g. 7" 
            value={targetDays} 
            onChange={(e) => setTargetDays(e.target.value)} 
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition text-slate-700 font-medium" 
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Modal (Rp)</label>
          <input 
            type="number" 
            required 
            placeholder={fetchingProduct ? "Loading..." : "0"} 
            value={cogs} 
            onChange={(e) => setCogs(e.target.value)} 
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition text-slate-700 font-medium" 
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Jual (Rp)</label>
          <input 
            type="number" 
            required 
            placeholder={fetchingProduct ? "Loading..." : "0"} 
            value={sellingPrice} 
            onChange={(e) => setSellingPrice(e.target.value)} 
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition text-slate-700 font-medium" 
          />
        </div>
      </div>

      <button 
        type="submit" 
        disabled={loading || fetchingProduct} 
        className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-slate-300 flex justify-center items-center mt-2 disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {loading ? <span className="animate-spin text-2xl">⚙️</span> : "Cari Harga Terbaik"}
      </button>
    </form>
  );
}