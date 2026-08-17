import {
  Bar,
  Doughnut,
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function Charts({ attendanceChart }) {

  const labels = attendanceChart.map(
    (item) => item.status
  );

  const values = attendanceChart.map(
    (item) => item.total
  );

  const barData = {

    labels,

    datasets: [

      {

        label: "Attendance",

        data: values,

        backgroundColor: [
          "#2563EB",
          "#10B981",
          "#F59E0B",
          "#EF4444",
        ],

        borderRadius: 14,

        borderSkipped: false,

        barThickness: 45,

      },

    ],

  };

  const doughnutData = {

    labels,

    datasets: [

      {

        data: values,

        backgroundColor: [
          "#2563EB",
          "#10B981",
          "#F59E0B",
          "#EF4444",
        ],

        hoverOffset: 12,

        borderWidth: 0,

      },

    ],

  };

  const barOptions = {

    responsive: true,

    maintainAspectRatio: false,

    plugins: {

      legend: {

        display: false,

      },

      tooltip: {

        backgroundColor: "#0f172a",

        padding: 12,

        cornerRadius: 10,

      },

    },

    scales: {

      x: {

        grid: {

          display: false,

        },

      },

      y: {

        beginAtZero: true,

        ticks: {

          precision: 0,

        },

        grid: {

          color: "#e5e7eb",

        },

      },

    },

  };

  const doughnutOptions = {

    responsive: true,

    maintainAspectRatio: false,

    cutout: "70%",

    plugins: {

      legend: {

        position: "bottom",

        labels: {

          usePointStyle: true,

          padding: 20,

        },

      },

    },

  };

  return (

    <div className="grid xl:grid-cols-3 gap-6 mt-8">

      {/* BAR CHART */}

      <div
        className="
        xl:col-span-2
        bg-white
        rounded-3xl
        shadow-lg
        p-7
        border
        border-slate-200
        "
      >

        <div className="flex justify-between items-center mb-8">

          <div>

            <h2 className="text-2xl font-bold text-slate-800">

              Attendance Overview

            </h2>

            <p className="text-slate-500 mt-1">

              Employee attendance statistics

            </p>

          </div>

          <span
            className="
            bg-blue-100
            text-blue-700
            px-4
            py-2
            rounded-xl
            text-sm
            font-semibold
            "
          >

            This Month

          </span>

        </div>

        <div className="h-[350px]">

          <Bar
            data={barData}
            options={barOptions}
          />

        </div>

      </div>

      {/* DOUGHNUT */}

      <div
        className="
        bg-white
        rounded-3xl
        shadow-lg
        border
        border-slate-200
        p-7
        "
      >

        <div className="mb-6">

          <h2 className="text-2xl font-bold">

            Attendance Ratio

          </h2>

          <p className="text-slate-500">

            Employee attendance distribution

          </p>

        </div>

        <div className="h-[260px]">

          <Doughnut

            data={doughnutData}

            options={doughnutOptions}

          />

        </div>

        <div className="mt-8 space-y-4">

          {

            attendanceChart.map((item, index) => {

              const colors = [

                "bg-blue-600",

                "bg-green-500",

                "bg-yellow-500",

                "bg-red-500",

              ];

              return (

                <div
                  key={index}
                  className="flex justify-between items-center"
                >

                  <div className="flex items-center gap-3">

                    <div
                      className={`w-3 h-3 rounded-full ${colors[index]}`}
                    />

                    <span className="text-slate-600">

                      {item.status}

                    </span>

                  </div>

                  <span className="font-bold text-slate-800">

                    {item.total}

                  </span>

                </div>

              );

            })

          }

        </div>

      </div>

    </div>

  );

}

export default Charts;