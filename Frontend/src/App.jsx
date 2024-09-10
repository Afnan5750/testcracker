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
import LoginForm from "./components/pages/LoginForm";
import SignupForm from "./components/pages/SignupForm";
import { AuthProvider } from "./context/AuthContext";
import ProfilePage from "./components/pages/ProfilePage";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <LatestJobs />
                  <FilterSection />
                </>
              }
            />
            <Route
              path="/chapter-detail/:category"
              element={<ChapterDetail />}
            />
            <Route path="/mcqs/:category/:chapterNumber" element={<Mcqs />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
