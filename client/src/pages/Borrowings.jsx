import { useEffect, useState } from "react";
import axios from "axios";

function Borrowings() {
  const [borrowings, setBorrowings] = useState([]);

  useEffect(() => {
    fetchBorrowings();
  }, []);

  const fetchBorrowings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/borrowings");
      setBorrowings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const returnBook = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/borrowings/${id}/return`);

      alert("Book Returned Successfully");

      fetchBorrowings();
    } catch (err) {
      console.log(err);
      alert("Return Failed");
    }
  };

  const deleteBorrowing = async (id) => {
    if (!window.confirm("Delete this record?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/borrowings/${id}`);

      alert("Record Deleted");

      fetchBorrowings();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">📖 Borrow Records</h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="p-4">ID</th>
              <th>Member</th>
              <th>Book</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Return Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {borrowings.map((b) => (
              <tr key={b.id} className="border-b text-center hover:bg-gray-50">
                <td className="p-4">{b.id}</td>

                <td>{b.full_name}</td>

                <td>{b.title}</td>

                <td>{b.issue_date?.substring(0, 10)}</td>

                <td>{b.due_date?.substring(0, 10)}</td>

                <td>{b.return_date ? b.return_date.substring(0, 10) : "-"}</td>

                <td>
                  <span
                    className={
                      b.status === "Issued"
                        ? "text-red-600 font-bold"
                        : "text-green-600 font-bold"
                    }
                  >
                    {b.status}
                  </span>
                </td>

                <td className="space-x-2">
                  {b.status === "Issued" && (
                    <button
                      onClick={() => returnBook(b.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                    >
                      Return
                    </button>
                  )}

                  <button
                    onClick={() => deleteBorrowing(b.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Borrowings;
