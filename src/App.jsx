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

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tutor-list" element={<TutorListPage />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset" element={<ResetPasswordPage />} /> */}

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
