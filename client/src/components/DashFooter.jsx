import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DashFooter = () => {
  const { status, username } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onGoHomeClicked = () => navigate("/dash");

  let goHomeButton = null;
  if (pathname !== "/dash") {
    goHomeButton = (
      <button
        className="w-auto h-auto text-base hover:scale-125 focus:scale-125 duration-200 disabled:hidden"
        title="Home"
        onClick={onGoHomeClicked}
      >
        <FontAwesomeIcon icon={faHouse} />
      </button>
    );
  }

  const content = (
    <footer className="text-base sticky bottom-0 z-10 bg-dark border-t flex justify-start gap-4 p-4 bg-gray-900">
      {goHomeButton}
      <p>Current User: {username}</p>
      <p>Status: {status}</p>
    </footer>
  );
  return content;
};
export default DashFooter;
