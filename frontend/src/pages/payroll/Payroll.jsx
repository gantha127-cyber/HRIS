import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../services/api";
import Sidebar from "../../components/Sidebar";

import {
  Search,
  Pencil,
  Trash2,
  Wallet,
  Users,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function Payroll() {

  const navigate = useNavigate();

  const [payrolls, setPayrolls] = useState([]);
  const [keyword, setKeyword] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemPerPage = 8;

  useEffect(() => {

    loadPayroll();

  }, []);

  const loadPayroll = async () => {

    try {

      const res = await api.get("/payroll");

      setPayrolls(res.data.data);

    } catch (err) {

      console.error(err);

    }

  };

  const handleDelete = async (id) => {

    const result = await Swal.fire({

      title: "Delete Payroll?",

      text: "Payroll data will be deleted.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Delete",

      cancelButtonText: "Cancel",

    });

    if (!result.isConfirmed) return;

    try {

      await api.delete(`/payroll/${id}`);

      Swal.fire({

        icon: "success",

        title: "Success",

        text: "Payroll deleted successfully",

        timer: 1500,

        showConfirmButton: false,

      });

      loadPayroll();

    } catch (err) {

      Swal.fire({

        icon: "error",

        title: "Failed",

        text:
          err.response?.data?.message ||
          "Something went wrong",

      });

    }

  };

  const filteredPayroll = payrolls.filter((item) => {

    const key = keyword.toLowerCase();

    return (

      item.nama_lengkap
        ?.toLowerCase()
        .includes(key) ||

      item.bulan
        ?.toLowerCase()
        .includes(key)

    );

  });

  const totalPayroll = filteredPayroll.reduce(

    (sum, item) => sum + Number(item.total_gaji),

    0

  );

  const totalPage = Math.ceil(
    filteredPayroll.length / itemPerPage
  );

  const currentData = filteredPayroll.slice(

    (currentPage - 1) * itemPerPage,

    currentPage * itemPerPage

  );

  return (

    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-50">

      <Sidebar />

      <main className="flex-1 p-10">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold text-slate-800">

              Payroll Management

            </h1>

            <p className="text-slate-500 mt-2">

              HRIS Enterprise Payroll System

            </p>

          </div>

          <button
            onClick={() =>
              navigate("/payroll/create")
            }
            className="
            flex
            items-center
            gap-2
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            hover:scale-105
            transition
            text-white
            px-6
            py-4
            rounded-2xl
            shadow-lg
            "
          >

            <Plus size={20} />

            Add Payroll

          </button>

        </div>
                {/* STATISTIC */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-500">

                  Total Payroll

                </p>

                <h2 className="text-3xl font-bold mt-2">

                  {filteredPayroll.length}

                </h2>

              </div>

              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">

                <Wallet
                  size={30}
                  className="text-blue-600"
                />

              </div>

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-500">

                  Employees Paid

                </p>

                <h2 className="text-3xl font-bold mt-2">

                  {filteredPayroll.length}

                </h2>

              </div>

              <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">

                <Users
                  size={30}
                  className="text-green-600"
                />

              </div>

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-500">

                  Total Salary

                </p>

                <h2 className="text-2xl font-bold mt-2 text-green-600">

                  Rp {totalPayroll.toLocaleString("id-ID")}

                </h2>

              </div>

              <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center">

                <Wallet
                  size={30}
                  className="text-yellow-600"
                />

              </div>

            </div>

          </div>

        </div>

        {/* SEARCH */}

        <div className="mt-8 bg-white rounded-3xl shadow-lg p-6">

          <div className="relative">

            <Search
              size={20}
              className="absolute left-5 top-4 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search employee or month..."
              value={keyword}
              onChange={(e) =>
                setKeyword(e.target.value)
              }
              className="
              w-full
              pl-14
              pr-5
              py-4
              rounded-2xl
              border
              focus:ring-4
              focus:ring-blue-200
              outline-none
              "
            />

          </div>

        </div>

        {/* TABLE */}

        <div className="mt-8 bg-white rounded-3xl shadow-lg overflow-hidden">

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

                    Month

                  </th>

                  <th className="px-6 py-4 text-left">

                    Year

                  </th>

                  <th className="px-6 py-4 text-right">

                    Salary

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
      key={item.id_payroll}
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

          </div>

        </div>

      </td>

      {/* MONTH */}

      <td className="px-6 py-5">

        {item.bulan}

      </td>

      {/* YEAR */}

      <td className="px-6 py-5">

        {item.tahun}

      </td>

      {/* SALARY */}

      <td className="px-6 py-5 text-right">

        <span className="font-bold text-green-600">

          Rp{" "}

          {Number(item.total_gaji).toLocaleString("id-ID")}

        </span>

      </td>

      {/* ACTION */}

      <td className="px-6 py-5">

        <div className="flex justify-center gap-3">

          <button
            onClick={() =>
              navigate(
                `/payroll/edit/${item.id_payroll}`
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
              handleDelete(item.id_payroll)
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
      colSpan="6"
      className="
      py-20
      text-center
      text-slate-500
      "
    >

      <Wallet
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

        Payroll Not Found

      </h2>

      <p className="mt-2">

        No payroll data matches your search.

      </p>

    </td>

  </tr>

)}
            </tbody>

          </table>

        </div>
      
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

      </main>

    </div>

  );

}

export default Payroll;