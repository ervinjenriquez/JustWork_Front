import React from "react";
import MainDayPage from "./pages/MainDayPage/MainDayPage";
import IndividualDayPage from "./pages/IndividualDayPage/IndividualDayPage";
import { Route, Routes } from "react-router-dom";
import Header from "./shared/Header/Header";
/*
Challenge: Build the Hero component.
Check the Figma file for the design specifics.
*/

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/individualDayPage/:dayId" element={<IndividualDayPage />} />
        <Route 
          path="/"
          element={
            <MainDayPage />
          } 
        />
      </Routes>
    </div>
  )
}