import { useState } from 'react';
import { MOCK_PRODUCTS } from '../utils/constants';

interface RestockFormProps {
  loading: boolean;
  onSubmit: (data: { productId: number; currentStock: number; targetDays: number }) => void;
}

export default function RestockForm({ loading, onSubmit }: RestockFormProps) {
  const [form, setForm] = useState({ productId: 1, currentStock: '', targetDays: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      productId: form.productId,
      currentStock: Number(form.currentStock),
      targetDays: Number(form.targetDays)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">Pilih Produk</label>
        <select value={form.productId} onChange={(e) => setForm({ ...form, productId: Number(e.target.value) })} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition text-slate-700 font-medium">
          {MOCK_PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Sisa Stok (Pcs)</label>
          <input type="number" required placeholder="0" value={form.currentStock} onChange={(e) => setForm({ ...form, currentStock: e.target.value })} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition text-slate-700 font-medium" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Target Kulakan (Hari)</label>
          <input type="number" required placeholder="0" value={form.targetDays} onChange={(e) => setForm({ ...form, targetDays: e.target.value })} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition text-slate-700 font-medium" />
        </div>
      </div>
      <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-indigo-200 flex justify-center items-center mt-2 disabled:opacity-70 disabled:hover:translate-y-0">
        {loading ? <span className="animate-spin text-2xl">⚙️</span> : "Mulai Analisis AI"}
      </button>
    </form>
  );
}