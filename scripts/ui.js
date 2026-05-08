import { saveBook } from "./storage.js";

export async function renderBook(books = []) {
  const cardTemplate = document.getElementById("container-cards-books");
  const container = document.getElementById("books-container");

  if (!container || !cardTemplate) return;

  // Remove the previous ones
  container.innerHTML = "";
  container.classList.remove("pic-cover");

  if (books.length === 0) {
    container.classList.add("pic-cover");
    return;
  }

  // For better speed a DocumentFragment
  const frag = document.createDocumentFragment();

  // If there is book
  books.forEach((book) => {
    const clone = cardTemplate.content.cloneNode(true);

    //   Fill in the fields

    clone.querySelector(".book-title").textContent = book.name;
    clone.querySelector(".book-type").textContent = book.type;
    clone.querySelector(".book-author").textContent = book.author;
    const imgBook = clone.querySelector(".book-cover");
    imgBook.src = book.coverImage;

    // Add id to card
    const card = clone.querySelector(".book-card");
    card.dataset.id = book.id;

    // Assign a unique name to each book
    const groupName = `status-${book.id}`;
    clone.querySelectorAll('input[name = "status"]').forEach((r) => {
      r.name = groupName;
    });

    // Apply the saved state
    if (book.status) {
      const input = clone.querySelector(
        `input[type="radio"][value="${book.status}"]`,
      );
      if (input) input.checked = true;
    }

    //  const inputs = clone.querySelectorAll('input[name="status"]');
    // inputs.forEach(i => {
    //   if (i.value === book.status) i.checked = true;
    // });

    frag.appendChild(clone);
  });
  container.appendChild(frag);
}

// check read - reading - unread - remove

export function statusHandlers(books) {
  const cardBook = document.getElementById("books-container");
  if (!cardBook) return;

  // When status is selected, temporarily save to card
  cardBook.addEventListener("change", async (e) => {
    const input = e.target;
    if (input.type !== "radio") return;

    const card = input.closest(".book-card");
    if (!card) return;

    card.dataset.pendingStatus = input.value;
  });

  // When save is hit, save to localStorage
  cardBook.addEventListener("click", (e) => {
    if (!e.target.classList.contains("btnSave")) return;

    const card = e.target.closest(".book-card");
    if (!card) return;

    const id = Number(card.dataset.id);

  // اگر نبود، از رادیوی checked بخوان
  const newStatus = card.dataset.pendingStatus;
  if (!newStatus) {
    const checked = card.querySelector('input[type="radio"]:checked');
    if (checked) newStatus = checked.value;
  }

  if (!newStatus) return;

  // remove book from array
  if (newStatus === "remove") {
    const index = books.findIndex(b => b.id === id); // ✅ اینجا درست شد
    if (index !== -1) {
      books.splice(index, 1);
      saveBook(books);
      card.remove();
      alert('کتاب با موفقیت حذف شد ✅');
    }
    return;
  }

  const book = books.find(b => b.id === id);
  if (book) {
    book.status = newStatus;
    saveBook(books);
    alert('وضعیت ذخیره شد ✅');
  }
});
}
