import {
  Bell,
  Settings,
  Search,
} from "lucide-react";

function Header({ user }) {

  const today = new Date();

  const greeting = () => {

    const hour = today.getHours();

    if (hour < 12) return "Good Morning ☀️";
    if (hour < 18) return "Good Afternoon 🌤";
    return "Good Evening 🌙";

  };

  return (

    <div
      className="
      bg-white
      rounded-3xl
      shadow-lg
      p-8
      flex
      justify-between
      items-center
      "
    >

      <div>

        <p className="text-blue-600 font-semibold text-lg">

          {greeting()}

        </p>

        <h1
          className="
          text-4xl
          font-black
          mt-2
          text-slate-800
          "
        >

          Welcome Back,

          <span className="text-blue-600">

            {" "}
            {user?.username}

          </span>

          👋

        </h1>

        <p className="text-slate-500 mt-3">

          {today.toLocaleDateString(
            "en-US",
            {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          )}

        </p>

      </div>

      <div className="flex items-center gap-5">

        <button
          className="
          w-14
          h-14
          rounded-2xl
          bg-slate-100
          hover:bg-blue-600
          hover:text-white
          transition
          "
        >

          <Search
            className="mx-auto"
            size={22}
          />

        </button>

        <button
          className="
          relative
          w-14
          h-14
          rounded-2xl
          bg-slate-100
          hover:bg-blue-600
          hover:text-white
          transition
          "
        >

          <Bell
            className="mx-auto"
            size={22}
          />

          <span
            className="
            absolute
            top-2
            right-2
            w-3
            h-3
            rounded-full
            bg-red-500
            "
          />

        </button>

        <button
          className="
          w-14
          h-14
          rounded-2xl
          bg-slate-100
          hover:bg-blue-600
          hover:text-white
          transition
          "
        >

          <Settings
            className="mx-auto"
            size={22}
          />

        </button>

      </div>

    </div>

  );

}

export default Header;