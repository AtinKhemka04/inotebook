import "./App.css";
import About from "./Components/About";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/about" element={<About />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
