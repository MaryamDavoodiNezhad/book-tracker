import {loadBooks, saveBook} from './storage.js';
import {renderBook,statusHandlers} from './ui.js';

window.addEventListener('DOMContentLoaded' , ()=>{
    const btnShow = document.getElementById('show-books');
    if(!btnShow)return

    btnShow.addEventListener('click' , async()=>{
        // Loading data
        const allBooks = await loadBooks();
        // console.log(allBooks);

        // Render books
        renderBook(allBooks);
        statusHandlers(allBooks);

        // اگر برای اولین بار از JSON آمد، ذخیره کن
    if (!localStorage.getItem("books")) {
        saveBook(allBooks);
}
    })
})

// check read - reading - unread - remove
