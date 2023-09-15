import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <div className="NavBarDiv">
      <ul>
        <li>
          <NavLink
            style={({ isActive }) =>
              isActive ? { color: "white" } : undefined
            }
            to="/"
          >
            ListPage
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) =>
              isActive ? { color: "white" } : undefined
            }
            to="/upload"
          >
            UploadPage
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
