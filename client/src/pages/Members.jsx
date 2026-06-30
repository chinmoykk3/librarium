import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Members() {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/members");
      setMembers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteMember = async (id) => {
    if (!window.confirm("Delete this member?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/members/${id}`);
      alert("Member Deleted Successfully");
      fetchMembers();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">👨‍🎓 Library Members</h1>

        <button
          onClick={() => navigate("/add-member")}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          + Add Member
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="p-4">ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Membership</th>
              <th>Join Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="border-b text-center">
                <td className="p-4">{member.id}</td>

                <td>{member.full_name}</td>

                <td>{member.email}</td>

                <td>{member.phone}</td>

                <td>{member.membership_type}</td>

                <td>{member.join_date?.substring(0, 10)}</td>

                <td>
                  <button
                    onClick={() => navigate(`/members/edit/${member.id}`)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteMember(member.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded"
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

export default Members;
