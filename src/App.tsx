import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from './pages/Home';
import Layout from './utils/Layout';


const App = () => {
  return (
    <div>
      <Router>
            <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            </Routes>
      </Router>
    </div>
  )
}
export default App;
