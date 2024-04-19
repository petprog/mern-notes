import { useGetNotesQuery } from "./notesApiSlice";
import Note from "./Note";

const NotesList = () => {
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery(undefined, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = notes;

    const tableContent = ids?.length
      ? ids.map((noteId) => <Note key={noteId} noteId={noteId} />)
      : null;

    content = (
      <table className="text-base w-full grid grid-cols-6 text-white gap-1 table--users">
        <thead className="contents sticky top-0 z-10">
          <tr>
            <th
              scope="col"
              className="bg-white p-2 text-black text-left border note__status"
            >
              Username
            </th>
            <th
              scope="col"
              className="bg-white p-2 text-black text-left border note__created"
            >
              Created
            </th>
            <th
              scope="col"
              className="bg-white p-2 text-black text-left border note__updated"
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
              className="bg-white p-2 text-black text-left border note__username"
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
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};
export default NotesList;
