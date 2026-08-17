import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../services/api";
import Sidebar from "../../components/Sidebar";

function PayrollForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    id_employee: "",
    bulan: "Januari",
    tahun: new Date().getFullYear(),
    gaji_pokok: 0,
    tunjangan: 0,
    bonus: 0,
    potongan: 0,
    total_gaji: 0,
  });

  useEffect(() => {
    loadEmployees();

    if (isEdit) {
      loadPayroll();
    }
  }, []);

  useEffect(() => {
    const total =
      Number(form.gaji_pokok) +
      Number(form.tunjangan) +
      Number(form.bonus) -
      Number(form.potongan);

    setForm((prev) => ({
      ...prev,
      total_gaji: total,
    }));
  }, [
    form.gaji_pokok,
    form.tunjangan,
    form.bonus,
    form.potongan,
  ]);

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

  const loadPayroll = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/payroll/${id}`);

      const data = res.data.data;

      setForm({
        id_employee: data.id_employee,
        bulan: data.bulan,
        tahun: data.tahun,
        gaji_pokok: data.gaji_pokok,
        tunjangan: data.tunjangan,
        bonus: data.bonus,
        potongan: data.potongan,
        total_gaji: data.total_gaji,
      });

    } catch (err) {

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Data payroll tidak ditemukan",
      });

      navigate("/payroll");

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

        await api.put(`/payroll/${id}`, form);

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Payroll berhasil diupdate",
        });

      } else {

        await api.post("/payroll", form);

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Payroll berhasil ditambahkan",
        });

      }

      navigate("/payroll");

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
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
    return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-8">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold">
            {isEdit ? "Edit Payroll" : "Tambah Payroll"}
          </h1>

          <button
            onClick={() => navigate("/payroll")}
            className="bg-slate-300 hover:bg-slate-400 px-5 py-2 rounded-lg"
          >
            Kembali
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8"
        >

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <label className="block mb-2 font-medium">
                Karyawan
              </label>

              <select
                name="id_employee"
                value={form.id_employee}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
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

            <div>

              <label className="block mb-2 font-medium">
                Bulan
              </label>

              <select
                name="bulan"
                value={form.bulan}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              >
                <option>Januari</option>
                <option>Februari</option>
                <option>Maret</option>
                <option>April</option>
                <option>Mei</option>
                <option>Juni</option>
                <option>Juli</option>
                <option>Agustus</option>
                <option>September</option>
                <option>Oktober</option>
                <option>November</option>
                <option>Desember</option>
              </select>

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Tahun
              </label>

              <input
                type="number"
                name="tahun"
                value={form.tahun}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Gaji Pokok
              </label>

              <input
                type="number"
                name="gaji_pokok"
                value={form.gaji_pokok}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Tunjangan
              </label>

              <input
                type="number"
                name="tunjangan"
                value={form.tunjangan}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Bonus
              </label>

              <input
                type="number"
                name="bonus"
                value={form.bonus}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Potongan
              </label>

              <input
                type="number"
                name="potongan"
                value={form.potongan}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Total Gaji
              </label>

              <input
                type="text"
                value={`Rp ${Number(form.total_gaji).toLocaleString("id-ID")}`}
                readOnly
                className="w-full border rounded-xl p-3 bg-slate-100 font-bold text-green-600"
              />

            </div>

          </div>

          <div className="flex justify-end gap-3 mt-8">

            <button
              type="button"
              onClick={() => navigate("/payroll")}
              className="px-6 py-3 rounded-xl bg-slate-300 hover:bg-slate-400"
            >
              Batal
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isEdit ? "Update" : "Simpan"}
            </button>

          </div>

        </form>

      </main>

    </div>
  );
}

export default PayrollForm;