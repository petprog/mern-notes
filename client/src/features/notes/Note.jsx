/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectNoteById } from "./notesApiSlice";

const Note = ({ noteId }) => {
  const note = useSelector((state) => selectNoteById(state, noteId));

  const navigate = useNavigate();

  if (note) {
    const created = new Date(note.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const updated = new Date(note.updatedAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const handleEdit = () => navigate(`/dash/notes/${noteId}`);

    return (
      <tr className="contents">
        <td className="bg-white p-2 text-black text-left border font-bold">
          {note.completed ? (
            <span className="text-status-complete">Completed</span>
          ) : (
            <span className="text-status-open">Open</span>
          )}
        </td>
        <td className="bg-white p-2 text-black text-left border max-md:hidden">
          {created}
        </td>
        <td className="bg-white p-2 text-black text-left border max-md:hidden">
          {updated}
        </td>
        <td className="bg-white p-2 text-black text-left border note__title">
          {note.title}
        </td>
        <td className="bg-white p-2 text-black text-left border max-md:hidden">
          {note.username}
        </td>

        <td className="bg-white p-2 text-black text-left border">
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};
export default Note;
