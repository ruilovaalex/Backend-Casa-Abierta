
import { GoogleGenAI } from "@google/genai";

// @google/genai Coding Guidelines followed: Using ai.models.generateContent directly and response.text property.
export const getChefExplanation = async (userQuery: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Actúa como un Ingeniero Backend Senior explicando a estudiantes de primer ciclo. 
      Explica de forma clara, directa y muy sencilla el siguiente concepto: "${userQuery}". 
      No uses analogías de cocina. Usa ejemplos de aplicaciones reales como Facebook, WhatsApp o Netflix. 
      Máximo 2 párrafos cortos.`,
      config: {
        temperature: 0.6,
        topP: 0.8,
      }
    });
    
    // Using .text property instead of a method as per latest guidelines
    return response.text || "No pude procesar la explicación en este momento.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error de conexión con el servidor educativo.";
  }
};
