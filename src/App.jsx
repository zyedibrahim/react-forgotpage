import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./Home";
import { Signup } from "./Signup";
import { Forgotpage } from "./Forgotpage";
import { Confirmpassword } from "./Confirmpassword";
import { ActivationPage } from "./ActivationPage";
import { NotFound } from "./NotFound";

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpage" element={<Forgotpage />} />
        <Route path="/users/activation" element={<ActivationPage />} />
        <Route path="*" element={<NotFound />} />

        <Route
          path="/users/reset-password"
          element={<Confirmpassword />}
          caseSensitive
        />
      </Routes>
    </div>
  );
}

export default App;
