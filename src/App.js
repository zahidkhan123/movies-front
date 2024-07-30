import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Movies from './components/Movies';
import AddEditMovie from './components/AddEditMovie';
import AuthWrapper from './components/AuthWrapper';
import './App.css';

const App = () => {
  return (
    <div className='main-div'>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/movies" element={
          <AuthWrapper>
            <Movies />
          </AuthWrapper>
        } />
        <Route path="/add-movie" element={
          <AuthWrapper>
            <AddEditMovie />
          </AuthWrapper>
        } />
        <Route path="/edit-movie/:id" element={
          <AuthWrapper>
            <AddEditMovie />
          </AuthWrapper>
        } />
      </Routes>
    </Router>
    </div>
);
};

export default App;
