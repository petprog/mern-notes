import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersApiSlice";
import { selectNoteById } from "./notesApiSlice";
import EditNoteForm from "./EditNoteForm";

export default function EditNote() {
  const { id } = useParams();
  const users = useSelector(selectAllUsers);

  const note = useSelector((state) => selectNoteById(state, id));

  const content =
    note && users ? (
      <EditNoteForm users={users} note={note} />
    ) : (
      <p>Loading...</p>
    );

  return content;
}
