import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeForm from "./components/EmployeeForm";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeTable />} />
        <Route path="/edit/:id" element={<EmployeeForm />} />
        <Route path="/create" element={<EmployeeForm />} />
      </Routes>
    </Router>
  );
};

export default App;
