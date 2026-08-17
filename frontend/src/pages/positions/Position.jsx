import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import api from "../../services/api";
import Sidebar from "../../components/Sidebar";

import {
  Briefcase,
  Search,
  Plus,
  Pencil,
  Trash2,
  Download,
  FileSpreadsheet,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function Position() {

  const navigate = useNavigate();

  const [positions, setPositions] = useState([]);

  const [keyword, setKeyword] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemPerPage = 8;

  useEffect(() => {

    loadPositions();

  }, []);

  const loadPositions = async () => {

    try {

      const res = await api.get("/positions");

      setPositions(res.data.data);

    } catch (err) {

      console.log(err);

    }

  };

  const handleDelete = async (id) => {

    const result = await Swal.fire({

      title: "Delete Position?",

      text: "Position will be deleted.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Delete",

      cancelButtonText: "Cancel",

    });

    if (!result.isConfirmed) return;

    try {

      await api.delete(`/positions/${id}`);

      Swal.fire({

        icon: "success",

        title: "Success",

        text: "Position deleted.",

        timer: 1500,

        showConfirmButton: false,

      });

      loadPositions();

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

  const filteredPosition = useMemo(() => {

    return positions.filter((item) =>

      item.nama_position

        .toLowerCase()

        .includes(keyword.toLowerCase())

    );

  }, [positions, keyword]);

  const totalPosition = positions.length;

  const totalPage = Math.ceil(

    filteredPosition.length / itemPerPage

  );

  const currentData = filteredPosition.slice(

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

            Position Management

          </h1>

          <p className="mt-3 text-blue-100 text-lg">

            Manage company positions professionally

          </p>

        </div>

        <button
          onClick={() => navigate("/positions/create")}
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

          <Plus size={22} />

          Add Position

        </button>

      </div>

    </div>

    {/* STATISTIC */}

    <div className="grid lg:grid-cols-3 gap-6 mt-8">

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <div className="flex justify-between">

          <div>

            <p className="text-slate-500">

              Total Position

            </p>

            <h2 className="text-4xl font-black mt-2">

              {totalPosition}

            </h2>

          </div>

          <div
            className="
            w-16
            h-16
            rounded-2xl
            bg-blue-100
            text-blue-600
            flex
            items-center
            justify-center
            "
          >

            <Briefcase size={30} />

          </div>

        </div>

      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <div className="flex justify-between">

          <div>

            <p className="text-slate-500">

              Search Result

            </p>

            <h2 className="text-4xl font-black mt-2 text-cyan-600">

              {filteredPosition.length}

            </h2>

          </div>

          <div
            className="
            w-16
            h-16
            rounded-2xl
            bg-cyan-100
            text-cyan-600
            flex
            items-center
            justify-center
            "
          >

            <Search size={30} />

          </div>

        </div>

      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <div className="flex justify-between">

          <div>

            <p className="text-slate-500">

              Status

            </p>

            <h2 className="text-2xl font-black mt-3 text-green-600">

              Active

            </h2>

          </div>

          <div
            className="
            w-16
            h-16
            rounded-2xl
            bg-green-100
            text-green-600
            flex
            items-center
            justify-center
            "
          >

            <Briefcase size={30} />

          </div>

        </div>

      </div>

    </div>

    {/* TOOLBAR */}

    <div className="bg-white rounded-3xl shadow-lg p-6 mt-8">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div className="relative flex-1">

          <Search
            size={20}
            className="absolute left-4 top-4 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search Position..."
            value={keyword}
            onChange={(e) => {

              setKeyword(e.target.value);

              setCurrentPage(1);

            }}
            className="
            w-full
            pl-12
            pr-5
            py-4
            rounded-2xl
            border
            border-slate-200
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            "
          />

        </div>

        <div className="flex gap-3">

          <button
            className="
            bg-red-500
            hover:bg-red-600
            text-white
            px-5
            py-3
            rounded-2xl
            flex
            items-center
            gap-2
            "
          >

            <Download size={18} />

            PDF

          </button>

          <button
            className="
            bg-green-600
            hover:bg-green-700
            text-white
            px-5
            py-3
            rounded-2xl
            flex
            items-center
            gap-2
            "
          >

            <FileSpreadsheet size={18} />

            Excel

          </button>

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

          <th className="px-6 py-5 text-left">

            No

          </th>

          <th className="px-6 py-5 text-left">

            Position

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
              key={item.id_position}
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

              {/* POSITION */}

              <td className="px-6 py-5">

                <div className="flex items-center gap-4">

                  <div
                    className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-gradient-to-r
                    from-blue-600
                    to-cyan-500
                    text-white
                    flex
                    items-center
                    justify-center
                    shadow
                    "
                  >

                    <Briefcase size={22} />

                  </div>

                  <div>

                    <h3 className="font-semibold text-lg">

                      {item.nama_position}

                    </h3>

                    <p className="text-slate-500 text-sm">

                      Company Position

                    </p>

                  </div>

                </div>

              </td>

              {/* STATUS */}

              <td className="px-6 py-5 text-center">

                <span
                  className="
                  px-4
                  py-2
                  rounded-full
                  bg-green-100
                  text-green-700
                  font-semibold
                  text-sm
                  "
                >

                  Active

                </span>

              </td>

              {/* ACTION */}

              <td className="px-6 py-5">

                <div className="flex justify-center gap-3">

                  <button
                    onClick={() =>
                      navigate(
                        `/positions/edit/${item.id_position}`
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
                      handleDelete(item.id_position)
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
              colSpan="4"
              className="
              py-20
              text-center
              "
            >

              <Briefcase
                size={70}
                className="mx-auto text-slate-300"
              />

              <h2 className="text-2xl font-bold mt-5">

                Position Not Found

              </h2>

              <p className="text-slate-500 mt-2">

                No position matches your search.

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

export default Position;