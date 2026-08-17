import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";

import Header from "../../components/dashboard/Header";
import StatCards from "../../components/dashboard/StatCards";
import Charts from "../../components/dashboard/Charts";
import SummaryCard from "../../components/dashboard/SummaryCard";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentActivity from "../../components/dashboard/RecentActivity";

import api from "../../services/api";

function Dashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [loading, setLoading] = useState(true);

  const [dashboard, setDashboard] = useState({
    employees: 0,
    departments: 0,
    positions: 0,
    attendance: 0,
    leave: 0,
    payroll: 0,
    totalSalary: 0,
  });

  const [attendanceChart, setAttendanceChart] = useState([]);

  useEffect(() => {

    loadDashboard();
    loadChart();

  }, []);

  const loadDashboard = async () => {

    try {

      const res = await api.get("/dashboard");

      setDashboard(res.data.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  const loadChart = async () => {

    try {

      const res = await api.get("/dashboard/charts");

      setAttendanceChart(
        res.data.data.attendanceChart
      );

    } catch (err) {

      console.log(err);

    }

  };

  if (loading) {

    return (

      <div className="flex min-h-screen bg-slate-100">

        <Sidebar />

        <main className="flex-1 flex items-center justify-center">

          <div className="text-center">

            <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

            <p className="mt-5 text-slate-500 font-medium">
              Loading Dashboard...
            </p>

          </div>

        </main>

      </div>

    );

  }

  return (

    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50">

      <Sidebar />

      <main className="flex-1 overflow-auto">

        <div className="p-8 space-y-8">

          {/* HEADER */}

          <Header user={user} />

          {/* STAT CARD */}

          <StatCards
            dashboard={dashboard}
          />

          {/* CHART */}

          <Charts
            attendanceChart={attendanceChart}
          />

          {/* BOTTOM SECTION */}

          <div className="grid xl:grid-cols-3 gap-8">

            {/* LEFT */}

            <div className="xl:col-span-2">

              <RecentActivity />

            </div>

            {/* RIGHT */}

            <div className="space-y-8">

              <SummaryCard
                dashboard={dashboard}
              />

              <QuickActions />

            </div>

          </div>

        </div>

      </main>

    </div>

  );

}

export default Dashboard;