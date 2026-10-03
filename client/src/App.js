// src/App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import PetSelectionPage from "./pages/PetSelectionPage";
import PetRaisingPage from "./pages/PetRaisingPage";
import CgPage from "./pages/CGPage";
import BulletinPage from "./pages/BulletinPage";
import ProfilePage from "./pages/ProfilePage";
import StoryPage from "./pages/StoryPage";
import SocialHubPage from "./pages/SocialHubPage";
import RankPage from "./pages/RankPage";
import LoginForm from "./pages/LoginForm";
import AudioPlayer from "./components/AudioPlayer";

function App() {
  const user = useSelector((state) => state.user.data);

  return (
    <div>
      <AudioPlayer audioSrc="/audio/bgm.mp3" />
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <LoginPage />}
        />
        <Route
          path="/home"
          element={user ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/bulletin"
          element={user ? <BulletinPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/select-pet"
          element={user ? <PetSelectionPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/raise-pet"
          element={user ? <PetRaisingPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/cg"
          element={user ? <CgPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={user ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile/:userId"
          element={user ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/story"
          element={user ? <StoryPage /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/social"
          element={user ? <SocialHubPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/rank"
          element={user ? <RankPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
