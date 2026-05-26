import { NavLink } from "react-router-dom"

export default function Tab({ to, label }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `
        px-4 py-1 text-sm rounded-t-lg font-medium transition-all
        ${
          isActive
            ? "text-red-700 px-10 border-t-2 border-x-2 border-gray-300 bg-gray-100 cursor-default z-10 -mb-0.5"
            : "text-gray-500 border-t-2 border-x-2 border-transparent hover:text-red-800"
        }
      `
      }
    >
      {label}
    </NavLink>
  )
}