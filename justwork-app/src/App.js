import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainDayPage from "./MainDayPage/MainDayPage";
import IndividualDayPage from "./IndividualDayPage/IndividualDayPage";
/*
Challenge: Build the Hero component.
Check the Figma file for the design specifics.
*/

export default function App() {
  return (
    <div>
      <Router>
        <MainDayPage />
        <Routes>
          <Route path='/individualDayPage/:id' element={<IndividualDayPage />} />
        </Routes>
      </Router>

    </div>
  )
}