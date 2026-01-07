import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { PRODUCTS } from "../constants";

// Helper to format currency for the AI context
const formatPrice = (price: number) => `Rp ${price.toLocaleString('id-ID')}`;

const productContext = PRODUCTS.map(p => 
  `- ${p.name} (${p.category}): ${formatPrice(p.price)}. ${p.description}`
).join('\n');

const SYSTEM_INSTRUCTION = `
Anda adalah "Esa Stylist", asisten belanja pribadi yang ramah, elegan, dan profesional untuk toko online "ESA CANTIK".
Tugas Anda adalah membantu pelanggan menemukan produk kecantikan dan fashion yang tepat dari katalog kami.

Berikut adalah daftar produk yang tersedia di toko kami:
${productContext}

Panduan:
1. Hanya rekomendasikan produk yang ada di daftar di atas.
2. Gunakan bahasa Indonesia yang sopan, menarik, dan sedikit mewah ("memukau").
3. Jika pelanggan bertanya tentang masalah kulit atau gaya, berikan saran yang relevan dan tawarkan produk kami sebagai solusi.
4. Jawablah dengan ringkas (maksimal 3-4 kalimat) agar mudah dibaca di chat widget.
5. Jangan pernah meminta informasi kartu kredit atau password.

Jika user menyapa, sambutlah dengan hangat, sebut nama toko "ESA CANTIK".
`;

let aiClient: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!aiClient) {
    const apiKey = process.env.API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({ apiKey });
    } else {
      console.warn("API Key not found via process.env.API_KEY");
    }
  }
  return aiClient;
};

export const getBeautyAdvice = async (userMessage: string): Promise<string> => {
  const client = getAiClient();
  if (!client) {
    return "Maaf, layanan Stylist AI sedang tidak tersedia saat ini (API Key missing).";
  }

  try {
    const response: GenerateContentResponse = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });
    
    return response.text || "Maaf, saya sedang merias diri. Bisa ulangi pertanyaan Anda?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Maaf, ada gangguan koneksi sejenak. Silakan coba lagi nanti.";
  }
};