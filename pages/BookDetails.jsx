import { LongTxt } from "../cmps/LongTxt.jsx"
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack }) {

    const [book, setBook] = useState(null)

    useEffect(() => {
        bookService.get(bookId).then(setBook)
    }, [])

    if (!book) return <div>Loading...</div>
    return (
        <section className="book-details">
            <h1>Book Title: {book.title}</h1>
            <h1>Authors: {book.authors}</h1>
            <h1>Categories: {book.categories.slice(0, -1).map(category =>
                category + ', ')}{book.categories.slice(-1)}</h1>
            <h1>Description:</h1>
            {<LongTxt txt={book.description} length={100} />}
            <button onClick={onBack}>Back</button>
        </section>
    )
}