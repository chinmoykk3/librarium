import React from "react";

function BookCard({ book, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
      {/* Header */}
      <div className="h-40 bg-linear-to-r from-blue-600 to-purple-600 flex items-center justify-center">
        <span className="text-7xl">📚</span>
      </div>

      {/* Body */}
      <div className="p-5">
        <h2 className="text-xl font-bold mb-2">{book.title}</h2>

        <p className="text-gray-600">
          <strong>Author:</strong> {book.author}
        </p>

        <p className="text-gray-600">
          <strong>Category:</strong> {book.category}
        </p>

        <p className="text-gray-600">
          <strong>ISBN:</strong> {book.isbn}
        </p>

        <p className="text-gray-600">
          <strong>Quantity:</strong> {book.quantity}
        </p>

        <p className="text-gray-600">
          <strong>Available:</strong> {book.available}
        </p>

        <p className="text-gray-600 mb-5">
          <strong>Year:</strong> {book.published_year}
        </p>

        <div className="flex justify-between">
          <button
            onClick={() => onEdit(book.id)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(book.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
