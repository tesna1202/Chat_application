import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Join from './Views/Join/Join';
import Chat from './Views/Chat/Chat';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Join />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  </BrowserRouter>
);

export default App;