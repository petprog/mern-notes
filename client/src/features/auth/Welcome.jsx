import { Link } from "react-router-dom";

const Welcome = () => {
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const content = (
    <section className="flex flex-col gap-4">
      <p>{today}</p>

      <h1>Welcome!</h1>

      <p>
        <Link to="/dash/notes" className="before:content-['➜']">
          {" "}
          View techNotes
        </Link>
      </p>

      <p>
        <Link to="/dash/users" className="before:content-['➜']">
          {" "}
          View User Settings
        </Link>
      </p>

      <p>
        <Link to="/dash/notes/new" className="before:content-['➜']">
          {" "}
          Add Notes
        </Link>
      </p>

      <p>
        <Link to="/dash/users/new" className="before:content-['➜']">
          {" "}
          Add New User
        </Link>
      </p>
    </section>
  );

  return content;
};
export default Welcome;
