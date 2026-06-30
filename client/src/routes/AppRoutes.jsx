import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import AddBook from "../pages/AddBook";
import Books from "../pages/Books";
import EditBook from "../pages/EditBook";
import Members from "../pages/Members";
import AddMember from "../pages/AddMember";
import EditMember from "../pages/EditMember";
import Borrowings from "../pages/Borrowings";
import IssueBook from "../pages/IssueBook";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
        <Route path="/members" element={<Members />} />
        <Route path="/add-member" element={<AddMember />} />
        <Route path="/members/edit/:id" element={<EditMember />} />
        <Route path="/borrowings" element={<Borrowings />} />
        <Route path="/issue-book" element={<IssueBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
