import {
  Database,
  Server,
  Users,
  Building2,
  Briefcase,
  Wallet,
  CheckCircle2,
  Activity,
} from "lucide-react";

function SummaryCard({ dashboard }) {

  const items = [

    {
      title: "Database",
      value: "Online",
      icon: Database,
      color: "text-green-600",
      bg: "bg-green-100",
    },

    {
      title: "Server",
      value: "Running",
      icon: Server,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },

    {
      title: "Employees",
      value: dashboard.employees,
      icon: Users,
      color: "text-cyan-600",
      bg: "bg-cyan-100",
    },

    {
      title: "Departments",
      value: dashboard.departments,
      icon: Building2,
      color: "text-violet-600",
      bg: "bg-violet-100",
    },

    {
      title: "Positions",
      value: dashboard.positions,
      icon: Briefcase,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },

    {
      title: "Payroll",
      value: dashboard.payroll,
      icon: Wallet,
      color: "text-pink-600",
      bg: "bg-pink-100",
    },

  ];

  return (

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

      <div className="flex items-center justify-between mb-7">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">

            System Summary

          </h2>

          <p className="text-slate-500 mt-1">

            HRIS System Information

          </p>

        </div>

        <Activity
          className="text-blue-600"
          size={28}
        />

      </div>

      <div className="space-y-4">

        {

          items.map((item, index) => {

            const Icon = item.icon;

            return (

              <div
                key={index}
                className="
                flex
                items-center
                justify-between
                p-4
                rounded-2xl
                hover:bg-slate-50
                transition
                "
              >

                <div className="flex items-center gap-4">

                  <div
                    className={`
                    w-12
                    h-12
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    ${item.bg}
                    `}
                  >

                    <Icon
                      className={item.color}
                      size={22}
                    />

                  </div>

                  <div>

                    <p className="text-slate-500 text-sm">

                      {item.title}

                    </p>

                    <h3 className="font-bold text-slate-800">

                      {item.value}

                    </h3>

                  </div>

                </div>

                <CheckCircle2
                  size={20}
                  className="text-green-500"
                />

              </div>

            );

          })

        }

      </div>

      <div
        className="
        mt-8
        rounded-2xl
        bg-gradient-to-r
        from-blue-600
        to-cyan-500
        p-5
        text-white
        "
      >

        <p className="text-sm opacity-80">

          Total Salary

        </p>

        <h2 className="text-3xl font-black mt-2">

          Rp{" "}
          {Number(
            dashboard.totalSalary
          ).toLocaleString("id-ID")}

        </h2>

        <p className="text-sm mt-3 opacity-80">

          HRIS Enterprise Version 1.0

        </p>

      </div>

    </div>

  );

}

export default SummaryCard;