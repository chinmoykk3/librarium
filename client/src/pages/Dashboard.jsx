import { Link } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}

      <div className="bg-blue-700 text-white px-10 py-5 flex justify-between items-center shadow">
        <h1 className="text-3xl font-bold">📚 Librarium</h1>

        <div className="flex items-center gap-5">
          <div className="text-right">
            <p className="font-semibold">{user?.full_name}</p>
            <p className="text-sm">{user?.role}</p>
          </div>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="p-10">
        <h2 className="text-4xl font-bold">Welcome {user?.full_name} 👋</h2>

        <p className="text-gray-600 mt-2">Manage your library easily.</p>

        {/* Dashboard Cards */}

        <div className="grid grid-cols-4 gap-6 mt-10">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500">📚 Total Books</h3>
            <h1 className="text-5xl font-bold mt-3">0</h1>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500">👨 Members</h3>
            <h1 className="text-5xl font-bold mt-3">0</h1>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500">📖 Issued Books</h3>
            <h1 className="text-5xl font-bold mt-3">0</h1>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500">⏰ Due Books</h3>
            <h1 className="text-5xl font-bold mt-3">0</h1>
          </div>
        </div>

        {/* Buttons */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          <Link to="/add-book">
            <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-xl text-xl">
              ➕ Add Book
            </button>
          </Link>

          <Link to="/books">
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-xl">
              📚 View Books
            </button>
          </Link>

          <button className="bg-purple-600 text-white py-4 rounded-xl text-xl">
            👨 Members
          </button>

          <button className="bg-orange-500 text-white py-4 rounded-xl text-xl">
            📖 Issue Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
