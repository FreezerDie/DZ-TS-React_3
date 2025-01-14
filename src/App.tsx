import React from "react";

import UserList from "./pages/UserList";
import UserDetails from "./pages/UserDetails";
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
