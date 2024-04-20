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
    content = <p className="text-error">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = notes;

    const tableContent = ids?.length
      ? ids.map((noteId) => <Note key={noteId} noteId={noteId} />)
      : null;

    content = (
      <table className="text-base w-full grid md:grid-cols-maxi grid-cols-mini text-white gap-1 table--notes">
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
              className="bg-white p-2 text-black text-left border max-md:hidden "
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

  return content;
};
export default NotesList;
