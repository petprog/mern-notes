import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Welcome = () => {
  const { username, isManager, isAdmin } = useAuth();

  const today = new Date().toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  });

  const goToMappings = [
    { condition: true, path: "/dash/notes", label: "View Notes" },
    {
      condition: isManager || isAdmin,
      path: "/dash/users",
      label: "View User Settings",
    },
    { condition: true, path: "/dash/notes/new", label: "Add New Note" },
    {
      condition: isManager || isAdmin,
      path: "/dash/users/new",
      label: "Add New User",
    },
  ];

  const renderLinks = goToMappings
    .filter(({ condition }) => condition)
    .map(({ path, label }) => (
      <p
        key={label}
        className="h-6 duration-200 hover:text-[1.1rem] focus:text-[1.1rem]"
      >
        <Link to={path}>➜ {label}</Link>
      </p>
    ));

  return (
    <section className="flex flex-col gap-4">
      <p>{today}</p>
      <h1 className="text-2xl">Welcome! {username}</h1>
      {renderLinks}
    </section>
  );
};

export default Welcome;
