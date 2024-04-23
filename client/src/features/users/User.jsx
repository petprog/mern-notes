/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useGetUsersQuery } from "./usersApiSlice";
import { memo } from "react";

const User = ({ userId }) => {
  const navigate = useNavigate();

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });

  if (!user) return null;

  const handleEdit = () => navigate(`/dash/users/${userId}`);

  const userRolesString = user.roles.toString().replaceAll(",", ", ");

  const cellStatus = user.active ? "" : "bg-inactive";

  return (
    <tr className="contents user">
      <td className={`bg-white p-2 text-black text-left border ${cellStatus}`}>
        {user.username}
      </td>
      <td className={`bg-white p-2 text-black text-left border ${cellStatus}`}>
        {userRolesString}
      </td>
      <td
        className={`bg-white p-2 text-black text-center border ${cellStatus}`}
      >
        <button
          className="text-2xl duration-200 hover:scale-125 focus:scale-125"
          onClick={handleEdit}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </td>
    </tr>
  );
};

const memoizedUser = memo(User);

export default memoizedUser;
