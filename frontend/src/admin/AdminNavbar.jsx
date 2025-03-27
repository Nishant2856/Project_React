import { NavLink, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("adminAuth");
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center bg-white shadow-md p-4">
      {/* Left Side: Logo */}
      <div className="flex items-center">
        <img src="/logo1.png" alt="Job Vault Logo" className="h-10" />
      </div>

      {/* Center: Navigation Links */}
      <div className="flex space-x-6">
        <NavLink
          to="/admin/companies"
          className={({ isActive }) =>
            `font-semibold ${
              isActive ? "text-blue-600" : "text-black"
            } hover:text-blue-500`
          }
        >
          Companies Detail
        </NavLink>

        <NavLink
          to="/admin/applicant"
          className={({ isActive }) =>
            `font-semibold ${
              isActive ? "text-blue-600" : "text-black"
            } hover:text-blue-500`
          }
        >
          Applicant Detail
        </NavLink>

        <NavLink
          to="/admin/reports"
          className={({ isActive }) =>
            `font-semibold ${
              isActive ? "text-blue-600" : "text-black"
            } hover:text-blue-500`
          }
        >
          Report
        </NavLink>
      </div>

      {/* Right Side: Sign Out Button & Admin Page Text */}
      <div className="flex items-center space-x-3">
        <span className="text-gray-700 font-bold">Admin Page,</span>
        <button
          onClick={handleSignOut}
          className="text-red-600 font-bold hover:text-red-800 transition"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
