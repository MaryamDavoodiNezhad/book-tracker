export async function renderBook(books = []) {
    const cardTemplate = document.getElementById('container-cards-books');
    const container = document.getElementById('books-container');

    if(!container || !cardTemplate) return

    // Remove the previous ones
    container.innerHTML = '';
    container.classList.remove('pic-cover');

      if (books.length === 0) {
    container.classList.add('pic-cover');
    return;
  }

    // For better speed a DocumentFragment 
    const frag = document.createDocumentFragment();

    // If there is book
    books.forEach(book  => {
      const clone = cardTemplate.content.cloneNode(true);

    //   Fill in the fields
    clone.querySelector('.book-title').textContent = book.name;
    clone.querySelector('.book-type').textContent   = book.type;
    clone.querySelector('.book-author').textContent = book.author;
    const imgBook = clone.querySelector('.book-cover');
    imgBook.src = book.coverImage;
    

    frag.appendChild(clone);

    });
    container.appendChild(frag);
}