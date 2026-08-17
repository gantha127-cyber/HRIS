import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../services/api";

import {
  Eye,
  EyeOff,
  LockKeyhole,
  UserRound,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Username dan Password wajib diisi",
      });
      return;
    }

    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      Swal.fire({
        icon: "success",
        title: "Login Berhasil",
        text: `Selamat datang ${res.data.user.username}`,
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/dashboard");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: err.response?.data?.message || "Terjadi kesalahan",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-2xl">

        {/* LEFT */}
        <div className="hidden lg:flex bg-slate-900 p-12 text-white flex-col justify-center">

          <div className="mb-8">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mb-6">
              <span className="text-2xl font-bold">H</span>
            </div>

            <h1 className="text-4xl font-bold leading-tight">
              Human Resource
              <br />
              Information System
            </h1>

            <p className="mt-5 text-slate-400 leading-relaxed">
              Kelola data karyawan, absensi, pengajuan cuti, dan payroll
              dalam satu sistem terintegrasi.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-5 mt-8">

            <div>
              <p className="text-2xl font-bold">24/7</p>
              <p className="text-slate-500 text-sm">Access</p>
            </div>

            <div>
              <p className="text-2xl font-bold">100%</p>
              <p className="text-slate-500 text-sm">Digital</p>
            </div>

            <div>
              <p className="text-2xl font-bold">Secure</p>
              <p className="text-slate-500 text-sm">System</p>
            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="p-8 sm:p-12 flex items-center">

          <div className="w-full max-w-md mx-auto">

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900">
                Welcome Back
              </h2>

              <p className="mt-2 text-slate-500">
                Silakan login untuk mengakses HRIS.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">

              {/* Username */}
              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Username
                </label>

                <div className="relative">

                  <UserRound
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Masukkan Username"
                    autoComplete="username"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                  />

                </div>

              </div>

              {/* Password */}
              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>

                <div className="relative">

                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Masukkan Password"
                    autoComplete="current-password"
                    className="w-full pl-11 pr-12 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>

                </div>

              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
              >
                Login
              </button>

            </form>

            <p className="text-center text-slate-400 text-sm mt-8">
              HRIS © 2026
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;