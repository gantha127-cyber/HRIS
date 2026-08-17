import {
  Users,
  Building2,
  Briefcase,
  CalendarCheck,
  CalendarDays,
  Wallet,
  DollarSign,
  TrendingUp,
} from "lucide-react";

function StatCards({ dashboard }) {

  const cards = [
    {
      title: "Employees",
      value: dashboard.employees,
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Departments",
      value: dashboard.departments,
      icon: Building2,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Positions",
      value: dashboard.positions,
      icon: Briefcase,
      color: "from-emerald-500 to-green-500",
    },
    {
      title: "Attendance",
      value: dashboard.attendance,
      icon: CalendarCheck,
      color: "from-orange-500 to-amber-500",
    },
    {
      title: "Leave",
      value: dashboard.leave,
      icon: CalendarDays,
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Payroll",
      value: dashboard.payroll,
      icon: Wallet,
      color: "from-indigo-500 to-blue-500",
    },
    {
      title: "Total Salary",
      value: `Rp ${Number(
        dashboard.totalSalary
      ).toLocaleString("id-ID")}`,
      icon: DollarSign,
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (

    <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">

      {cards.map((card, index) => {

        const Icon = card.icon;

        return (

          <div
            key={index}
            className="
            bg-white
            rounded-3xl
            shadow-md
            hover:shadow-2xl
            hover:-translate-y-2
            transition-all
            duration-300
            overflow-hidden
            "
          >

            <div
              className={`
              h-2
              bg-gradient-to-r
              ${card.color}
              `}
            />

            <div className="p-6">

              <div className="flex justify-between items-start">

                <div>

                  <p className="text-slate-500 text-sm">

                    {card.title}

                  </p>

                  <h2 className="text-4xl font-black mt-3 text-slate-800">

                    {card.value}

                  </h2>

                </div>

                <div
                  className={`
                  w-16
                  h-16
                  rounded-2xl
                  bg-gradient-to-r
                  ${card.color}
                  text-white
                  flex
                  items-center
                  justify-center
                  shadow-lg
                  `}
                >

                  <Icon size={30} />

                </div>

              </div>

              <div className="mt-6 flex items-center justify-between">

                <span className="text-xs text-slate-400">

                  Updated just now

                </span>

                <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">

                  <TrendingUp size={15} />

                  Active

                </div>

              </div>

            </div>

          </div>

        );

      })}

    </div>

  );

}

export default StatCards;