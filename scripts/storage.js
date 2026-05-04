export async function loadBooks() {
    try {
        const response = await fetch("data/books.json");
        if(!response.ok){
            throw new Error("Network was not ok");
                       }
        
            const data = await response.json();
            return data;
            

    }
    catch(error){
        console.error("fetching has error", error);
    }
    
}