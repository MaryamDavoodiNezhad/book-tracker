const STORAGE_KEY = "books";

export async function loadBooks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);

    const response = await fetch("data/books.json");
    if (!response.ok) throw new Error("Network was not ok");
    const data = await response.json();
    return data.books || [];
  } catch (error) {
    console.error("fetching has error", error);
    return [];
  }
}



// Convert array in localstorage to json
export function saveBook(books) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}



