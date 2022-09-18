import React from "react";
import MainDayPage from "./MainDayPage/MainDayPage";
import IndividualDayPage from "./IndividualDayPage/IndividualDayPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Switch } from "@mui/material";
/*
Challenge: Build the Hero component.
Check the Figma file for the design specifics.
*/

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/individualDayPage/:dayId" element={<IndividualDayPage />} />
        <Route path="/" element={<MainDayPage />} />
      </Routes>
    </div>
  )
}