import { AddReview } from "../cmps/AddReview.jsx"
import { LongTxt } from "../cmps/LongTxt.jsx"
import { ReviewList } from "../cmps/ReviewList.jsx"
import { bookService } from "../services/book.service.js"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails() {

    const [book, setBook] = useState(null)
    const [isReview, setIsReview] = useState(false)
    const { bookId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        bookService.get(bookId)
            .then(setBook)
            .catch(err => {
                console.log('err:', err)
                navigate('/book')
            })
    }, [bookId])

    function onBack() {
        navigate('/book')
    }

    function setReadingLevel(pageCount) {
        if (pageCount > 500) return ' / Serious Reading'
        if (pageCount > 200) return ' / Decent Reading'
        if (pageCount < 100) return ' / Light Reading'
    }

    function setBookAge(publishedDate) {
        if (new Date().getFullYear() - publishedDate > 10) return ' / Vintage'
        if (new Date().getFullYear() - publishedDate < 1) return ' / New'
    }

    function setBookPriceRange(amount) {
        if (amount > 150) return 'red'
        if (amount < 20) return 'green'
    }

    function onAddReview(reviewToAdd) {
        console.log('review to add', reviewToAdd);
        bookService.addReview(bookId, reviewToAdd)
            .then(updatedBook => {
                setBook(updatedBook)
                setIsReview(false)
                showSuccessMsg('Review saved successfully')
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Error saving review')
            })
    }

    function onDeleteReview(reviewId) {
        bookService
            .deleteReview(bookId, reviewId)
            .then(savedBook => {
                setBook(savedBook)
                showSuccessMsg('Review deleted successfully')
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Error deleting review')
                navigate('/book')
            })
    }

    if (!book) return <div>Loading...</div>
    return (
        <section className="book-details">
            <h1>{book.title}</h1>
            <h2>{book.subtitle}</h2>
            <h2>Authors: {book.authors.join(', ')}</h2>
            <h3>
                Published: {book.publishedDate}
                {setBookAge(book.publishedDate)}
            </h3>
            <h1>Description:</h1>
            {<LongTxt txt={book.description} length={100} />}
            <h3>
                Page Count: {book.pageCount}
                {setReadingLevel(book.pageCount)}
            </h3>
            <h1>Categories: {book.categories.join(', ')}</h1>
            <img src={`assets/img/${book.thumbnail}`} alt="" />
            <h3>Language: {book.language}</h3>
            <h2 className={setBookPriceRange(book.listPrice.amount)}>
                Price: {book.listPrice.amount + ' ' + book.listPrice.currencyCode}
            </h2>
            <button onClick={() => setIsReview(!isReview)}>Add Review</button>
            {isReview && <AddReview onAddReview={onAddReview} />}
            <section className='reviews'>
                <h4>Reviews:</h4>
                {(book.reviews && book.reviews.length && (
                    <ReviewList reviews={book.reviews} onDeleteReview={onDeleteReview} />)) || 'No Reviews'}
            </section>
            <button onClick={onBack}>Back</button>
        </section>
    )
}