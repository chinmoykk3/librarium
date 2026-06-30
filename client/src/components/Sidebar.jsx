import { NavLink } from "react-router-dom";
import {
  FaBook,
  FaUsers,
  FaChartPie,
  FaExchangeAlt,
  FaCog,
} from "react-icons/fa";

function Sidebar() {
  return (
    <div className="w-72 bg-slate-900 text-white min-h-screen">
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold">📚 Librarium</h1>
      </div>

      <nav className="flex flex-col gap-3 px-5">
        <NavLink
          to="/dashboard"
          className="flex items-center gap-3 p-4 rounded-xl hover:bg-blue-600"
        >
          <FaChartPie />
          Dashboard
        </NavLink>

        <NavLink
          to="/books"
          className="flex items-center gap-3 p-4 rounded-xl hover:bg-blue-600"
        >
          <FaBook />
          Books
        </NavLink>

        <NavLink
          to="/members"
          className="flex items-center gap-3 p-4 rounded-xl hover:bg-blue-600"
        >
          <FaUsers />
          Members
        </NavLink>

        <NavLink
          to="/borrowings"
          className="flex items-center gap-3 p-4 rounded-xl hover:bg-blue-600"
        >
          <FaExchangeAlt />
          Borrowings
        </NavLink>

        <NavLink
          to="/settings"
          className="flex items-center gap-3 p-4 rounded-xl hover:bg-blue-600"
        >
          <FaCog />
          Settings
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
