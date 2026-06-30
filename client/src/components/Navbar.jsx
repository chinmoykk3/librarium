function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-white shadow h-20 px-8 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Library Management System</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-bold">{user?.full_name}</p>

          <p className="text-gray-500">{user?.role}</p>
        </div>

        <img
          src="https://ui-avatars.com/api/?name=Admin"
          className="w-12 h-12 rounded-full"
          alt="avatar"
        />
      </div>
    </div>
  );
}

export default Navbar;
