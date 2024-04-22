import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Public from "./components/Public";
import DashLayout from "./pages/DashLayout";
import Welcome from "./features/auth/Welcome";
import NotesList from "./features/notes/NotesList";
import UsersList from "./features/users/UsersList";
import Login from "./features/auth/Login";
import NewUserForm from "./features/users/NewUserForm";
import EditUser from "./features/users/EditUser";
import EditNote from "./features/notes/EditNote";
import NewNote from "./features/notes/NewNote";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";
import { ROLES } from "./config/roles";
import RequireAuth from "./features/auth/RequireAuth";

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen flex-nowrap">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* public routes */}
              <Route index element={<Public />} />
              <Route path="login" element={<Login />} />

              {/* Protected Routes */}
              <Route element={<PersistLogin />}>
                <Route
                  element={
                    <RequireAuth allowedRoles={[...Object.values(ROLES)]} />
                  }
                >
                  <Route element={<Prefetch />}>
                    <Route path="dash" element={<DashLayout />}>
                      <Route index element={<Welcome />} />

                      <Route
                        element={
                          <RequireAuth
                            allowedRoles={[ROLES.Manager, ROLES.Admin]}
                          />
                        }
                      >
                        <Route path="users">
                          <Route index element={<UsersList />} />
                          <Route path=":id" element={<EditUser />} />
                          <Route path="new" element={<NewUserForm />} />
                        </Route>
                      </Route>

                      <Route path="notes">
                        <Route index element={<NotesList />} />
                        <Route path=":id" element={<EditNote />} />
                        <Route path="new" element={<NewNote />} />
                      </Route>
                    </Route>
                    {/* End Dash */}
                  </Route>
                </Route>
              </Route>
              {/* End Protected Routes */}
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
