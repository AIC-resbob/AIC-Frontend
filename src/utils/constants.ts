export const MOCK_PRODUCTS = [
  { id: 1, name: "📦 Indomie Goreng" },
  { id: 2, name: "🧃 Sirup ABC Melon" },
  { id: 3, name: "🍚 Beras Pandan Wangi 5Kg" },
  { id: 4, name: "☕ Kopi Kapal Api" }
];

// Bagian bawah ini wajib ada ya!
export interface AIResult {
  title: string;
  highlight: string;
  desc: string;
}