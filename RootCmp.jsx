const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM

import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"

export function App() {
    return (
        <Router>
        <section className="app main-layout">
            <AppHeader />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/book/:bookId" element={<BookDetails />} />
                    <Route path="/book/edit/:bookId" element={<BookEdit />} />
                    <Route path="/book/edit" element={<BookEdit />} />
                    <Route path="/book" element={<BookIndex />} />
                </Routes>
            </main>
        </section>
        </Router>
    )
}