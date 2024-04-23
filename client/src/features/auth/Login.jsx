import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";

import usePersist from "../../hooks/usePersist";
import Loading from "../../components/Loading";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  // TODO: remove before prod
  const [username, setUsername] = useState("Petprog");
  const [password, setPassword] = useState("12345678");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      console.log({ erratCatch: err });
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  const errClass = errMsg ? "text-error" : "hidden";

  if (isLoading) return <Loading />;

  const content = (
    <section className="flex flex-col gap-4 flex-grow p-4">
      <header className="">
        <h1 className="text-3xl">Employee Login</h1>
      </header>
      <main className="flex-grow border-t-2 border-b-2 border-dark p-4">
        <p ref={errRef} className={errClass} aria-live="assertive">
          {errMsg}
        </p>

        <form
          className="flex flex-nowrap flex-col gap-4 max-w-3xl "
          onSubmit={handleSubmit}
        >
          <label htmlFor="username">Username:</label>
          <input
            className="p-2 rounded-2xl text-gray-900"
            type="text"
            id="username"
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete="off"
            required
          />

          <label className="mt-3" htmlFor="password">
            Password:
          </label>
          <input
            className="p-2 rounded-2xl text-gray-900"
            type="password"
            id="password"
            onChange={handlePwdInput}
            value={password}
            required
          />
          <button className="p-2 font-bold text-slate-900 bg-white mt-6 rounded-2xl">
            Sign In
          </button>

          <label
            className="form__label w-fit flex items-center gap-2"
            htmlFor="persist"
          >
            <input
              className="h-6 w-6"
              id="persist"
              name="completed"
              type="checkbox"
              checked={persist}
              onChange={handleToggle}
            />
            Trust This Device
          </label>
        </form>
      </main>
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </section>
  );

  return content;
};
export default Login;
