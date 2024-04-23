import { useParams } from "react-router-dom";
import { useGetUsersQuery } from "../users/usersApiSlice";
import { useGetNotesQuery } from "./notesApiSlice";
import EditNoteForm from "./EditNoteForm";
import Loading from "../../components/Loading";

export default function EditNote() {
  const { id } = useParams();
  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id],
    }),
  });

  const content =
    note && users ? <EditNoteForm users={users} note={note} /> : <Loading />;

  return content;
}
