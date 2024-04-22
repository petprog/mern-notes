import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isManager = false;
  let isAdmin = false;
  let status = "Employee";
  let username = "";
  let roles = [];

  if (token) {
    const decoded = jwtDecode(token);
    const { roles: userRoles, username: userUsername } = decoded.UserInfo;

    isManager = userRoles.includes("Manager");
    isAdmin = userRoles.includes("Admin");

    if (isManager) status = "Manager";
    if (isAdmin) status = "Admin";

    username = userUsername;
    roles = userRoles;
  }

  return { username, roles, status, isManager, isAdmin };
};

export default useAuth;
