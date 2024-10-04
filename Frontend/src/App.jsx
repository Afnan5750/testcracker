// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/pages/Navbar";
import HeroSection from "./components/pages/HeroSection";
import LatestJobs from "./components/pages/LatestJobs";
import FilterSection from "./components/pages/FilterSection";
import Footer from "./components/pages/Footer";
import ChapterDetail from "./components/pages/ChapterDetails";
import Mcqs from "./components/pages/Mcqs";
import SubjectMcqs from "./components/pages/SubjectMcqs";
import LoginForm from "./components/pages/LoginForm";
import SignupForm from "./components/pages/SignupForm";
import { AuthProvider } from "./context/AuthContext";
import ProfilePage from "./components/pages/ProfilePage";
import FilterSectionSubject from "./components/pages/FilterSectionSubject";
import ChapterDetailSubject from "./components/pages/ChapterDetailSubject";
import NotFoundPage from "./components/pages/NotFoundPage";
import AdminPage from "./components/pages/AdminPage";
import ForgotPassword from "./components/pages/ForgotPassword";
import ResetCode from "./components/pages/ResetCode";
import ResetPassword from "./components/pages/ResetPassword";
import AddSubjectForm from "./components/pages/AddSubjectForm";
import AddJobSubjectForm from "./components/pages/AddJobSubjectForm";
import AddSubjectChapterForm from "./components/pages/AddSubjectChapterForm";
import AddJobChapterForm from "./components/pages/AddJobChapterForm";
import AddSubjectMcqsForm from "./components/pages/AddSubjectMcqsForm";
import AddJobMcqsForm from "./components/pages/AddJobMcqsForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <ToastContainer // Add ToastContainer here
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
            pauseOnFocusLoss
          />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <LatestJobs />
                  <FilterSection />
                  <FilterSectionSubject />
                </>
              }
            />
            <Route path="/admin" element={<AdminPage />} />
            <Route
              path="/chapter-detail/:category"
              element={<ChapterDetail />}
            />
            <Route
              path="/chapter-detail-subject/:category"
              element={<ChapterDetailSubject />}
            />
            <Route
              path="/job-subject-mcqs/:category/:chapterNumber"
              element={<Mcqs />}
            />

            <Route
              path="/subject-mcqs/:category/:chapterNumber"
              element={<SubjectMcqs />}
            />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-code" element={<ResetCode />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/add-subject" element={<AddSubjectForm />} />
            <Route path="/add-job-subject" element={<AddJobSubjectForm />} />
            <Route path="/add-chapter" element={<AddSubjectChapterForm />} />
            <Route path="/add-job-chapter" element={<AddJobChapterForm />} />
            <Route path="/add-mcqs" element={<AddSubjectMcqsForm />} />
            <Route path="/add-job-mcqs" element={<AddJobMcqsForm />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
