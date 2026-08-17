import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import api from "../../services/api";
import Sidebar from "../../components/Sidebar";

import {
  ArrowLeft,
  Save,
  Briefcase,
  BadgeCheck,
} from "lucide-react";

function PositionForm() {

  const navigate = useNavigate();

  const { id } = useParams();

  const isEdit = !!id;

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({

    nama_position: "",

  });

  useEffect(() => {

    if (isEdit) {

      loadPosition();

    }

  }, []);

  const loadPosition = async () => {

    try {

      setLoading(true);

      const res = await api.get(`/positions/${id}`);

      setForm({

        nama_position:
          res.data.data.nama_position,

      });

    } catch (err) {

      console.log(err);

      Swal.fire({

        icon: "error",

        title: "Error",

        text: "Position tidak ditemukan",

      });

      navigate("/positions");

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

    if (!form.nama_position.trim()) {

      Swal.fire({

        icon: "warning",

        title: "Oops...",

        text: "Position wajib diisi.",

      });

      return;

    }

    try {

      if (isEdit) {

        await api.put(

          `/positions/${id}`,

          form

        );

        Swal.fire({

          icon: "success",

          title: "Success",

          text: "Position updated.",

        });

      } else {

        await api.post(

          "/positions",

          form

        );

        Swal.fire({

          icon: "success",

          title: "Success",

          text: "Position created.",

        });

      }

      navigate("/positions");

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
              ? "Edit Position"
              : "Create Position"}

          </h1>

          <p className="mt-3 text-blue-100 text-lg">

            Manage company positions professionally.

          </p>

        </div>

        <button
          onClick={() => navigate("/positions")}
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
            {/* POSITION INFORMATION */}

      <div className="bg-white rounded-3xl shadow-xl p-8">

        <h2 className="text-2xl font-bold mb-8">

          Position Information

        </h2>

        <div className="grid lg:grid-cols-2 gap-6">

          <div className="lg:col-span-2">

            <label className="font-semibold flex items-center gap-2 mb-2">

              <Briefcase size={18} />

              Position Name

            </label>

            <input
              type="text"
              name="nama_position"
              value={form.nama_position}
              onChange={handleChange}
              placeholder="Enter Position Name..."
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

                Position Management

              </h3>

              <p className="text-slate-600 mt-2 leading-7">

                Positions define employee roles within the company.
                Give each position a clear and unique name so it can
                be assigned easily across departments and organizational
                structures.

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
            onClick={() => navigate("/positions")}
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
              ? "Update Position"
              : "Save Position"}

          </button>

        </div>

      </div>

    </form>

  </main>

</div>

);

}

export default PositionForm;