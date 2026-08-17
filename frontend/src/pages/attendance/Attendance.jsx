import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import api from "../../services/api";

import Sidebar from "../../components/Sidebar";

import {
  Search,
  Pencil,
  Trash2,
  CalendarCheck,
  Plus,
  ChevronLeft,
  ChevronRight,
  Users,
} from "lucide-react";

function Attendance() {

  const navigate = useNavigate();

  const [attendance, setAttendance] = useState([]);

  const [keyword, setKeyword] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemPerPage = 8;

  useEffect(() => {

    loadAttendance();

  }, []);

  const loadAttendance = async () => {

    try {

      const res = await api.get("/attendance");

      setAttendance(res.data.data);

    } catch (err) {

      console.log(err);

      Swal.fire({

        icon: "error",

        title: "Error",

        text: "Failed to load attendance.",

      });

    }

  };

  const handleDelete = async (id) => {

    const result = await Swal.fire({

      title: "Delete Attendance?",

      text: "This attendance record will be removed.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Delete",

      cancelButtonText: "Cancel",

    });

    if (!result.isConfirmed) return;

    try {

      await api.delete(`/attendance/${id}`);

      Swal.fire({

        icon: "success",

        title: "Deleted",

        timer: 1500,

        showConfirmButton: false,

      });

      loadAttendance();

    } catch (err) {

      Swal.fire({

        icon: "error",

        title: "Error",

        text:

          err.response?.data?.message ||

          "Delete failed.",

      });

    }

  };

  const filteredAttendance = attendance.filter((item) => {

    const key = keyword.toLowerCase();

    return (

      item.nama_lengkap
        ?.toLowerCase()
        .includes(key) ||

      item.nik
        ?.toLowerCase()
        .includes(key) ||

      item.status
        ?.toLowerCase()
        .includes(key)

    );

  });

  const totalPage = Math.ceil(

    filteredAttendance.length /

    itemPerPage

  );

  const currentData = filteredAttendance.slice(

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

            Attendance Management

          </h1>

          <p className="text-blue-100 mt-3 text-lg">

            Manage employee attendance quickly and accurately.

          </p>

        </div>

        <button
          onClick={() => navigate("/attendance/create")}
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

          <Plus size={20} />

          Add Attendance

        </button>

      </div>

    </div>

    {/* SUMMARY */}

    <div className="grid lg:grid-cols-4 gap-6 mt-8">

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-slate-500">

              Total Attendance

            </p>

            <h2 className="text-3xl font-black mt-2">

              {attendance.length}

            </h2>

          </div>

          <div
            className="
            w-14
            h-14
            rounded-2xl
            bg-blue-100
            flex
            items-center
            justify-center
            "
          >

            <CalendarCheck
              className="text-blue-600"
            />

          </div>

        </div>

      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-slate-500">

              Present

            </p>

            <h2 className="text-3xl font-black mt-2">

              {
                attendance.filter(
                  a => a.status === "Hadir"
                ).length
              }

            </h2>

          </div>

          <div
            className="
            w-14
            h-14
            rounded-2xl
            bg-green-100
            flex
            items-center
            justify-center
            "
          >

            <Users className="text-green-600" />

          </div>

        </div>

      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-slate-500">

              Leave

            </p>

            <h2 className="text-3xl font-black mt-2">

              {
                attendance.filter(
                  a => a.status === "Izin"
                ).length
              }

            </h2>

          </div>

          <div
            className="
            w-14
            h-14
            rounded-2xl
            bg-yellow-100
            flex
            items-center
            justify-center
            "
          >

            <CalendarCheck className="text-yellow-600" />

          </div>

        </div>

      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-slate-500">

              Sick

            </p>

            <h2 className="text-3xl font-black mt-2">

              {
                attendance.filter(
                  a => a.status === "Sakit"
                ).length
              }

            </h2>

          </div>

          <div
            className="
            w-14
            h-14
            rounded-2xl
            bg-red-100
            flex
            items-center
            justify-center
            "
          >

            <CalendarCheck className="text-red-600" />

          </div>

        </div>

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

      <div className="relative">

        <Search
          size={20}
          className="absolute left-5 top-4 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search by employee, NIK or status..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="
          w-full
          pl-14
          pr-5
          py-4
          border
          rounded-2xl
          outline-none
          focus:ring-2
          focus:ring-blue-500
          "
        />

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

              <th className="px-6 py-5 text-left">

                No

              </th>

              <th className="px-6 py-5 text-left">

                Employee

              </th>

              <th className="px-6 py-5 text-left">

                Date

              </th>

              <th className="px-6 py-5 text-left">

                Check In

              </th>

              <th className="px-6 py-5 text-left">

                Check Out

              </th>

              <th className="px-6 py-5 text-center">

                Status

              </th>

              <th className="px-6 py-5 text-center">

                Action

              </th>

            </tr>

          </thead>

          <tbody>

            {currentData.length > 0 ? (

              currentData.map((item, index) => (

                <tr
                  key={item.id_attendance}
                  className="
                  border-b
                  hover:bg-blue-50
                  transition-all
                  duration-200
                  "
                >

                  {/* NUMBER */}

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

                          {item.nik}

                        </p>

                      </div>

                    </div>

                  </td>

                  {/* DATE */}

                  <td className="px-6 py-5">

                    {new Date(item.tanggal).toLocaleDateString(
                      "id-ID"
                    )}

                  </td>

                  {/* CHECK IN */}

                  <td className="px-6 py-5">

                    {item.jam_masuk}

                  </td>

                  {/* CHECK OUT */}

                  <td className="px-6 py-5">

                    {item.jam_keluar}

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
                        item.status === "Hadir"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Izin"
                          ? "bg-yellow-100 text-yellow-700"
                          : item.status === "Sakit"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
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
                          navigate(
                            `/attendance/edit/${item.id_attendance}`
                          )
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
                          handleDelete(item.id_attendance)
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
                  className="py-20 text-center"
                >

                  <CalendarCheck
                    size={70}
                    className="mx-auto text-slate-300"
                  />

                  <h2 className="text-2xl font-bold mt-5">

                    Attendance Not Found

                  </h2>

                  <p className="text-slate-500 mt-2">

                    No attendance data matches your search.

                  </p>

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>
            {/* PAGINATION */}

      {totalPage > 1 && (

        <div
          className="
          flex
          justify-between
          items-center
          px-8
          py-6
          border-t
          "
        >

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

export default Attendance;