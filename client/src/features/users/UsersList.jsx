import { useGetUsersQuery } from "./usersApiSlice.js";
import User from "./User";
import Loading from "../../components/Loading.jsx";
const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <Loading />;

  if (isError) {
    content = (
      <p className="inline-block bg-table-bg text-error p-1 mb-2">
        {error?.data?.message}
      </p>
    );
  }
  if (isSuccess) {
    const { ids } = users;

    const tableContent =
      ids?.length && ids.map((userId) => <User key={userId} userId={userId} />);

    content = (
      <table className="text-base w-full grid grid-cols-mini text-white gap-1">
        <thead className="contents sticky top-0 z-10">
          <tr className="contents">
            <th
              scope="col"
              className="bg-white p-2 text-black text-left border user__username"
            >
              Username
            </th>
            <th
              scope="col"
              className="bg-white p-2 text-black text-left border user__roles"
            >
              Roles
            </th>
            <th
              scope="col"
              className="bg-white p-2 text-black text-left border user__edit"
            >
              Edit
            </th>
          </tr>
        </thead>
        <tbody className="contents">{tableContent}</tbody>
      </table>
    );
  }

  return content;
};
export default UsersList;
