import {loadBooks} from './storage.js';

document.getElementById("show-books").addEventListener("click" ,async ()=>{
    console.log("data");
    
    const allBooks = await loadBooks();
    console.log(allBooks);    
    
})