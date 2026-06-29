import { useEffect, useState } from "react";
import axios from "axios";

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books");
      setBooks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-8">📚 All Books</h1>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-blue-700 text-white">
          <tr>
            <th className="p-3">ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>ISBN</th>
            <th>Quantity</th>
            <th>Available</th>
            <th>Year</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="border-b text-center">
              <td className="p-3">{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>{book.isbn}</td>
              <td>{book.quantity}</td>
              <td>{book.available}</td>
              <td>{book.published_year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Books;
