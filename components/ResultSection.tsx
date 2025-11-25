import React from 'react';
import { AnalysisResult } from '../types';
import ScoreGauge from './ScoreGauge';

interface ResultSectionProps {
  result: AnalysisResult;
}

const ResultSection: React.FC<ResultSectionProps> = ({ result }) => {
  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Overview Card */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-shrink-0">
          <ScoreGauge score={result.score} />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">AI 诊断点评</h3>
          <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-200">
            "{result.critique}"
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Improved Titles */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
          <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 className="font-semibold text-indigo-900">推荐爆款标题</h3>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              {result.improvedTitles.map((title, index) => (
                <li key={index} className="flex gap-3 items-start group">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-slate-700 font-medium select-all hover:text-indigo-700 transition-colors cursor-pointer" title="点击复制">
                    {title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Improved Descriptions */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
          <div className="bg-purple-50 px-6 py-4 border-b border-purple-100 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            <h3 className="font-semibold text-purple-900">精选简介优化</h3>
          </div>
          <div className="p-6">
            <ul className="space-y-6">
              {result.improvedDescriptions.map((desc, index) => (
                <li key={index} className="flex gap-3 items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold mt-0.5">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <p className="text-slate-600 text-sm leading-relaxed select-all hover:text-purple-700 transition-colors cursor-pointer">
                    {desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultSection;