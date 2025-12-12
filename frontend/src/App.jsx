import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginButton from "./LoginButton";
import SSOCallback from "./SSOCallback";
import RequireAuth from "./RequireAuth";
import Dashboard from "./Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginButton />} />
        <Route path="/sso" element={<SSOCallback />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
