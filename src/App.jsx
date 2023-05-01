import React from 'react';
import styles from './style.scss'
import Header from './components/Header/Header'
import Dashboard from './components/Dashboard/index'
import Homepage from './components/pages/Homepage'
import Portfolio from './components/pages/Portfolio';
import NotFound from './components/NotFound/NotFound';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import DetailView from './components/PortfolioGrid/DetailView/DetailView'
import './firebase'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:1337';

function App() {
  return (
    <AnimatePresence exitBeforeEnter initial={true}>
      <ToastContainer />
      <div className='App'>
        <BrowserRouter>
            <Header />
            <Routes>
              <Route exact path='/' element={<Homepage />}/>
              <Route exact path='/dashboard' element={<Dashboard />}/>
              <Route exact path='/works' element={<Portfolio />}/>
              <Route exact path='/works/:id' element={<DetailView />} />
              <Route exact path='/*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
      </div>
    </AnimatePresence>
  );
}

export default App;
