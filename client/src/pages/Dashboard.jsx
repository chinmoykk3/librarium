import { useEffect, useState } from "react";
import axios from "axios";

import MainLayout from "../layouts/MainLayout";
import DashboardCard from "../components/DashboardCard";

import { FaBook, FaUsers, FaExchangeAlt, FaClock } from "react-icons/fa";

function Dashboard() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalMembers: 0,
    issuedBooks: 0,
    dueBooks: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/dashboard");

      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainLayout>
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
        <DashboardCard
          title="Total Books"
          value={stats.totalBooks}
          icon={<FaBook />}
          color="bg-blue-600"
        />

        <DashboardCard
          title="Members"
          value={stats.totalMembers}
          icon={<FaUsers />}
          color="bg-green-600"
        />

        <DashboardCard
          title="Issued Books"
          value={stats.issuedBooks}
          icon={<FaExchangeAlt />}
          color="bg-purple-600"
        />

        <DashboardCard
          title="Due Books"
          value={stats.dueBooks}
          icon={<FaClock />}
          color="bg-red-500"
        />
      </div>
    </MainLayout>
  );
}

export default Dashboard;
