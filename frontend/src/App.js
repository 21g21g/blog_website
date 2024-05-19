import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Projects from "./pages/Projects";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Commet from "./components/Commet";
import ProfileDashboard from "./components/ProfileDashboard";
import PostBlog from "./pages/PostBlog";
import AdminPrivateroute from "./components/AdminPrivateroute";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import Scrolltotop from "./components/Scrolltotop";
function App() {
  return (
    <div>
      <BrowserRouter>
      <Scrolltotop/>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/commets" element={<Commet />}></Route>
          {/* <Route element={<PrivateRoute />}> */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* </Route> */}

          <Route element={<AdminPrivateroute />}>
            <Route path="/createpost" element={<CreatePost />} />
          </Route>
          <Route path="/projects" element={<Projects />} />
          <Route path="/update/:id" element={<UpdatePost />} />
          <Route path="/post/:id" element={<PostBlog />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
