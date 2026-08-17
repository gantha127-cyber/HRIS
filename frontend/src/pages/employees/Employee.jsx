import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import api from "../../services/api";
import Sidebar from "../../components/Sidebar";

import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Users,
  UserCheck,
  UserX,
  Building2,
  Download,
  FileSpreadsheet,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function Employee() {

  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);

  const [keyword, setKeyword] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemPerPage = 8;

  useEffect(() => {

    loadEmployees();

  }, []);

  const loadEmployees = async () => {

    try {

      const res = await api.get("/employees");

      setEmployees(res.data.data);

    } catch (err) {

      console.error(err);

    }

  };

  const handleDelete = async (id) => {

    const result = await Swal.fire({

      title: "Hapus Data?",

      text: "Data karyawan akan dihapus.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Ya, Hapus",

      cancelButtonText: "Batal",

    });

    if (!result.isConfirmed) return;

    try {

      await api.delete(`/employees/${id}`);

      Swal.fire({

        icon: "success",

        title: "Berhasil",

        text: "Data berhasil dihapus",

        timer: 1500,

        showConfirmButton: false,

      });

      loadEmployees();

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

  const filteredEmployee = useMemo(() => {

    const key = keyword.toLowerCase();

    return employees.filter((emp) =>

      emp.nama_lengkap.toLowerCase().includes(key) ||

      emp.nik.toLowerCase().includes(key) ||

      emp.email.toLowerCase().includes(key) ||

      emp.nama_department.toLowerCase().includes(key)

    );

  }, [employees, keyword]);

  const totalEmployee = employees.length;

  const activeEmployee = employees.filter(
    (emp) => emp.status === "Aktif"
  ).length;

  const inactiveEmployee = employees.filter(
    (emp) => emp.status !== "Aktif"
  ).length;

  const totalDepartment = new Set(
    employees.map((emp) => emp.nama_department)
  ).size;

  const totalPage = Math.ceil(
    filteredEmployee.length / itemPerPage
  );

  const currentData = filteredEmployee.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  );

  return (
    <div className="flex min-h-screen bg-slate-100">

  <Sidebar />

  <main className="flex-1 p-8 overflow-auto">

    {/* HEADER */}

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

            Employee Management

          </h1>

          <p className="mt-3 text-blue-100 text-lg">

            Manage all employee data in one place

          </p>

        </div>

        <button

          onClick={() => navigate("/employees/create")}

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

          Add Employee

        </button>

      </div>

    </div>

    {/* STATISTIC */}

    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mt-8">

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <div className="flex justify-between">

          <div>

            <p className="text-slate-500">

              Total Employee

            </p>

            <h2 className="text-4xl font-black mt-2">

              {totalEmployee}

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

            <Users size={30} />

          </div>

        </div>

      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <div className="flex justify-between">

          <div>

            <p className="text-slate-500">

              Active

            </p>

            <h2 className="text-4xl font-black mt-2 text-green-600">

              {activeEmployee}

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

            <UserCheck size={30} />

          </div>

        </div>

      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <div className="flex justify-between">

          <div>

            <p className="text-slate-500">

              Inactive

            </p>

            <h2 className="text-4xl font-black mt-2 text-red-600">

              {inactiveEmployee}

            </h2>

          </div>

          <div
            className="
            w-16
            h-16
            rounded-2xl
            bg-red-100
            text-red-600
            flex
            items-center
            justify-center
            "
          >

            <UserX size={30} />

          </div>

        </div>

      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <div className="flex justify-between">

          <div>

            <p className="text-slate-500">

              Department

            </p>

            <h2 className="text-4xl font-black mt-2 text-cyan-600">

              {totalDepartment}

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

            <Building2 size={30} />

          </div>

        </div>

      </div>

    </div>
        {/* TOOLBAR */}

    <div className="bg-white rounded-3xl shadow-lg p-6 mt-8">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        {/* SEARCH */}

        <div className="relative flex-1">

          <Search
            size={20}
            className="absolute left-4 top-4 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search employee by name, NIK, email, department..."
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
            transition
            "
          />

        </div>

        {/* BUTTON */}

        <div className="flex gap-3">

          <button
            className="
            flex
            items-center
            gap-2
            bg-red-500
            hover:bg-red-600
            text-white
            px-5
            py-3
            rounded-2xl
            transition
            "
          >

            <Download size={18} />

            PDF

          </button>

          <button
            className="
            flex
            items-center
            gap-2
            bg-green-600
            hover:bg-green-700
            text-white
            px-5
            py-3
            rounded-2xl
            transition
            "
          >

            <FileSpreadsheet size={18} />

            Excel

          </button>

        </div>

      </div>

      {/* INFO */}

      <div className="flex justify-between items-center mt-6">

        <div>

          <h3 className="font-bold text-lg">

            Employee List

          </h3>

          <p className="text-slate-500">

            Showing

            {" "}

            <span className="font-semibold">

              {filteredEmployee.length}

            </span>

            {" "}employees

          </p>

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

                Email

              </th>

              <th className="px-6 py-4 text-left">

                Department

              </th>

              <th className="px-6 py-4 text-left">

                Position

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

  currentData.map((emp, index) => (

    <tr
      key={emp.id_employee}
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

            {emp.nama_lengkap
              ?.charAt(0)
              ?.toUpperCase()}

          </div>

          <div>

            <h3 className="font-semibold">

              {emp.nama_lengkap}

            </h3>

            <p className="text-slate-500 text-sm">

              {emp.nik}

            </p>

          </div>

        </div>

      </td>

      {/* EMAIL */}

      <td className="px-6 py-5">

        {emp.email}

      </td>

      {/* DEPARTMENT */}

      <td className="px-6 py-5">

        {emp.nama_department}

      </td>

      {/* POSITION */}

      <td className="px-6 py-5">

        {emp.nama_position}

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
            emp.status === "Aktif"

              ? "bg-green-100 text-green-700"

              : "bg-red-100 text-red-700"
          }
          `}
        >

          {emp.status}

        </span>

      </td>

      {/* ACTION */}

      <td className="px-6 py-5">

        <div className="flex justify-center gap-3">

          <button
            onClick={() =>
              navigate(
                `/employees/edit/${emp.id_employee}`
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
              handleDelete(emp.id_employee)
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

      <Users
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

        Employee Not Found

      </h2>

      <p className="text-slate-500 mt-2">

        No employee matches your search.

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

export default Employee;