function StatCard({
  title,
  value,
  icon,
  color = "blue",
}) {
  const colors = {
    blue: {
      bg: "from-blue-500 to-cyan-500",
      light: "bg-blue-100",
      text: "text-blue-600",
    },

    emerald: {
      bg: "from-emerald-500 to-green-500",
      light: "bg-emerald-100",
      text: "text-emerald-600",
    },

    violet: {
      bg: "from-violet-500 to-purple-500",
      light: "bg-violet-100",
      text: "text-violet-600",
    },

    cyan: {
      bg: "from-cyan-500 to-sky-500",
      light: "bg-cyan-100",
      text: "text-cyan-600",
    },

    amber: {
      bg: "from-amber-500 to-orange-500",
      light: "bg-amber-100",
      text: "text-amber-600",
    },

    rose: {
      bg: "from-rose-500 to-pink-500",
      light: "bg-rose-100",
      text: "text-rose-600",
    },

    green: {
      bg: "from-green-500 to-emerald-600",
      light: "bg-green-100",
      text: "text-green-600",
    },
  };

  const theme = colors[color] || colors.blue;

  return (
    <div
      className="
      group
      relative
      overflow-hidden
      rounded-3xl
      bg-white
      shadow-lg
      hover:shadow-2xl
      transition-all
      duration-500
      hover:-translate-y-2
      border
      border-slate-200
      "
    >
      {/* Gradient Header */}
      <div
        className={`
          h-2
          w-full
          bg-gradient-to-r
          ${theme.bg}
        `}
      />

      {/* Glow */}
      <div
        className={`
        absolute
        -right-10
        -top-10
        w-36
        h-36
        rounded-full
        ${theme.light}
        blur-3xl
        opacity-40
        group-hover:scale-125
        transition
        duration-500
        `}
      />

      <div className="relative p-6">

        <div className="flex justify-between items-start">

          <div>

            <p className="text-slate-500 text-sm uppercase tracking-wider">
              {title}
            </p>

            <h2 className="text-4xl font-black text-slate-800 mt-4 break-words">
              {value}
            </h2>

            <p className="text-slate-400 text-sm mt-3">
              Updated just now
            </p>

          </div>

          <div
            className={`
            w-16
            h-16
            rounded-2xl
            flex
            items-center
            justify-center
            ${theme.light}
            ${theme.text}
            shadow-md
            group-hover:rotate-6
            transition-all
            duration-500
            `}
          >
            {icon}
          </div>

        </div>

      </div>

    </div>
  );
}

export default StatCard;