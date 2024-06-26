import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/navBar/NavBar";
import HomePage from "./pages/HomePage";
import TutorListPage from "./pages/tutorList/TutorListPage";
import CoursePage from "./pages/CoursePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import SettingPage from "./pages/settings/SettingPage";
import ProfilePage from "./pages/settings/ProfilePage";
import WalletPage from "./pages/settings/wallet/WalletPage";
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
import Dasboard from "./pages/admin/Dasboard";
import HomeAdmin from "./pages/admin/HomeAdmin";
import AccountAdmin from "./pages/admin/AccountAdmin";
import TutorRequestAdmin from "./pages/admin/TutorRequestAdmin";
import TutorRequestDetail from "./pages/admin/TutorRequestDetail/TutorRequestDetail";
import Payment from "./pages/Payment";
import TutorManagement from "./pages/tutorManagement/TutorManagement";
import LessonsPage from "./pages/myLesson/LessonsPage";
import CalendarPage from "./pages/myLesson/CalendarPage";

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
            <Route path="/vn">
              <Route path="my-lessons" element={<MylessonPage />}>
                <Route path="lessons" element={<LessonsPage />} />
                <Route path="calendar" element={<CalendarPage />} />
              </Route>
              <Route path="settings" element={<SettingPage />}>
                <Route path="profile" element={<ProfilePage />} />
                <Route path="email" element={<EmailPage />} />
                <Route path="reset-pass" element={<ResetPassPage />} />
                <Route path="wallet" element={<WalletPage />} />
                <Route path="upgrade" element={<UpgradePage />} />
              </Route>
            </Route>
            <Route path="/favorite" element={<FavoritePage />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/tutor-registration" element={<TutorRegistration />} />
            <Route path="/tutor-management" element={<TutorManagement />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={["Tutor"]} />}>
            {/* <Route path="/tutor-management" element={<TutorManagement />} /> */}
          </Route>

          <Route
            element={<PrivateRoute allowedRoles={["Admin", "Moderator"]} />}
          >
            <Route path="/dashboard" element={<Dasboard />}>
              <Route path="home" element={<HomeAdmin />} />
              <Route path="accounts" element={<AccountAdmin />} />
              <Route path="tutor-request" element={<TutorRequestAdmin />} />
              <Route
                path="tutor-request-detail/:tutorId"
                element={<TutorRequestDetail />}
              />
            </Route>
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
