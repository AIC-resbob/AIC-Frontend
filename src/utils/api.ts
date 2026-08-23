
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7700';


export const apiCall = async (endpoint: string, data: any, method: string = 'POST') => {
  try {
    // 1. Ambil token dari brankas browser kalau ada
    const token = localStorage.getItem('stockflow_token');

    // 2. Siapkan Headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    // Kalau token ada, sisipkan di header sebagai 'Bearer Token'
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // 3. Tembak ke server
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: method,
      headers: headers,
      body: JSON.stringify(data),
    });

    // 4. Handle kalau server ngamuk (Error 422, 401, dll)
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      // Seringkali pesan error dari server beda-beda namanya, kita coba tangkap semua kemungkinan
      throw new Error(errorData?.detail || errorData?.message || `Error ${response.status}: Gagal terhubung ke server`);
    }

    // 5. Kembalikan data sukses
    return await response.json();
  } catch (error: any) {
    console.error(`🚨 Error saat nge-hit API ${endpoint}:`, error);
    throw error;
  }
};