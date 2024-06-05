import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/navBar/NavBar";
import HomePage from "./pages/HomePage";
import TutorListPage from "./pages/tutorList/TutorListPage";
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
import {
  ExceptAdminModRoute,
  PrivateRoute,
  PublicRoute,
} from "./components/CustomRoutes";
import Chat from "./components/chat/Chat";
import TutorDetail from "./pages/TutorDetail";
import { AuthProvider } from "./hooks/AuthContext"; // Import the AuthProvider
import UnauthorizedPage from "./pages/UnauthorizedPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPassPage from "./pages/settings/ResetPassPage";
import BecomeTutor from "./pages/BecomeTutor";
import TutorRegistration from "./pages/tutorRegistration/TutorRegistration";
import MylessonPage from "./pages/myLesson/MylessonPage";
import FavoritePage from "./pages/FavoritePage";
import EmailPage from "./pages/settings/EmailPage";

function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <BrowserRouter>
        <ShowNavbar>
          <NavBar />
          <Chat />
        </ShowNavbar>
        <Routes>
          <Route
            element={
              <ExceptAdminModRoute exceptRoles={["Admin", "Moderator"]} />
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/tutor-detail/:id" element={<TutorDetail />} />
            <Route path="/tutor-list" element={<TutorListPage />} />
            <Route path="/course" element={<CoursePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/become-tutor" element={<BecomeTutor />} />
          </Route>

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/reset" element={<ResetPasswordPage />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={["Student", "Tutor"]} />}>
            <Route path="/settings" element={<SettingPage />}>
              <Route path="profile" element={<ProfilePage />} />
              <Route path="email" element={<EmailPage />} />
              <Route path="reset-pass" element={<ResetPassPage />} />
              <Route path="wallet" element={<WalletPage />} />
              <Route path="upgrade" element={<UpgradePage />} />
            </Route>
            <Route path="/my-lessons" element={<MylessonPage />} />
            <Route path="/favorite" element={<FavoritePage />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={["Student"]} />}>
            <Route path="/tutor-registration" element={<TutorRegistration />} />
          </Route>

          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/notfoundpage" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
