import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import SignIn from './pages/sign-in';
import User from './pages/user';
import Error from './pages/error';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import './index.css';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
          <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/sign-in" element={<SignIn/>} />
                <Route path="/user" element={<User/>} />
                <Route path="*" element={<Error/>} />
            </Routes>
            <Footer />
          </Router>
      </React.StrictMode>
    </PersistGate>
  </Provider>
)
