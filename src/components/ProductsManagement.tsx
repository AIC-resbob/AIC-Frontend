import { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7700';

interface Product {
  id: number;
  name: string;
  category: string;
  inventory?: {
    current_stock: number;
    cogs: number;
    selling_price: number;
    days_to_expire: number;
  };
}

export default function ProductsManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [currentStock, setCurrentStock] = useState('');
  const [cogs, setCogs] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [daysToExpire, setDaysToExpire] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    const token = localStorage.getItem('stockflow_token') || '';
    try {
      const res = await fetch(`${API_BASE_URL}/api/products`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEditClick = (product: Product) => {
    setEditingProductId(product.id);
    setName(product.name);
    setCategory(product.category);
    setCurrentStock(String(product.inventory?.current_stock ?? ''));
    setCogs(String(product.inventory?.cogs ?? ''));
    setSellingPrice(String(product.inventory?.selling_price ?? ''));
    setDaysToExpire(String(product.inventory?.days_to_expire ?? ''));
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
    setName('');
    setCategory('');
    setCurrentStock('');
    setCogs('');
    setSellingPrice('');
    setDaysToExpire('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    const token = localStorage.getItem('stockflow_token') || '';
    const url = editingProductId ? `${API_BASE_URL}/api/products/${editingProductId}` : `${API_BASE_URL}/api/products`;
    const method = editingProductId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          category,
          inventory: {
            current_stock: Number(currentStock),
            cogs: Number(cogs),
            selling_price: Number(sellingPrice),
            days_to_expire: Number(daysToExpire)
          }
        })
      });
      if (res.ok) {
        handleCancelEdit();
        fetchProducts();
      } else {
        const errData = await res.json();
        alert(`Failed to save product: ${JSON.stringify(errData)}`);
      }
    } catch (err) {
      console.error("Failed to save product:", err);
      alert("Error saving product");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <form onSubmit={handleSubmit} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm">
        <h3 className="text-[15px] font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="text-indigo-600 bg-indigo-100 w-6 h-6 rounded-full flex items-center justify-center text-sm">{editingProductId ? '✎' : '+'}</span> {editingProductId ? 'Update Produk' : 'Tambah Produk Baru'}
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Nama Produk</label>
            <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition text-slate-700 text-sm font-medium" placeholder="e.g. Mie Instan" />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Kategori</label>
            <input type="text" required value={category} onChange={e => setCategory(e.target.value)} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition text-slate-700 text-sm font-medium" placeholder="e.g. Makanan" />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Stok Awal (Pcs)</label>
            <input type="number" required min="0" value={currentStock} onChange={e => setCurrentStock(e.target.value)} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition text-slate-700 text-sm font-medium" placeholder="0" />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Modal / HPP (Rp)</label>
            <input type="number" required min="0" value={cogs} onChange={e => setCogs(e.target.value)} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition text-slate-700 text-sm font-medium" placeholder="0" />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Harga Jual (Rp)</label>
            <input type="number" required min="0" value={sellingPrice} onChange={e => setSellingPrice(e.target.value)} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition text-slate-700 text-sm font-medium" placeholder="0" />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Kedaluwarsa (Hari)</label>
            <input type="number" required min="0" value={daysToExpire} onChange={e => setDaysToExpire(e.target.value)} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition text-slate-700 text-sm font-medium" placeholder="e.g. 30" />
          </div>
        </div>

        <div className="flex gap-3">
          {editingProductId && (
            <button 
              type="button" 
              onClick={handleCancelEdit}
              disabled={creating}
              className="w-1/3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-3 px-6 rounded-xl transition-all duration-300 text-[14px]"
            >
              Batal
            </button>
          )}
          <button 
            type="submit" 
            disabled={creating} 
            className="flex-1 bg-slate-900 hover:bg-black text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-slate-300 flex justify-center items-center disabled:opacity-70 disabled:hover:translate-y-0 text-[14px]"
          >
            {creating ? <span className="animate-spin mr-2">⚙️</span> : null}
            {creating ? "Menyimpan..." : (editingProductId ? "Update Produk" : "Simpan Produk")}
          </button>
        </div>
      </form>

      <div>
        <h3 className="text-[15px] font-bold text-slate-800 mb-3">Daftar Produk</h3>
        {loading ? (
          <div className="text-center py-6 text-slate-500 text-sm font-medium">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-6 text-slate-500 bg-slate-50 rounded-2xl border border-slate-100 text-sm font-medium">Belum ada produk.</div>
        ) : (
          <div className="space-y-2.5 max-h-[250px] overflow-y-auto pr-1">
            {products.map(p => (
              <div key={p.id} className="bg-white border border-slate-200 p-3.5 rounded-xl flex justify-between items-center hover:border-indigo-300 transition-colors shadow-sm">
                <div>
                  <div className="font-bold text-slate-800 text-sm">{p.name}</div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">{p.category}</div>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                  <div className="font-bold text-indigo-600 text-sm">{p.inventory?.current_stock ?? 0} Pcs</div>
                  <div className="text-[12px] font-medium text-slate-500">Rp {(p.inventory?.selling_price ?? 0).toLocaleString('id-ID')}</div>
                  <button type="button" onClick={() => handleEditClick(p)} className="text-[10px] bg-slate-100 hover:bg-indigo-100 text-indigo-600 font-bold py-1 px-3 rounded-lg transition-colors mt-1">Edit</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
