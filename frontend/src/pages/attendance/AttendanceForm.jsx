import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";

import api from "../../services/api";

import Sidebar from "../../components/Sidebar";

import {
  ArrowLeft,
  Save,
  UserCircle2,
  CalendarDays,
  Clock3,
  ClipboardCheck,
} from "lucide-react";

function AttendanceForm() {

  const navigate = useNavigate();

  const { id } = useParams();

  const isEdit = !!id;

  const [loading, setLoading] = useState(false);

  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({

    id_employee: "",

    tanggal: "",

    jam_masuk: "",

    jam_keluar: "",

    status: "Hadir",

  });

  useEffect(() => {

    loadEmployees();

    if (isEdit) {

      loadAttendance();

    }

  }, []);

  const loadEmployees = async () => {

    try {

      const res = await api.get("/employees");

      setEmployees(res.data.data);

      if (res.data.data.length > 0 && !isEdit) {

        setForm((prev) => ({

          ...prev,

          id_employee:

            res.data.data[0].id_employee,

        }));

      }

    } catch (err) {

      console.log(err);

    }

  };

  const loadAttendance = async () => {

    try {

      setLoading(true);

      const res = await api.get(`/attendance/${id}`);

      const data = res.data.data;

      setForm({

        id_employee: data.id_employee,

        tanggal: data.tanggal?.substring(0, 10),

        jam_masuk: data.jam_masuk,

        jam_keluar: data.jam_keluar,

        status: data.status,

      });

    } catch (err) {

      console.log(err);

      Swal.fire({

        icon: "error",

        title: "Error",

        text: "Attendance not found.",

      });

      navigate("/attendance");

    } finally {

      setLoading(false);

    }

  };

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (isEdit) {

        await api.put(

          `/attendance/${id}`,

          form

        );

        Swal.fire({

          icon: "success",

          title: "Success",

          text: "Attendance updated.",

        });

      } else {

        await api.post(

          "/attendance",

          form

        );

        Swal.fire({

          icon: "success",

          title: "Success",

          text: "Attendance created.",

        });

      }

      navigate("/attendance");

    } catch (err) {

      Swal.fire({

        icon: "error",

        title: "Error",

        text:

          err.response?.data?.message ||

          "Something went wrong.",

      });

    }

  };

  if (loading) {

    return (

      <div className="flex items-center justify-center h-screen">

        <div className="text-2xl font-bold">

          Loading...

        </div>

      </div>

    );

  }

  return (
    <div className="flex min-h-screen bg-slate-100">

  <Sidebar />

  <main className="flex-1 p-8 overflow-auto">

    {/* HERO */}

    <div
      className="
      rounded-3xl
      bg-gradient-to-r
      from-blue-700
      via-blue-600
      to-cyan-500
      p-8
      text-white
      shadow-xl
      "
    >

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-black">

            {isEdit
              ? "Edit Attendance"
              : "Create Attendance"}

          </h1>

          <p className="text-blue-100 mt-3 text-lg">

            Manage employee attendance professionally.

          </p>

        </div>

        <button
          onClick={() => navigate("/attendance")}
          className="
          bg-white
          text-blue-700
          px-6
          py-4
          rounded-2xl
          font-semibold
          shadow-lg
          hover:scale-105
          transition
          flex
          items-center
          gap-3
          "
        >

          <ArrowLeft size={20} />

          Back

        </button>

      </div>

    </div>

    {/* FORM */}

    <form
      onSubmit={handleSubmit}
      className="
      mt-8
      bg-white
      rounded-3xl
      shadow-xl
      p-8
      "
    >

      <div className="flex items-center gap-3 mb-8">

        <ClipboardCheck
          size={28}
          className="text-blue-600"
        />

        <h2 className="text-2xl font-bold">

          Attendance Information

        </h2>

      </div>

      <div className="grid lg:grid-cols-2 gap-6">
                {/* EMPLOYEE */}

        <div>

          <label className="block font-semibold mb-2">

            Employee

          </label>

          <div className="relative">

            <UserCircle2
              size={20}
              className="absolute left-4 top-4 text-slate-400"
            />

            <select
              name="id_employee"
              value={form.id_employee}
              onChange={handleChange}
              className="
              w-full
              pl-12
              pr-4
              py-3
              border
              rounded-2xl
              focus:ring-2
              focus:ring-blue-500
              focus:outline-none
              "
            >

              {employees.map((emp) => (

                <option
                  key={emp.id_employee}
                  value={emp.id_employee}
                >

                  {emp.nik} - {emp.nama_lengkap}

                </option>

              ))}

            </select>

          </div>

        </div>

        {/* DATE */}

        <div>

          <label className="block font-semibold mb-2">

            Date

          </label>

          <div className="relative">

            <CalendarDays
              size={20}
              className="absolute left-4 top-4 text-slate-400"
            />

            <input
              type="date"
              name="tanggal"
              value={form.tanggal}
              onChange={handleChange}
              className="
              w-full
              pl-12
              pr-4
              py-3
              border
              rounded-2xl
              focus:ring-2
              focus:ring-blue-500
              focus:outline-none
              "
              required
            />

          </div>

        </div>

        {/* CHECK IN */}

        <div>

          <label className="block font-semibold mb-2">

            Check In

          </label>

          <div className="relative">

            <Clock3
              size={20}
              className="absolute left-4 top-4 text-slate-400"
            />

            <input
              type="time"
              name="jam_masuk"
              value={form.jam_masuk}
              onChange={handleChange}
              className="
              w-full
              pl-12
              pr-4
              py-3
              border
              rounded-2xl
              focus:ring-2
              focus:ring-blue-500
              focus:outline-none
              "
              required
            />

          </div>

        </div>

        {/* CHECK OUT */}

        <div>

          <label className="block font-semibold mb-2">

            Check Out

          </label>

          <div className="relative">

            <Clock3
              size={20}
              className="absolute left-4 top-4 text-slate-400"
            />

            <input
              type="time"
              name="jam_keluar"
              value={form.jam_keluar}
              onChange={handleChange}
              className="
              w-full
              pl-12
              pr-4
              py-3
              border
              rounded-2xl
              focus:ring-2
              focus:ring-blue-500
              focus:outline-none
              "
              required
            />

          </div>

        </div>

        {/* STATUS */}

        <div className="lg:col-span-2">

          <label className="block font-semibold mb-2">

            Status

          </label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="
            w-full
            border
            rounded-2xl
            p-3
            focus:ring-2
            focus:ring-blue-500
            focus:outline-none
            "
          >

            <option value="Hadir">Hadir</option>

            <option value="Izin">Izin</option>

            <option value="Sakit">Sakit</option>

            <option value="Alpha">Alpha</option>

          </select>

        </div>
              </div>

      {/* BUTTON */}

      <div className="flex justify-end gap-4 mt-10">

        <button
          type="button"
          onClick={() => navigate("/attendance")}
          className="
          px-6
          py-3
          rounded-2xl
          bg-slate-200
          hover:bg-slate-300
          font-semibold
          transition
          "
        >

          Cancel

        </button>

        <button
          type="submit"
          className="
          flex
          items-center
          gap-2
          px-8
          py-3
          rounded-2xl
          bg-gradient-to-r
          from-blue-600
          to-cyan-500
          text-white
          font-semibold
          hover:scale-105
          transition
          shadow-lg
          "
        >

          <Save size={18} />

          {isEdit
            ? "Update Attendance"
            : "Save Attendance"}

        </button>

      </div>

    </form>

  </main>

</div>

);

}

export default AttendanceForm;