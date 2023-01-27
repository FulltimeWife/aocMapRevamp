import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import UserDashboard from "./pages/UserDashboard";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import Home from "./pages/Home"
import Header from "./components/Header";
import Zone from "./pages/Zone";

function App() {
  return (
    <>
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path ="/zone/:id" element={<Zone />}></Route>
          <Route path="/register" element={<UserRegister />}></Route>
          <Route path="/login" element={<UserLogin />}></Route>
          <Route path="/dashboard" element={<UserDashboard />}></Route>      
        </Routes>
      </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
