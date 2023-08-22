import * as React from 'react';
import {  Route, BrowserRouter, Routes } from 'react-router-dom';
import Leaderboard from "./pages/Leaderboard/Leaderboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            path="leaderboard"
            element={<Leaderboard />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
