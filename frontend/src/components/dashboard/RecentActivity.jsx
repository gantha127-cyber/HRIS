import {
  UserPlus,
  CalendarCheck,
  Wallet,
  FileCheck,
  Clock,
} from "lucide-react";

function RecentActivity() {

  const activities = [

    {
      icon: UserPlus,
      color: "bg-blue-100 text-blue-600",
      title: "New Employee Added",
      desc: "John Doe berhasil ditambahkan ke sistem.",
      time: "5 menit yang lalu",
    },

    {
      icon: CalendarCheck,
      color: "bg-green-100 text-green-600",
      title: "Attendance Recorded",
      desc: "Absensi hari ini berhasil diperbarui.",
      time: "20 menit yang lalu",
    },

    {
      icon: FileCheck,
      color: "bg-orange-100 text-orange-600",
      title: "Leave Approved",
      desc: "Pengajuan cuti disetujui oleh HR.",
      time: "1 jam yang lalu",
    },

    {
      icon: Wallet,
      color: "bg-purple-100 text-purple-600",
      title: "Payroll Generated",
      desc: "Payroll bulan ini berhasil dibuat.",
      time: "Hari ini",
    },

  ];

  return (

    <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-7">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Recent Activity
          </h2>

          <p className="text-slate-500">
            Aktivitas terbaru sistem HRIS
          </p>

        </div>

        <Clock className="text-slate-400" />

      </div>

      <div className="space-y-6">

        {

          activities.map((item, index) => {

            const Icon = item.icon;

            return (

              <div
                key={index}
                className="
                flex
                items-start
                gap-4
                pb-5
                border-b
                last:border-none
                "
              >

                <div
                  className={`
                  w-12
                  h-12
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  ${item.color}
                  `}
                >

                  <Icon size={22} />

                </div>

                <div className="flex-1">

                  <h3 className="font-semibold text-slate-800">

                    {item.title}

                  </h3>

                  <p className="text-slate-500 mt-1 text-sm">

                    {item.desc}

                  </p>

                </div>

                <span className="text-xs text-slate-400 whitespace-nowrap">

                  {item.time}

                </span>

              </div>

            );

          })

        }

      </div>

    </div>

  );

}

export default RecentActivity;