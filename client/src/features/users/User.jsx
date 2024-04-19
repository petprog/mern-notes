/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";

const User = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId));

  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`);

    const userRolesString = user.roles.toString().replaceAll(",", ", ");

    const cellStatus = user.active ? "" : "bg-inactive";

    return (
      <tr className="contents user">
        <td
          className={`bg-white p-2 text-black text-left border ${cellStatus}`}
        >
          {user.username}
        </td>
        <td
          className={`bg-white p-2 text-black text-left border ${cellStatus}`}
        >
          {userRolesString}
        </td>
        <td
          className={`bg-white p-2 text-black text-center border ${cellStatus}`}
        >
          <button className="icon-button p-1 text-2xl" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};
export default User;
