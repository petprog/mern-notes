import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);
  const navigate = useNavigate();
  const [trueSuccess, setTrueSuccess] = useState(false);
  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    const isDevMode = import.meta.env.MODE === "development";

    const verifyRefreshToken = async () => {
      console.log("Verifying refresh token");
      try {
        await refresh();
        setTrueSuccess(true);
      } catch (err) {
        console.error(err);
      }
    };

    if (effectRan.current || !isDevMode) {
      if (!token && persist) {
        verifyRefreshToken();
      }
    }

    return () => {
      effectRan.current = true;
    };
  }, [persist, token, refresh]);

  useEffect(() => {
    if (isError && !token) navigate("/");
  }, [isError, navigate, token]);

  let content;
  if (!persist) {
    content = <Outlet />;
  } else if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = (
      <p className="text-error  inline-block bg-table-bg p-1">
        {error.data?.message}{" "}
        <Link to="/login" className="underline">
          Please login again
        </Link>
        .
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    content = <Outlet />;
  } else if (token && isUninitialized) {
    console.log("token and uninit");
    console.log(isUninitialized);
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
