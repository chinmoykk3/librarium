import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function IssueBook() {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [books, setBooks] = useState([]);

  const [memberId, setMemberId] = useState("");
  const [bookId, setBookId] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    fetchMembers();
    fetchBooks();
  }, []);

  const fetchMembers = async () => {
    const res = await axios.get("http://localhost:5000/api/members");
    setMembers(res.data);
  };

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:5000/api/books");
    setBooks(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/borrowings", {
        member_id: memberId,
        book_id: bookId,
        issue_date: issueDate,
        due_date: dueDate,
      });

      alert("Book Issued Successfully");

      navigate("/borrowings");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-125"
      >
        <h1 className="text-3xl font-bold mb-8">Issue Book</h1>

        <label>Member</label>

        <select
          className="w-full border p-3 rounded mt-2 mb-6"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          required
        >
          <option value="">Select Member</option>

          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.full_name}
            </option>
          ))}
        </select>

        <label>Book</label>

        <select
          className="w-full border p-3 rounded mt-2 mb-6"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          required
        >
          <option value="">Select Book</option>

          {books.map((b) => (
            <option key={b.id} value={b.id}>
              {b.title} ({b.available} Available)
            </option>
          ))}
        </select>

        <label>Issue Date</label>

        <input
          type="date"
          className="w-full border p-3 rounded mt-2 mb-6"
          value={issueDate}
          onChange={(e) => setIssueDate(e.target.value)}
          required
        />

        <label>Due Date</label>

        <input
          type="date"
          className="w-full border p-3 rounded mt-2 mb-6"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />

        <button className="w-full bg-blue-700 text-white p-4 rounded-xl">
          Issue Book
        </button>
      </form>
    </div>
  );
}

export default IssueBook;
