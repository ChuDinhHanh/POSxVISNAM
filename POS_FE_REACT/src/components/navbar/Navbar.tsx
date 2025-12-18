import React from "react";
import { NavLink } from "react-router-dom";
export const Navbar: React.FC = () => {
  return (
    <nav className=" bg-slate-50 sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-6 justify-between">
        <span className="text-indigo-600 font-bold text-xl tracking-tight">
          POS
        </span>
        <div className="flex gap-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-3 py-1 rounded-md transition
             ${isActive ? "bg-slate-200 " : "hover:bg-slate-400 "}`
            }
          >
            POS
          </NavLink>

          <NavLink
            to="/order"
            className={({ isActive }) =>
              `px-3 py-1 rounded-md transition 
           ${isActive ? "bg-slate-200" : "hover:bg-slate-400"}`
            }
          >
            ORDER
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
