import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../services/api";
import Sidebar from "../../components/Sidebar";

import {
  ArrowLeft,
  Save,
  CalendarDays,
  User,
  FileText,
  CheckCircle2,
} from "lucide-react";

function LeaveForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    id_employee: "",
    jenis_cuti: "Cuti Tahunan",
    tanggal_mulai: "",
    tanggal_selesai: "",
    alasan: "",
    status: "Pending",
  });

  useEffect(() => {
    loadEmployees();

    if (isEdit) {
      loadLeave();
    }
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await api.get("/employees");

      setEmployees(res.data.data);

      if (res.data.data.length > 0 && !isEdit) {
        setForm((prev) => ({
          ...prev,
          id_employee: res.data.data[0].id_employee,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadLeave = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/leaves/${id}`);

      const data = res.data.data;

      setForm({
        id_employee: data.id_employee,
        jenis_cuti: data.jenis_cuti,
        tanggal_mulai: data.tanggal_mulai?.substring(0, 10),
        tanggal_selesai: data.tanggal_selesai?.substring(0, 10),
        alasan: data.alasan,
        status: data.status,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Data tidak ditemukan",
      });

      navigate("/leave");
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
        await api.put(`/leaves/${id}`, form);

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data cuti berhasil diupdate",
        });
      } else {
        await api.post("/leaves", form);

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data cuti berhasil ditambahkan",
        });
      }

      navigate("/leave");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text:
          err.response?.data?.message ||
          "Terjadi kesalahan",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-100">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-50">

      <Sidebar />

      <main className="flex-1 p-10">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-4xl font-bold text-slate-800">

              {isEdit
                ? "Edit Leave Request"
                : "Create Leave Request"}

            </h1>

            <p className="text-slate-500 mt-2">

              HRIS Enterprise Management System

            </p>

          </div>

          <button
            onClick={() => navigate("/leave")}
            className="
            flex
            items-center
            gap-2
            bg-white
            px-5
            py-3
            rounded-2xl
            shadow
            hover:shadow-lg
            transition
            "
          >

            <ArrowLeft size={18} />

            Back

          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="
          bg-white
          rounded-3xl
          shadow-xl
          p-10
          "
        >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Employee */}

            <div>

              <label className="flex items-center gap-2 font-semibold mb-3 text-slate-700">

                <User size={18} className="text-blue-600" />

                Employee

              </label>

              <select
                name="id_employee"
                value={form.id_employee}
                onChange={handleChange}
                className="
                w-full
                rounded-2xl
                border
                border-slate-300
                px-5
                py-4
                focus:ring-4
                focus:ring-blue-200
                focus:border-blue-500
                outline-none
                "
              >
                {employees.map((emp) => (
                  <option
                    key={emp.id_employee}
                    value={emp.id_employee}
                  >
                    {emp.nama_lengkap}
                  </option>
                ))}
              </select>

            </div>

            {/* Leave Type */}

            <div>

              <label className="flex items-center gap-2 font-semibold mb-3 text-slate-700">

                <CalendarDays
                  size={18}
                  className="text-blue-600"
                />

                Leave Type

              </label>

              <select
                name="jenis_cuti"
                value={form.jenis_cuti}
                onChange={handleChange}
                className="
                w-full
                rounded-2xl
                border
                border-slate-300
                px-5
                py-4
                focus:ring-4
                focus:ring-blue-200
                outline-none
                "
              >

                <option value="Cuti Tahunan">
                  Cuti Tahunan
                </option>

                <option value="Cuti Sakit">
                  Cuti Sakit
                </option>

                <option value="Cuti Melahirkan">
                  Cuti Melahirkan
                </option>

                <option value="Cuti Besar">
                  Cuti Besar
                </option>

              </select>

            </div>

            {/* Start Date */}

            <div>

              <label className="font-semibold mb-3 block">

                Start Date

              </label>

              <input
                type="date"
                name="tanggal_mulai"
                value={form.tanggal_mulai}
                onChange={handleChange}
                className="
                w-full
                rounded-2xl
                border
                border-slate-300
                px-5
                py-4
                focus:ring-4
                focus:ring-blue-200
                outline-none
                "
              />

            </div>

            {/* End Date */}

            <div>

              <label className="font-semibold mb-3 block">

                End Date

              </label>

              <input
                type="date"
                name="tanggal_selesai"
                value={form.tanggal_selesai}
                onChange={handleChange}
                className="
                w-full
                rounded-2xl
                border
                border-slate-300
                px-5
                py-4
                focus:ring-4
                focus:ring-blue-200
                outline-none
                "
              />

            </div>
                        {/* Reason */}

            <div className="lg:col-span-2">

              <label className="flex items-center gap-2 font-semibold mb-3 text-slate-700">

                <FileText
                  size={18}
                  className="text-blue-600"
                />

                Reason

              </label>

              <textarea
                name="alasan"
                rows={5}
                value={form.alasan}
                onChange={handleChange}
                placeholder="Write the reason for leave..."
                className="
                w-full
                rounded-2xl
                border
                border-slate-300
                px-5
                py-4
                resize-none
                focus:ring-4
                focus:ring-blue-200
                outline-none
                "
              />

            </div>

            {/* Status */}

            <div>

              <label className="flex items-center gap-2 font-semibold mb-3 text-slate-700">

                <CheckCircle2
                  size={18}
                  className="text-blue-600"
                />

                Status

              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="
                w-full
                rounded-2xl
                border
                border-slate-300
                px-5
                py-4
                focus:ring-4
                focus:ring-blue-200
                outline-none
                "
              >

                <option value="Pending">
                  Pending
                </option>

                <option value="Approved">
                  Approved
                </option>

                <option value="Rejected">
                  Rejected
                </option>

              </select>

            </div>

          </div>

          <div className="flex justify-end gap-4 mt-10">

            <button
              type="button"
              onClick={() => navigate("/leave")}
              className="
              px-7
              py-4
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
              py-4
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

              {isEdit ? "Update Leave" : "Save Leave"}

            </button>

          </div>
                  </form>

      </main>

    </div>

  );

}

export default LeaveForm;