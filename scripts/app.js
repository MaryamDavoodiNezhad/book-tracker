import {loadBooks} from './storage.js';
import {renderBook} from './ui.js';

window.addEventListener('DOMContentLoaded' , ()=>{
    const btnShow = document.getElementById('show-books');
    if(!btnShow)return

    btnShow.addEventListener('click' , async()=>{
        // Loading data
        const allBooks = await loadBooks();
        console.log(allBooks);

        // Render books
        renderBook(allBooks);
        
    })
})