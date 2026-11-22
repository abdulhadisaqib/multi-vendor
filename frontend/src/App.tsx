import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { LoginPage } from "./Routes.ts";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
