import { useGetNotesQuery } from "./notesApiSlice";
import Note from "./Note";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";

const NotesList = () => {
  const { username, isManager, isAdmin } = useAuth();
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery("notesList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <p className="inline-block bg-table-bg text-error p-1 mb-2">
        {error?.data?.message}
      </p>
    );
  }

  if (isSuccess) {
    const { ids, entities } = notes;
    const filteredIds =
      isManager || isAdmin
        ? ids
        : ids.filter((noteId) => entities[noteId].username === username);

    const tableContent = filteredIds.map((noteId) => (
      <Note key={noteId} noteId={noteId} />
    ));

    return (
      <table className="text-base w-full grid md:grid-cols-maxi grid-cols-mini text-white gap-1">
        <thead className="contents sticky top-0 z-10">
          <tr className="contents">
            <th
              scope="col"
              className="bg-white p-2 text-black text-left border note__status"
            >
              Username
            </th>
            <th
              scope="col"
              className="bg-white p-2 text-black text-left border max-md:hidden"
            >
              Created
            </th>
            <th
              scope="col"
              className="bg-white p-2 text-black text-left border max-md:hidden"
            >
              Updated
            </th>
            <th
              scope="col"
              className="bg-white p-2 text-black text-left border note__title"
            >
              Title
            </th>
            <th
              scope="col"
              className="bg-white p-2 text-black text-left border max-md:hidden"
            >
              Owner
            </th>
            <th
              scope="col"
              className="bg-white p-2 text-black text-left border note__edit"
            >
              Edit
            </th>
          </tr>
        </thead>
        <tbody className="contents">{tableContent}</tbody>
      </table>
    );
  }
};

export default NotesList;
