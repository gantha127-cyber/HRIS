import {
  UserPlus,
  Building2,
  CalendarCheck,
  Wallet,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function QuickActions() {

  const navigate = useNavigate();

  const actions = [

    {
      title: "Add Employee",
      desc: "Tambah data karyawan",
      icon: UserPlus,
      color: "from-blue-500 to-cyan-500",
      path: "/employees/create",
    },

    {
      title: "Department",
      desc: "Kelola department",
      icon: Building2,
      color: "from-violet-500 to-purple-500",
      path: "/departments",
    },

    {
      title: "Attendance",
      desc: "Input absensi",
      icon: CalendarCheck,
      color: "from-green-500 to-emerald-500",
      path: "/attendance/create",
    },

    {
      title: "Payroll",
      desc: "Kelola payroll",
      icon: Wallet,
      color: "from-orange-500 to-red-500",
      path: "/payroll",
    },

  ];

  return (

    <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-7">

      <div className="mb-7">

        <h2 className="text-2xl font-bold text-slate-800">

          Quick Actions

        </h2>

        <p className="text-slate-500 mt-1">

          Shortcut menuju menu utama HRIS

        </p>

      </div>

      <div className="space-y-4">

        {

          actions.map((item, index) => {

            const Icon = item.icon;

            return (

              <button
                key={index}
                onClick={() => navigate(item.path)}
                className="
                w-full
                group
                rounded-2xl
                overflow-hidden
                border
                border-slate-200
                hover:border-transparent
                transition-all
                duration-300
                hover:shadow-xl
                hover:-translate-y-1
                "
              >

                <div className="flex items-center">

                  <div
                    className={`
                    w-16
                    h-16
                    flex
                    items-center
                    justify-center
                    text-white
                    bg-gradient-to-r
                    ${item.color}
                    `}
                  >

                    <Icon size={28} />

                  </div>

                  <div className="flex-1 text-left px-5">

                    <h3 className="font-semibold text-slate-800">

                      {item.title}

                    </h3>

                    <p className="text-sm text-slate-500">

                      {item.desc}

                    </p>

                  </div>

                  <div className="pr-5">

                    <ArrowRight
                      className="
                      text-slate-400
                      group-hover:text-blue-600
                      group-hover:translate-x-1
                      transition-all
                      "
                    />

                  </div>

                </div>

              </button>

            );

          })

        }

      </div>

    </div>

  );

}

export default QuickActions;