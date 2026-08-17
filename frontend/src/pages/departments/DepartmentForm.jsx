import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import api from "../../services/api";
import Sidebar from "../../components/Sidebar";

import {
  ArrowLeft,
  Save,
  Building2,
  BadgeCheck,
} from "lucide-react";

function DepartmentForm() {

  const navigate = useNavigate();

  const { id } = useParams();

  const isEdit = !!id;

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({

    nama_department: "",

  });

  useEffect(() => {

    if (isEdit) {

      loadDepartment();

    }

  }, []);

  const loadDepartment = async () => {

    try {

      setLoading(true);

      const res = await api.get(`/departments/${id}`);

      setForm({

        nama_department:
          res.data.data.nama_department,

      });

    } catch (err) {

      console.log(err);

      Swal.fire({

        icon: "error",

        title: "Error",

        text: "Department tidak ditemukan",

      });

      navigate("/departments");

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

    if (!form.nama_department.trim()) {

      Swal.fire({

        icon: "warning",

        title: "Oops...",

        text: "Department wajib diisi.",

      });

      return;

    }

    try {

      if (isEdit) {

        await api.put(

          `/departments/${id}`,

          form

        );

        Swal.fire({

          icon: "success",

          title: "Success",

          text: "Department updated.",

        });

      } else {

        await api.post(

          "/departments",

          form

        );

        Swal.fire({

          icon: "success",

          title: "Success",

          text: "Department created.",

        });

      }

      navigate("/departments");

    } catch (err) {

      Swal.fire({

        icon: "error",

        title: "Error",

        text:

          err.response?.data?.message ||

          "Terjadi kesalahan.",

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
              ? "Edit Department"
              : "Create Department"}

          </h1>

          <p className="mt-3 text-blue-100 text-lg">

            Manage your company departments professionally.

          </p>

        </div>

        <button

          onClick={() => navigate("/departments")}

          className="
          bg-white
          text-blue-700
          px-6
          py-4
          rounded-2xl
          font-semibold
          hover:scale-105
          transition
          flex
          items-center
          gap-3
          shadow-lg
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
      {/* DEPARTMENT INFORMATION */}

<div className="bg-white rounded-3xl shadow-xl p-8">

  <h2 className="text-2xl font-bold mb-8">

    Department Information

  </h2>

  <div className="grid lg:grid-cols-2 gap-6">

    <div className="lg:col-span-2">

      <label className="font-semibold flex items-center gap-2 mb-2">

        <Building2 size={18} />

        Department Name

      </label>

      <input
        type="text"
        name="nama_department"
        value={form.nama_department}
        onChange={handleChange}
        placeholder="Enter Department Name..."
        className="
        w-full
        border
        rounded-2xl
        px-5
        py-4
        outline-none
        focus:ring-2
        focus:ring-blue-500
        transition
        "
      />

    </div>

  </div>

</div>

{/* INFORMATION */}

<div className="bg-white rounded-3xl shadow-xl p-8">

  <h2 className="text-2xl font-bold mb-6">

    Information

  </h2>

  <div
    className="
    bg-blue-50
    border
    border-blue-100
    rounded-2xl
    p-6
    "
  >

    <div className="flex items-start gap-4">

      <div
        className="
        w-12
        h-12
        rounded-xl
        bg-blue-600
        text-white
        flex
        items-center
        justify-center
        "
      >

        <BadgeCheck size={22} />

      </div>

      <div>

        <h3 className="font-bold text-lg text-blue-700">

          Department Management

        </h3>

        <p className="text-slate-600 mt-2 leading-7">

          Departments are used to group employees into
          organizational units. Make sure each department
          name is unique and easy to identify.

        </p>

      </div>

    </div>

  </div>

</div>
{/* ACTION */}

<div className="bg-white rounded-3xl shadow-xl p-8">

  <div className="flex justify-end gap-4">

    <button
      type="button"
      onClick={() => navigate("/departments")}
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

      {isEdit
        ? "Update Department"
        : "Save Department"}

    </button>

  </div>

</div>

</form>

</main>

</div>

);

}

export default DepartmentForm;