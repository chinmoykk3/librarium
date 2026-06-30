import { useEffect, useState } from "react";
import axios from "axios";

import MainLayout from "../layouts/MainLayout";
import BookCard from "../components/BookCard";

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books");
      setBooks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBook = async (id) => {
    if (!window.confirm("Delete this book?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);

      fetchBooks();
    } catch (err) {
      console.log(err);
    }
  };

  const editBook = (id) => {
    window.location.href = `/edit-book/${id}`;
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Books</h1>

        <button
          onClick={() => (window.location.href = "/add-book")}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
        >
          + Add Book
        </button>
      </div>

      {books.length === 0 ? (
        <div className="text-center text-gray-500 mt-20 text-xl">
          No Books Found
        </div>
      ) : (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onEdit={editBook}
              onDelete={deleteBook}
            />
          ))}
        </div>
      )}
    </MainLayout>
  );
}

export default Books;
