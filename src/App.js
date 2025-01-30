// import logo from "./logo.svg";
import "./App.css";
// import Heropage from "./Components/heropage/heropage";
// import About from "./Components/about/about";
// import Footer2 from "./Components/footer2/footer2.jsx";
// import Loader from "./Components/loader/loader";
import { Routes, Route } from "react-router";
import Homepage from "./Components/homepage/homepage";
// import Footer from "./Components/footer/Footer.jsx";
import Event from "./Components/Event/Event.jsx";
import LoginForm from "./Components/Forms/LoginForm/LoginSignupForm.jsx";
import RegistrationForm from "./Components/Forms/RegistrationForm/RegistrationForm.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/events" element={<Event />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/registration" element={<RegistrationForm />}></Route>
      </Routes>
      
      
      {/* <Event /> */}
      {/* <Mentor />
      <Footer2 /> */}
      {/* <Footer /> */}
      {/* <Event /> */}
    </div>
  );
}

export default App;
