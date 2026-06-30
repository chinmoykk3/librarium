import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddMember() {
  const navigate = useNavigate();

  const [member, setMember] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    membership_type: "",
    join_date: "",
  });

  const handleChange = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/members", member);

    alert("Member Added Successfully");

    navigate("/members");
  };

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Add Member</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="full_name"
          placeholder="Full Name"
          onChange={handleChange}
          className="border w-full p-3 rounded"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border w-full p-3 rounded"
        />

        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          className="border w-full p-3 rounded"
        />

        <textarea
          name="address"
          placeholder="Address"
          onChange={handleChange}
          className="border w-full p-3 rounded"
        />

        <input
          name="membership_type"
          placeholder="Membership Type"
          onChange={handleChange}
          className="border w-full p-3 rounded"
        />

        <input
          type="date"
          name="join_date"
          onChange={handleChange}
          className="border w-full p-3 rounded"
        />

        <button className="bg-blue-700 text-white px-8 py-3 rounded">
          Save Member
        </button>
      </form>
    </div>
  );
}

export default AddMember;
