import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCirclePlus,
  faFilePen,
  faUserGear,
  faUserPlus,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link, useLocation } from "react-router-dom";

import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import useAuth from "../hooks/useAuth";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

export default function DashHeader() {
  const { isManager, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  let dashClass = null;
  if (
    !DASH_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = "max-w-3xl";
  }

  const onNavLinkClick = (path) => () => navigate(path);
  if (isLoading) return <p>Logging Out...</p>;

  if (isError)
    return (
      <p className="inline-block bg-table-bg text-error p-1 mb-2">
        Error: {error?.data?.message}
      </p>
    );

  const buttonMappings = [
    {
      condition: NOTES_REGEX.test(pathname),
      onClick: onNavLinkClick("/dash/notes/new"),
      icon: faFileCirclePlus,
      title: "New Note",
    },
    {
      condition: USERS_REGEX.test(pathname),
      onClick: onNavLinkClick("/dash/users/new"),
      icon: faUserPlus,
      title: "New User",
    },
    {
      condition:
        (isManager || isAdmin) &&
        pathname.includes("/dash") &&
        !USERS_REGEX.test(pathname),
      onClick: onNavLinkClick("/dash/users"),
      icon: faUserGear,
      title: "Users",
    },
    {
      condition: pathname.includes("/dash") && !NOTES_REGEX.test(pathname),
      onClick: onNavLinkClick("/dash/notes"),
      icon: faFilePen,
      title: "Notes",
    },
    {
      condition: true,
      onClick: sendLogout,
      icon: faSignOutAlt,
      title: "Logout",
    },
  ];

  const visibleButtons = buttonMappings
    .filter(({ condition }) => condition)
    .map(({ onClick, icon, title }) => (
      <button
        className="text-3xl duration-200 hover:scale-125 focus:scale-125"
        title={title}
        onClick={onClick}
        key={title}
      >
        <FontAwesomeIcon icon={icon} />
      </button>
    ));

  return (
    <header className="sticky top-0 z-10 bg-dark p-4 border-b bg-gray-900">
      <div className={`flex justify-between items-center ${dashClass}`}>
        <Link to="/dash">
          <h1 className="text-xl md:text-2xl  font-semibold ">techNotes</h1>
        </Link>
        <nav className="flex flex-nowrap justify-end gap-4 max-sm:gap-0 ">
          {visibleButtons}
        </nav>
      </div>
    </header>
  );
}
