import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { PRODUCTS } from "../constants.ts";

const formatPrice = (price: number) => `Rp ${price.toLocaleString('id-ID')}`;

const productContext = PRODUCTS.map(p => 
  `- ${p.name} (${p.category}): ${formatPrice(p.price)}. ${p.description}`
).join('\n');

const SYSTEM_INSTRUCTION = `
Anda adalah "Esa Stylist", asisten belanja pribadi yang ramah, elegan, dan profesional untuk toko online "ESA CANTIK".
Tugas Anda adalah membantu pelanggan menemukan produk kecantikan dan fashion yang tepat dari katalog kami.

Katalog Produk:
${productContext}

Panduan:
1. Hanya rekomendasikan produk yang tersedia.
2. Gunakan bahasa Indonesia yang elegan dan memikat.
3. Jawab maksimal 3 kalimat.
`;

let aiClient: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!aiClient) {
    // Cek keberadaan process.env secara aman untuk browser
    const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : null;
    if (apiKey) {
      aiClient = new GoogleGenAI({ apiKey });
    }
  }
  return aiClient;
};

export const getBeautyAdvice = async (userMessage: string): Promise<string> => {
  const client = getAiClient();
  if (!client) return "Maaf, asisten AI sedang beristirahat.";

  try {
    const response: GenerateContentResponse = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: { systemInstruction: SYSTEM_INSTRUCTION }
    });
    return response.text || "Saya tidak mengerti, bisa ulangi?";
  } catch (error) {
    return "Ada kendala teknis, coba lagi nanti ya cantik.";
  }
};