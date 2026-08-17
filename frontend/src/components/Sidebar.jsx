import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  CalendarCheck,
  CalendarDays,
  Wallet,
  LogOut,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function Sidebar() {

  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const menus = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Employee",
      path: "/employees",
      icon: Users,
    },
    {
      name: "Department",
      path: "/departments",
      icon: Building2,
    },
    {
      name: "Position",
      path: "/positions",
      icon: Briefcase,
    },
    {
      name: "Attendance",
      path: "/attendance",
      icon: CalendarCheck,
    },
    {
      name: "Leave",
      path: "/leave",
      icon: CalendarDays,
    },
    {
      name: "Payroll",
      path: "/payroll",
      icon: Wallet,
    },
  ];

  const menuClass = ({ isActive }) =>
    `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 font-medium ${
      isActive
        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
        <aside
      className={`
        ${
          collapsed ? "w-24" : "w-72"
        }
        relative
        min-h-screen
        bg-gradient-to-b
        from-slate-950
        via-slate-900
        to-slate-800
        border-r
        border-slate-700
        shadow-2xl
        transition-all
        duration-300
        flex
        flex-col
      `}
    >

      {/* HEADER */}

      <div className="relative p-6 border-b border-slate-700">

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="
            absolute
            -right-4
            top-8
            w-8
            h-8
            rounded-full
            bg-blue-600
            hover:bg-blue-700
            text-white
            flex
            items-center
            justify-center
            shadow-xl
            transition
          "
        >
          {collapsed ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </button>

        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "gap-4"
          }`}
        >

          <div
            className="
              w-14
              h-14
              rounded-2xl
              bg-gradient-to-r
              from-blue-600
              to-cyan-500
              flex
              items-center
              justify-center
              text-white
              shadow-xl
            "
          >
            <ShieldCheck size={30} />
          </div>

          {!collapsed && (

            <div>

              <h1 className="text-2xl font-black text-white">
                HRIS PRO
              </h1>

              <p className="text-slate-400 text-sm">
                Human Resource System
              </p>

            </div>

          )}

        </div>

      </div>

      {/* USER */}

      <div className="p-5">

        <div className="bg-slate-800 rounded-3xl p-5">

          <div className="flex items-center gap-4">

            <div
              className="
                w-14
                h-14
                rounded-full
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
                text-white
                flex
                items-center
                justify-center
                text-xl
                font-bold
              "
            >
              {user?.username?.charAt(0).toUpperCase()}
            </div>

            {!collapsed && (

              <div>

                <h2 className="text-white font-bold">
                  {user?.username}
                </h2>

                <p className="text-slate-400 text-sm">
                  Administrator
                </p>

              </div>

            )}

          </div>

        </div>

      </div>
            {/* MENU */}

      <div className="flex-1 px-4 pb-4 overflow-y-auto">

        {!collapsed && (
          <p className="text-xs uppercase tracking-widest text-slate-500 px-3 mb-4">
            Main Menu
          </p>
        )}

        <div className="space-y-2">

          {menus.map((menu) => {

            const Icon = menu.icon;

            return (

              <NavLink
                key={menu.path}
                to={menu.path}
                className={menuClass}
              >

                <Icon
                  size={22}
                  className="flex-shrink-0"
                />

                {!collapsed && (
                  <span>
                    {menu.name}
                  </span>
                )}

              </NavLink>

            );

          })}

        </div>

      </div>

      {/* FOOTER */}

      <div className="border-t border-slate-700 p-5">

        {!collapsed && (

          <div className="mb-5 bg-slate-800 rounded-2xl p-4">

            <p className="text-slate-400 text-xs uppercase tracking-widest">
              System Status
            </p>

            <div className="mt-3 flex items-center justify-between">

              <span className="text-white text-sm">
                Server
              </span>

              <span className="text-green-400 font-semibold">
                ● Online
              </span>

            </div>

            <div className="mt-3">

              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>Storage</span>
                <span>82%</span>
              </div>

              <div className="w-full bg-slate-700 rounded-full h-2">

                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full"
                  style={{ width: "82%" }}
                />

              </div>

            </div>

          </div>

        )}

        <button
          onClick={logout}
          className="
            w-full
            py-3
            rounded-2xl
            bg-gradient-to-r
            from-red-500
            to-red-600
            hover:from-red-600
            hover:to-red-700
            text-white
            flex
            items-center
            justify-center
            gap-3
            transition-all
            duration-300
            hover:shadow-xl
          "
        >

          <LogOut size={20} />

          {!collapsed && (
            <span>
              Logout
            </span>
          )}

        </button>

      </div>
    
    </aside>
  );
}

export default Sidebar;