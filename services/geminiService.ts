import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, OptimizationRequest } from "../types";

const apiKey = process.env.API_KEY;

// Initialize the client
const ai = new GoogleGenAI({ apiKey: apiKey });

export const analyzeContent = async (data: OptimizationRequest): Promise<AnalysisResult> => {
  const modelId = "gemini-2.5-flash";

  const prompt = `
    作为一位世界级的文案撰写专家和SEO优化大师，请分析用户提供的主题、当前标题和简介。
    
    用户输入信息:
    - 主题/领域: ${data.topic || "未指定"}
    - 当前标题: ${data.currentTitle}
    - 当前简介: ${data.currentDescription}

    任务:
    1. 给当前内容的吸引力、简洁性和点击率潜力打分（0-100分）。
    2. 提供一段简短犀利的点评，指出问题所在（例如：太长、无聊、缺乏关键词等）。
    3. 提供 5 个优化后的标题建议。要求：简练、吸引人、有爆款潜质，使用引发好奇或情感共鸣的技巧。
    4. 提供 3 个优化后的简介建议。要求：精准概括、引导点击、包含关键信息。

    请以 JSON 格式输出结果。
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { 
              type: Type.INTEGER, 
              description: "0 to 100 score representing quality" 
            },
            critique: { 
              type: Type.STRING, 
              description: "A short, sharp critique of the current content in Chinese" 
            },
            improvedTitles: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List of 5 optimized titles in Chinese"
            },
            improvedDescriptions: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List of 3 optimized descriptions in Chinese"
            }
          },
          required: ["score", "critique", "improvedTitles", "improvedDescriptions"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini");
    }

    return JSON.parse(text) as AnalysisResult;

  } catch (error) {
    console.error("Error analyzing content:", error);
    throw error;
  }
};