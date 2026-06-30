import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    isbn: "",
    quantity: "",
    available: "",
    published_year: "",
  });

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/books/${id}`);
      setBook(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const updateBook = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/books/${id}`, book);

      alert("Book Updated Successfully");

      navigate("/books");
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form
        onSubmit={updateBook}
        className="bg-white p-10 rounded-xl shadow-lg w-150"
      >
        <h1 className="text-3xl font-bold mb-8">Edit Book</h1>

        <input
          className="border p-3 w-full mb-4"
          name="title"
          placeholder="Title"
          value={book.title}
          onChange={handleChange}
        />

        <input
          className="border p-3 w-full mb-4"
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handleChange}
        />

        <input
          className="border p-3 w-full mb-4"
          name="category"
          placeholder="Category"
          value={book.category}
          onChange={handleChange}
        />

        <input
          className="border p-3 w-full mb-4"
          name="isbn"
          placeholder="ISBN"
          value={book.isbn}
          onChange={handleChange}
        />

        <input
          className="border p-3 w-full mb-4"
          name="quantity"
          placeholder="Quantity"
          value={book.quantity}
          onChange={handleChange}
        />

        <input
          className="border p-3 w-full mb-4"
          name="available"
          placeholder="Available"
          value={book.available}
          onChange={handleChange}
        />

        <input
          className="border p-3 w-full mb-6"
          name="published_year"
          placeholder="Published Year"
          value={book.published_year}
          onChange={handleChange}
        />

        <button className="bg-blue-700 text-white px-8 py-3 rounded">
          Update Book
        </button>
      </form>
    </div>
  );
}

export default EditBook;
