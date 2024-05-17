import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/navBar/NavBar";
import HomePage from "./pages/HomePage";
import TutorListPage from "./pages/TutorListPage";
import CoursePage from "./pages/CoursePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import SettingPage from "./pages/settings/SettingPage";
import ProfilePage from "./pages/settings/ProfilePage";
import WalletPage from "./pages/settings/WalletPage";
import UpgradePage from "./pages/settings/UpgradePage";
import LoginPage from "./pages/LoginPage";
import ShowNavbar from "./components/navBar/ShowNavbar";
import SignUpPage from "./pages/SignUpPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Chat from "./components/chat/Chat";
import TutorDetail from "./pages/TutorDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <ShowNavbar>
          <NavBar />
          <Chat/>
        </ShowNavbar>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tutor-detail/:id" element={<TutorDetail/>}/>
          <Route path="/tutor-list" element={<TutorListPage />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/about" element={<AboutPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/reset" element={<ResetPasswordPage />} />

          <Route path="/settings" element={<SettingPage />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="wallet" element={<WalletPage />} />
            <Route path="upgrade" element={<UpgradePage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
