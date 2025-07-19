import "./App.css";

import React from "react";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import EditPost from "./pages/EditPost";
import ShowPost from "./pages/ShowPost";
import Navbar from "./pages/Navbar";
import ImageUpload from "./pages/ImageUpload";
import Home from "./pages/Home";
import ProctedRoute from "./protectedRoute/ProctedRoute";
// import { path } from 'path';
import PageNotFound from "./pagenotfound/PageNotFound";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <ProctedRoute>
                <Profile />
              </ProctedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProctedRoute>
                <EditPost />
              </ProctedRoute>
            }
          />
          <Route
            path="/showPost"
            element={
              <ProctedRoute>
                <ShowPost />
              </ProctedRoute>
            }
          />
          <Route
            path="/img-upload"
            element={
              <ProctedRoute>
                <ImageUpload />
              </ProctedRoute>
            }
          />
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
        
      </BrowserRouter>
      <Toaster />
    </>
  );
};

export default App;
