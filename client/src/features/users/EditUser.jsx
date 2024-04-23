import { useParams } from "react-router-dom";
import { useGetUsersQuery } from "./usersApiSlice";
import EditUserForm from "./EditUserForm";

import Loading from "../../components/Loading";

export default function EditUser() {
  const { id } = useParams();

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

  const content = user ? <EditUserForm user={user} /> : <Loading />;

  return content;
}
