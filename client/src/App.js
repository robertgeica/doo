import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<HomeScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;