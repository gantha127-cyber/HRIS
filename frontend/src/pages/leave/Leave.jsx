import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import api from "../../services/api";

import Sidebar from "../../components/Sidebar";

import {
  Pencil,
  Trash2,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
} from "lucide-react";

function Leave() {

  const navigate = useNavigate();

  const [leaves, setLeaves] = useState([]);

  const [keyword, setKeyword] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemPerPage = 8;

  useEffect(() => {

    loadLeaves();

  }, []);

  const loadLeaves = async () => {

    try {

      const res = await api.get("/leaves");

      setLeaves(res.data.data);

    } catch (err) {

      console.log(err);

    }

  };

  const handleDelete = async (id) => {

    const result = await Swal.fire({

      title: "Delete Leave?",

      text: "This leave request will be deleted.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Delete",

      cancelButtonText: "Cancel",

    });

    if (!result.isConfirmed) return;

    try {

      await api.delete(`/leaves/${id}`);

      Swal.fire({

        icon: "success",

        title: "Deleted",

        text: "Leave deleted successfully.",

        timer: 1500,

        showConfirmButton: false,

      });

      loadLeaves();

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

  const filteredLeave = leaves.filter((item) => {

    const key = keyword.toLowerCase();

    return (

      item.nama_lengkap
        ?.toLowerCase()
        .includes(key) ||

      item.jenis_cuti
        ?.toLowerCase()
        .includes(key)

    );

  });

  const totalPage = Math.ceil(
    filteredLeave.length / itemPerPage
  );

  const currentData = filteredLeave.slice(

    (currentPage - 1) * itemPerPage,

    currentPage * itemPerPage

  );

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

            Leave Management

          </h1>

          <p className="mt-3 text-blue-100 text-lg">

            Manage employee leave requests professionally.

          </p>

        </div>

        <button
          onClick={() => navigate("/leave/create")}
          className="
          flex
          items-center
          gap-3
          bg-white
          text-blue-700
          px-6
          py-4
          rounded-2xl
          font-semibold
          shadow-lg
          hover:scale-105
          transition
          "
        >

          <Plus size={20} />

          New Leave

        </button>

      </div>

    </div>

    {/* SEARCH */}

    <div
      className="
      mt-8
      bg-white
      rounded-3xl
      shadow-lg
      p-6
      "
    >

      <div className="flex justify-between items-center">

        <div className="relative w-full max-w-lg">

          <Search
            size={20}
            className="
            absolute
            left-4
            top-4
            text-slate-400
            "
          />

          <input
            type="text"
            placeholder="Search employee or leave type..."
            value={keyword}
            onChange={(e) => {

              setKeyword(e.target.value);

              setCurrentPage(1);

            }}
            className="
            w-full
            pl-12
            pr-4
            py-3
            border
            rounded-2xl
            focus:ring-2
            focus:ring-blue-500
            outline-none
            "
          />

        </div>

        <div
          className="
          bg-blue-50
          text-blue-700
          px-5
          py-2
          rounded-full
          font-semibold
          "
        >

          HRIS Enterprise

        </div>

      </div>

    </div>

    {/* TABLE */}

    <div
      className="
      mt-8
      bg-white
      rounded-3xl
      shadow-lg
      overflow-hidden
      "
    >

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-6 py-4 text-left">

                No

              </th>

              <th className="px-6 py-4 text-left">

                Employee

              </th>

              <th className="px-6 py-4 text-left">

                Leave Type

              </th>

              <th className="px-6 py-4 text-left">

                Start Date

              </th>

              <th className="px-6 py-4 text-left">

                End Date

              </th>

              <th className="px-6 py-4 text-center">

                Status

              </th>

              <th className="px-6 py-4 text-center">

                Action

              </th>

            </tr>

          </thead>

          <tbody>
            {currentData.length > 0 ? (

  currentData.map((item, index) => (

    <tr
      key={item.id_leave}
      className="
      border-b
      hover:bg-blue-50
      transition-all
      duration-200
      "
    >

      {/* NO */}

      <td className="px-6 py-5">

        {(currentPage - 1) * itemPerPage + index + 1}

      </td>

      {/* EMPLOYEE */}

      <td className="px-6 py-5">

        <div className="flex items-center gap-4">

          <div
            className="
            w-12
            h-12
            rounded-full
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            text-white
            flex
            items-center
            justify-center
            font-bold
            text-lg
            shadow
            "
          >

            {item.nama_lengkap
              ?.charAt(0)
              ?.toUpperCase()}

          </div>

          <div>

            <h3 className="font-semibold">

              {item.nama_lengkap}

            </h3>

            <p className="text-slate-500 text-sm">

              Employee Leave

            </p>

          </div>

        </div>

      </td>

      {/* LEAVE TYPE */}

      <td className="px-6 py-5">

        {item.jenis_cuti}

      </td>

      {/* START */}

      <td className="px-6 py-5">

        <div className="flex items-center gap-2">

          <CalendarDays
            size={18}
            className="text-slate-400"
          />

          {item.tanggal_mulai?.substring(0, 10)}

        </div>

      </td>

      {/* END */}

      <td className="px-6 py-5">

        <div className="flex items-center gap-2">

          <CalendarDays
            size={18}
            className="text-slate-400"
          />

          {item.tanggal_selesai?.substring(0, 10)}

        </div>

      </td>

      {/* STATUS */}

      <td className="px-6 py-5 text-center">

        <span
          className={`
          px-4
          py-2
          rounded-full
          text-sm
          font-semibold
          ${
            item.status === "Approved"

              ? "bg-green-100 text-green-700"

              : item.status === "Rejected"

              ? "bg-red-100 text-red-700"

              : "bg-yellow-100 text-yellow-700"
          }
          `}
        >

          {item.status}

        </span>

      </td>

      {/* ACTION */}

      <td className="px-6 py-5">

        <div className="flex justify-center gap-3">

          <button
            onClick={() =>
              navigate(`/leave/edit/${item.id_leave}`)
            }
            className="
            w-10
            h-10
            rounded-xl
            bg-blue-100
            text-blue-600
            hover:bg-blue-600
            hover:text-white
            transition
            flex
            items-center
            justify-center
            "
          >

            <Pencil size={18} />

          </button>

          <button
            onClick={() =>
              handleDelete(item.id_leave)
            }
            className="
            w-10
            h-10
            rounded-xl
            bg-red-100
            text-red-600
            hover:bg-red-600
            hover:text-white
            transition
            flex
            items-center
            justify-center
            "
          >

            <Trash2 size={18} />

          </button>

        </div>

      </td>

    </tr>

  ))

) : (

  <tr>

    <td
      colSpan="7"
      className="
      py-20
      text-center
      "
    >

      <CalendarDays
        size={70}
        className="
        mx-auto
        text-slate-300
        "
      />

      <h2
        className="
        text-2xl
        font-bold
        mt-5
        "
      >

        Leave Not Found

      </h2>

      <p className="text-slate-500 mt-2">

        No leave request matches your search.

      </p>

    </td>

  </tr>

)}
</tbody>

        </table>

      </div>

      {/* PAGINATION */}

      {totalPage > 1 && (

        <div className="flex justify-between items-center px-8 py-6 border-t">

          <p className="text-slate-500">

            Page

            <span className="font-bold mx-2">

              {currentPage}

            </span>

            of

            <span className="font-bold mx-2">

              {totalPage}

            </span>

          </p>

          <div className="flex gap-3">

            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(currentPage - 1)
              }
              className="
              flex
              items-center
              gap-2
              px-5
              py-3
              rounded-xl
              border
              disabled:opacity-40
              hover:bg-slate-100
              transition
              "
            >

              <ChevronLeft size={18} />

              Previous

            </button>

            <button
              disabled={currentPage === totalPage}
              onClick={() =>
                setCurrentPage(currentPage + 1)
              }
              className="
              flex
              items-center
              gap-2
              px-5
              py-3
              rounded-xl
              border
              disabled:opacity-40
              hover:bg-slate-100
              transition
              "
            >

              Next

              <ChevronRight size={18} />

            </button>

          </div>

        </div>

      )}

    </div>

  </main>

</div>

);

}

export default Leave;