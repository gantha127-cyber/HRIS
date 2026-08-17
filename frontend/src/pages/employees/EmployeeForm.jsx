import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import api from "../../services/api";
import Sidebar from "../../components/Sidebar";

import {
  ArrowLeft,
  Save,
  User,
  Mail,
  Phone,
  Building2,
  Briefcase,
  Calendar,
  MapPin,
  Venus,
  BadgeCheck,
  Camera,
} from "lucide-react";

function EmployeeForm() {

  const navigate = useNavigate();

  const { id } = useParams();

  const isEdit = !!id;

  const [loading, setLoading] = useState(false);

  const [departments, setDepartments] = useState([]);

  const [positions, setPositions] = useState([]);

  const [form, setForm] = useState({

    id_user: 1,

    nik: "",

    nama_lengkap: "",

    email: "",

    no_hp: "",

    alamat: "",

    jenis_kelamin: "Laki-laki",

    tanggal_lahir: "",

    tanggal_masuk: "",

    id_department: "",

    id_position: "",

    status: "Aktif",

  });

  useEffect(() => {

  loadDepartments();

  loadPositions();

  if (isEdit) {

    loadEmployee();

  } else {

    generateNIK();

  }

}, []);

  const generateNIK = async () => {
  try {
    const res = await api.get("/employees");

    const employees = res.data.data || [];

    let maxNumber = 0;

    employees.forEach((employee) => {
      const nik = employee.nik;

      if (nik && nik.startsWith("EMP")) {
        const number = parseInt(
          nik.replace("EMP", ""),
          10
        );

        if (!isNaN(number) && number > maxNumber) {
          maxNumber = number;
        }
      }
    });

    const nextNumber = maxNumber + 1;

    const newNIK = `EMP${String(nextNumber).padStart(3, "0")}`;

    setForm((prev) => ({
      ...prev,
      nik: newNIK,
    }));

  } catch (err) {
    console.error("Gagal generate NIK:", err);
  }
};

  const loadDepartments = async () => {

    try {

      const res = await api.get("/departments");

      setDepartments(res.data.data);

      if (res.data.data.length > 0 && !isEdit) {

        setForm((prev) => ({

          ...prev,

          id_department: res.data.data[0].id_department,

        }));

      }

    } catch (err) {

      console.log(err);

    }

  };

  const loadPositions = async () => {

    try {

      const res = await api.get("/positions");

      setPositions(res.data.data);

      if (res.data.data.length > 0 && !isEdit) {

        setForm((prev) => ({

          ...prev,

          id_position: res.data.data[0].id_position,

        }));

      }

    } catch (err) {

      console.log(err);

    }

  };
    const loadEmployee = async () => {

    try {

      setLoading(true);

      const res = await api.get(`/employees/${id}`);

      const emp = res.data.data;

      setForm({

        id_user: emp.id_user,

        nik: emp.nik,

        nama_lengkap: emp.nama_lengkap,

        email: emp.email,

        no_hp: emp.no_hp,

        alamat: emp.alamat,

        jenis_kelamin: emp.jenis_kelamin,

        tanggal_lahir: emp.tanggal_lahir?.substring(0, 10),

        tanggal_masuk: emp.tanggal_masuk?.substring(0, 10),

        id_department: emp.id_department,

        id_position: emp.id_position,

        status: emp.status,

      });

    } catch (err) {

      console.log(err);

      Swal.fire({

        icon: "error",

        title: "Error",

        text: "Data karyawan tidak ditemukan",

      });

      navigate("/employees");

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

    if (

      !form.nik ||

      !form.nama_lengkap ||

      !form.email ||

      !form.no_hp

    ) {

      Swal.fire({

        icon: "warning",

        title: "Form belum lengkap",

        text: "Silakan lengkapi seluruh data.",

      });

      return;

    }

    try {

      if (isEdit) {

        await api.put(`/employees/${id}`, form);

        Swal.fire({

          icon: "success",

          title: "Berhasil",

          text: "Data berhasil diperbarui",

        });

      } else {

        await api.post("/employees", form);

        Swal.fire({

          icon: "success",

          title: "Berhasil",

          text: "Data berhasil ditambahkan",

        });

      }

      navigate("/employees");

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

      <div className="flex items-center justify-center h-screen text-xl font-semibold">

        Loading...

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

                  ? "Edit Employee"

                  : "Create Employee"}

              </h1>

              <p className="mt-3 text-blue-100 text-lg">

                Manage employee information professionally

              </p>

            </div>

            <button

              onClick={() => navigate("/employees")}

              className="
              bg-white
              text-blue-700
              px-6
              py-3
              rounded-2xl
              flex
              items-center
              gap-2
              font-semibold
              hover:scale-105
              transition
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

          className="mt-8 space-y-8"
        >
          {/* PERSONAL INFORMATION */}

<div className="bg-white rounded-3xl shadow-xl p-8">

  <h2 className="text-2xl font-bold mb-8">

    Personal Information

  </h2>

  <div className="grid lg:grid-cols-2 gap-6">

    <div>

      <label className="font-semibold flex items-center gap-2 mb-2">

        <BadgeCheck size={18} />

        NIK

      </label>

      <input
        type="text"
        name="nik"
        value={form.nik}
        onChange={handleChange}
        className="
        w-full
        border
        rounded-2xl
        px-4
        py-4
        focus:ring-2
        focus:ring-blue-500
        outline-none
        "
        placeholder="Employee ID"
      />

    </div>

    <div>

      <label className="font-semibold flex items-center gap-2 mb-2">

        <User size={18} />

        Full Name

      </label>

      <input
        type="text"
        name="nama_lengkap"
        value={form.nama_lengkap}
        onChange={handleChange}
        className="
        w-full
        border
        rounded-2xl
        px-4
        py-4
        focus:ring-2
        focus:ring-blue-500
        outline-none
        "
        placeholder="Employee Name"
      />

    </div>

    <div>

      <label className="font-semibold flex items-center gap-2 mb-2">

        <Mail size={18} />

        Email

      </label>

      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        className="
        w-full
        border
        rounded-2xl
        px-4
        py-4
        focus:ring-2
        focus:ring-blue-500
        outline-none
        "
        placeholder="employee@email.com"
      />

    </div>

    <div>

      <label className="font-semibold flex items-center gap-2 mb-2">

        <Phone size={18} />

        Phone Number

      </label>

      <input
        type="text"
        name="no_hp"
        value={form.no_hp}
        onChange={handleChange}
        className="
        w-full
        border
        rounded-2xl
        px-4
        py-4
        focus:ring-2
        focus:ring-blue-500
        outline-none
        "
        placeholder="08xxxxxxxxxx"
      />

    </div>

    <div>

      <label className="font-semibold flex items-center gap-2 mb-2">

        <Venus size={18} />

        Gender

      </label>

      <select
        name="jenis_kelamin"
        value={form.jenis_kelamin}
        onChange={handleChange}
        className="
        w-full
        border
        rounded-2xl
        px-4
        py-4
        focus:ring-2
        focus:ring-blue-500
        outline-none
        "
      >

        <option value="Laki-laki">

          Laki-laki

        </option>

        <option value="Perempuan">

          Perempuan

        </option>

      </select>

    </div>

    <div>

      <label className="font-semibold flex items-center gap-2 mb-2">

        <Calendar size={18} />

        Birth Date

      </label>

      <input
        type="date"
        name="tanggal_lahir"
        value={form.tanggal_lahir}
        onChange={handleChange}
        className="
        w-full
        border
        rounded-2xl
        px-4
        py-4
        focus:ring-2
        focus:ring-blue-500
        outline-none
        "
      />

    </div>

  </div>

</div>
{/* EMPLOYMENT INFORMATION */}

<div className="bg-white rounded-3xl shadow-xl p-8">

  <h2 className="text-2xl font-bold mb-8">

    Employment Information

  </h2>

  <div className="grid lg:grid-cols-2 gap-6">

    <div>

      <label className="font-semibold flex items-center gap-2 mb-2">

        <Building2 size={18} />

        Department

      </label>

      <select
        name="id_department"
        value={form.id_department}
        onChange={handleChange}
        className="
        w-full
        border
        rounded-2xl
        px-4
        py-4
        outline-none
        focus:ring-2
        focus:ring-blue-500
        "
      >

        {departments.map((dept) => (

          <option
            key={dept.id_department}
            value={dept.id_department}
          >

            {dept.nama_department}

          </option>

        ))}

      </select>

    </div>

    <div>

      <label className="font-semibold flex items-center gap-2 mb-2">

        <Briefcase size={18} />

        Position

      </label>

      <select
        name="id_position"
        value={form.id_position}
        onChange={handleChange}
        className="
        w-full
        border
        rounded-2xl
        px-4
        py-4
        outline-none
        focus:ring-2
        focus:ring-blue-500
        "
      >

        {positions.map((pos) => (

          <option
            key={pos.id_position}
            value={pos.id_position}
          >

            {pos.nama_position}

          </option>

        ))}

      </select>

    </div>

    <div>

      <label className="font-semibold flex items-center gap-2 mb-2">

        <Calendar size={18} />

        Join Date

      </label>

      <input
        type="date"
        name="tanggal_masuk"
        value={form.tanggal_masuk}
        onChange={handleChange}
        className="
        w-full
        border
        rounded-2xl
        px-4
        py-4
        outline-none
        focus:ring-2
        focus:ring-blue-500
        "
      />

    </div>

    <div>

      <label className="font-semibold flex items-center gap-2 mb-2">

        <BadgeCheck size={18} />

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
        px-4
        py-4
        outline-none
        focus:ring-2
        focus:ring-blue-500
        "
      >

        <option value="Aktif">

          Aktif

        </option>

        <option value="Tidak Aktif">

          Tidak Aktif

        </option>

      </select>

    </div>

  </div>

</div>

{/* ADDRESS */}

<div className="bg-white rounded-3xl shadow-xl p-8">

  <h2 className="text-2xl font-bold mb-8">

    Address

  </h2>

  <label className="font-semibold flex items-center gap-2 mb-2">

    <MapPin size={18} />

    Address

  </label>

  <textarea
    rows={5}
    name="alamat"
    value={form.alamat}
    onChange={handleChange}
    placeholder="Complete employee address..."
    className="
    w-full
    border
    rounded-2xl
    p-4
    outline-none
    resize-none
    focus:ring-2
    focus:ring-blue-500
    "
  />

</div>

{/* PHOTO */}

<div className="bg-white rounded-3xl shadow-xl p-8">

  <h2 className="text-2xl font-bold mb-8">

    Employee Photo

  </h2>

  <div className="flex flex-col items-center">

    <div
      className="
      w-36
      h-36
      rounded-full
      bg-slate-100
      flex
      items-center
      justify-center
      border-4
      border-dashed
      border-slate-300
      "
    >

      <Camera
        size={45}
        className="text-slate-400"
      />

    </div>

    <button
      type="button"
      className="
      mt-6
      bg-blue-600
      hover:bg-blue-700
      text-white
      px-6
      py-3
      rounded-2xl
      transition
      "
    >

      Upload Photo

    </button>

    <p className="text-slate-400 text-sm mt-3">

      JPG, PNG (Max 2 MB)

    </p>

  </div>

</div>
{/* ACTION BUTTON */}

<div className="bg-white rounded-3xl shadow-xl p-8">

  <div className="flex justify-end gap-4">

    <button
      type="button"
      onClick={() => navigate("/employees")}
      className="
      px-8
      py-4
      rounded-2xl
      bg-slate-200
      hover:bg-slate-300
      font-semibold
      transition
      flex
      items-center
      gap-2
      "
    >

      <ArrowLeft size={20} />

      Cancel

    </button>

    <button
      type="submit"
      className="
      px-8
      py-4
      rounded-2xl
      bg-gradient-to-r
      from-blue-600
      to-cyan-500
      hover:from-blue-700
      hover:to-cyan-600
      text-white
      font-semibold
      shadow-lg
      transition-all
      duration-300
      hover:scale-105
      flex
      items-center
      gap-2
      "
    >

      <Save size={20} />

      {isEdit ? "Update Employee" : "Save Employee"}

    </button>

  </div>

</div>

</form>

</main>

</div>

);

}

export default EmployeeForm;