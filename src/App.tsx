import { useState } from 'react';
import RestockForm from './components/RestockForm';
import DiscountForm from './components/DiscountForm';
import ResultBox from './components/ResultBox';
import AuthForm from './components/AuthForm';
import type { AIResult } from './utils/constants';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'restock' | 'discount'>('restock');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIResult | null>(null);

  const handleRestockSubmit = async (data: any) => {
    setLoading(true);
    setResult(null);
    console.log("Kirim data Restock ke server:", data);
    
    setTimeout(() => {
      setResult({
        title: "Rekomendasi Restock AI",
        highlight: "36 Pcs",
        desc: "Tren penjualan stabil. Jumlah ini optimal untuk target hari ke depan tanpa risiko overstock."
      });
      setLoading(false);
    }, 1500);
  };

  const handleDiscountSubmit = async (data: any) => {
    setLoading(true);
    setResult(null);
    console.log("Kirim data Diskon ke server:", data);

    setTimeout(() => {
      setResult({
        title: "Strategi Clearance AI",
        highlight: "Diskon 15% (Rp 12.750)",
        desc: "Harga aman di atas batas modal. Probabilitas stok habis mencapai 88%."
      });
      setLoading(false);
    }, 1500);
  };

  return (
    // Background diubah jadi lebih deep dan bertekstur
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 sm:p-8 font-sans selection:bg-indigo-100 selection:text-indigo-900 relative overflow-hidden">
      
      {/* Efek Glow Natural di Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-200/40 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-200/40 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Main Container - Dibuat lebih tipis border-nya dan shadow-nya lebih smooth */}
      <div className="bg-white/90 backdrop-blur-2xl w-full max-w-[540px] rounded-[32px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100/50 overflow-hidden relative z-10">
        
        {/* Header Section */}
        <div className="pt-10 pb-6 px-8 text-center flex flex-col items-center">
          <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200/50 mb-5 transform -rotate-3 transition-transform hover:rotate-0 duration-300">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-[32px] font-bold text-slate-800 tracking-tight leading-tight">
            StockFlow <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">AI</span>
          </h1>
          <p className="text-slate-500 text-[15px] mt-2 font-medium">Retail Supply Chain Assistant</p>
        </div>

        {/* LOGIC HALAMAN */}
        {!isAuthenticated ? (
          <div className="px-8 pb-10">
            <AuthForm onSuccess={() => setIsAuthenticated(true)} />
          </div>
        ) : (
          <>
            <div className="px-8 pb-6">
              {/* Pill Tabs - Dibuat lebih natural kayak iOS */}
              <div className="flex p-1.5 bg-slate-100/80 rounded-2xl">
                <button 
                  onClick={() => { setActiveTab('restock'); setResult(null); }}
                  className={`flex-1 py-2.5 px-4 text-[14px] font-semibold rounded-xl transition-all duration-300 ${activeTab === 'restock' ? 'bg-white text-slate-800 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.1)]' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Restock
                </button>
                <button 
                  onClick={() => { setActiveTab('discount'); setResult(null); }}
                  className={`flex-1 py-2.5 px-4 text-[14px] font-semibold rounded-xl transition-all duration-300 ${activeTab === 'discount' ? 'bg-white text-slate-800 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.1)]' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Discount
                </button>
              </div>
            </div>

            <div className="px-8 pb-10">
              {activeTab === 'restock' ? (
                <RestockForm loading={loading} onSubmit={handleRestockSubmit} />
              ) : (
                <DiscountForm loading={loading} onSubmit={handleDiscountSubmit} />
              )}
              {result && !loading && <ResultBox result={result} />}
            </div>
          </>
        )}

      </div>
    </div>
  );
}