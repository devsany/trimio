import { Route, Routes } from "react-router-dom";
import SeparateURL from "./components/SeparateURL";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<SeparateURL />} />
      </Routes>
    </>
  );
}

export default App;
