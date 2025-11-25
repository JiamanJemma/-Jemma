import React, { useState } from 'react';
import { analyzeContent } from './services/geminiService';
import { AnalysisResult, LoadingState, OptimizationRequest } from './types';
import ResultSection from './components/ResultSection';

const App: React.FC = () => {
  const [formData, setFormData] = useState<OptimizationRequest>({
    topic: '',
    currentTitle: '',
    currentDescription: ''
  });
  
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.currentTitle) {
        setErrorMsg('请输入标题');
        return;
    }

    setLoadingState(LoadingState.LOADING);
    setErrorMsg('');
    setResult(null);

    try {
      const data = await analyzeContent(formData);
      setResult(data);
      setLoadingState(LoadingState.SUCCESS);
    } catch (error) {
      console.error(error);
      setLoadingState(LoadingState.ERROR);
      setErrorMsg('分析过程中出现错误，请检查网络或稍后再试。');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Hero Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white pb-24 pt-12 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-4 backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            TitleMaster AI
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto">
            让您的内容脱颖而出。智能分析，一键优化，打造爆款标题与简介。
            </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 -mt-16 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
            {/* Input Form */}
            <div className="p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-1">
                            <label htmlFor="topic" className="block text-sm font-semibold text-slate-700 mb-2">
                                主题 / 领域 <span className="text-slate-400 font-normal">(选填)</span>
                            </label>
                            <input
                                type="text"
                                id="topic"
                                name="topic"
                                value={formData.topic}
                                onChange={handleInputChange}
                                placeholder="例如：数码科技"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none bg-slate-50 focus:bg-white"
                            />
                        </div>
                        <div className="md:col-span-2">
                             <label htmlFor="currentTitle" className="block text-sm font-semibold text-slate-700 mb-2">
                                当前标题 <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="currentTitle"
                                name="currentTitle"
                                value={formData.currentTitle}
                                onChange={handleInputChange}
                                placeholder="例如：iPhone 15 评测"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none bg-slate-50 focus:bg-white font-medium"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="currentDescription" className="block text-sm font-semibold text-slate-700 mb-2">
                            当前简介/正文摘要
                        </label>
                        <textarea
                            id="currentDescription"
                            name="currentDescription"
                            value={formData.currentDescription}
                            onChange={handleInputChange}
                            rows={4}
                            placeholder="输入现有的简介或一段主要内容，AI 将帮助您优化描述..."
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none bg-slate-50 focus:bg-white resize-none"
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loadingState === LoadingState.LOADING || !formData.currentTitle}
                            className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2
                                ${loadingState === LoadingState.LOADING 
                                    ? 'bg-slate-400 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-indigo-500/30'
                                }`}
                        >
                            {loadingState === LoadingState.LOADING ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    AI 正在深度分析...
                                </>
                            ) : (
                                <>
                                    <span>立即优化</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
            
            {/* Error Message */}
            {errorMsg && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 m-8 mb-0 rounded-r-lg">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">{errorMsg}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Loading Skeleton Preview (optional, usually keeps UI stable) */}
            
        </div>
        
        {/* Results Area */}
        <div className="mt-8">
            {result && loadingState === LoadingState.SUCCESS && (
                <ResultSection result={result} />
            )}
        </div>
      </main>
      
      <footer className="mt-12 text-center text-slate-400 text-sm">
        <p>© 2024 TitleMaster AI. Powered by Google Gemini.</p>
      </footer>
    </div>
  );
};

export default App;