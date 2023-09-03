import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)

    useEffect(() => {
        console.log('mount')
        bookService.query()
            .then(setBooks)
    }, [])

    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            {
                <BookList books={books} />
            }
        </section>
    )
}