import { LongTxt } from "../cmps/LongTxt.jsx"
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails() {

    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        bookService.get(params.bookId)
            .then(setBook)
            .catch(err => {
                console.log('err:', err)
                navigate('/book')
            })
    }, [])

    function onBack() {
        navigate('/book')
    }

    if (!book) return <div>Loading...</div>
    return (
        <section className="book-details">
            <h1>Book Title: {book.title}</h1>
            <h1>Authors: {book.authors}</h1>
            <h1>Categories: {book.categories.join(', ')}</h1>
            <h1>Description:</h1>
            {<LongTxt txt={book.description} length={100} />}
            <button onClick={onBack}>Back</button>
        </section>
    )
}