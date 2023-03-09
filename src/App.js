import "./index.css";
import Canvas from "./Components/Canvas/Canvas";
import Controls from "./Components/Controls/Controls";
import Box from "./Components/Box/Box";
import Datatable from "./Components/Datatable/Datatable";
import { Routes, Route, Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Canvas />
              <Controls />
              <Box />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;