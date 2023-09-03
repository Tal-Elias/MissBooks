export function BookPreview({ book }) {
    return (
        <article className="book-preview">
            <h2>Book Title: <br></br>{book.title}</h2>
            <h4>Book List price: ${book.listPrice.amount}</h4>
            <img src={`assets/img/${book.thumbnail}`} alt="" />
        </article>
    )
}
