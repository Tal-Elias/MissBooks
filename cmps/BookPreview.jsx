export function BookPreview({ book }) {
    return (
        <article className="book-preview">
            <h3>Book Title:</h3>
            <h2>{book.title}</h2>
            <h4>Book List price: ${book.listPrice.amount}</h4>
            <img src={`assets/img/${book.thumbnail}`} alt="" />
        </article>
    )
}
