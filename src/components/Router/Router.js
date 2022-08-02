import * as React from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';

import MainPage from '../views/MainPage/MainPage';
import LandingPage from '../views/LandingPage/LandingPage';
import Page404 from '../views/Page404/Page404';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/map" element={<LandingPage />} />
        {/* Not Found */}
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
