import type { AIResult } from '../utils/constants';

interface ResultBoxProps {
  result: AIResult;
}

export default function ResultBox({ result }: ResultBoxProps) {
  return (
    <div className="mt-8 p-6 bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 rounded-2xl animate-fade-in relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-violet-500"></div>
      <div className="flex items-start">
        <div className="bg-white p-2 rounded-xl shadow-sm mr-4 border border-indigo-50">✨</div>
        <div>
          <p className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-1">{result.title}</p>
          <h3 className="text-2xl font-extrabold text-slate-800 mb-2">{result.highlight}</h3>
          <p className="text-slate-600 text-sm leading-relaxed font-medium">{result.desc}</p>
        </div>
      </div>
    </div>
  );
}