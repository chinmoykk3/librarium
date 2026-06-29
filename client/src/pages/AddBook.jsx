import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddBook() {
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    isbn: "",
    quantity: "",
    published_year: "",
  });

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/books", {
        ...book,
        available: book.quantity,
      });

      alert("Book Added Successfully");

      navigate("/books");
    } catch (err) {
      console.log(err);
      alert("Error Adding Book");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-xl shadow-xl w-[700px]"
      >
        <h1 className="text-3xl font-bold mb-8">📚 Add Book</h1>

        <input
          type="text"
          name="title"
          placeholder="Book Title"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="author"
          placeholder="Author"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
        />

        <input
          type="text"
          name="isbn"
          placeholder="ISBN"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
        />

        <input
          type="number"
          name="published_year"
          placeholder="Published Year"
          className="w-full border p-3 rounded mb-6"
          onChange={handleChange}
        />

        <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded">
          Add Book
        </button>
      </form>
    </div>
  );
}

export default AddBook;
