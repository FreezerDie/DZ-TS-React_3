import React from "react";

import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";
import { Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path="/user/:id" element={<UserDetails />} />
    </Routes>
  );
};

export default App;
