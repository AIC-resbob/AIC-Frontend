import { useState, useEffect } from 'react';
import { MOCK_PRODUCTS } from '../utils/constants';

interface RestockFormProps {
  loading: boolean;
  onSubmit: (data: { productId: number; targetDays: number }) => void;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7700';

export default function RestockForm({ loading, onSubmit }: RestockFormProps) {
  const [productId, setProductId] = useState<number>(MOCK_PRODUCTS[0]?.id || 1);
  const [currentStock, setCurrentStock] = useState<number | null>(null);
  const [targetDays, setTargetDays] = useState<string>('');
  const [fetchingStock, setFetchingStock] = useState<boolean>(false);

  useEffect(() => {
    const fetchStock = async () => {
      setFetchingStock(true);
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
        setCurrentStock(stockValue);
      } catch (err) {
        console.error("Failed to fetch product stock:", err);
        setCurrentStock(0);
      } finally {
        setFetchingStock(false);
      }
    };

    fetchStock();
  }, [productId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      productId,
      targetDays: Number(targetDays)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">Pilih Produk</label>
        <select 
          value={productId} 
          onChange={(e) => setProductId(Number(e.target.value))} 
          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition text-slate-700 font-medium"
        >
          {MOCK_PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Stok Saat Ini (Server)</label>
          <div className="w-full p-4 bg-slate-100 border border-slate-200 rounded-xl text-slate-600 font-semibold">
            {fetchingStock ? "Loading..." : `${currentStock ?? 0} Pcs`}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Target Kulakan (Hari)</label>
          <input 
            type="number" 
            required 
            placeholder="e.g. 7" 
            value={targetDays} 
            onChange={(e) => setTargetDays(e.target.value)} 
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition text-slate-700 font-medium" 
          />
        </div>
      </div>

      <button 
        type="submit" 
        disabled={loading || fetchingStock} 
        className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-indigo-200 flex justify-center items-center mt-2 disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {loading ? <span className="animate-spin text-2xl">⚙️</span> : "Mulai Analisis AI"}
      </button>
    </form>
  );
}