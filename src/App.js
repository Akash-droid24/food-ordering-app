import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import RegistrationPage from './components/pages/RegistrationPage';
import LoginPage from './components/pages/LoginPage';
import PasswordResetPage from './components/pages/PasswordResetPage';
import SettingsPage from './components/pages/SettingsPage';
import AddAddress from './components/pages/AddAddress';
import AddPaymentDetails from './components/pages/AddPaymentDetails';
import ConfirmOrderPage from './components/pages/ConfirmOrderPage';
import PlaceOrderPage from './components/pages/PlaceOrderPage';
import OrderTrackingPage from './components/pages/OrderTrackingPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<PasswordResetPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/settings/add-address" element={<AddAddress />} />
        <Route path="/settings/add-payment" element={<AddPaymentDetails />} />
        <Route path="/confirmorder" element={<ConfirmOrderPage />} />
        <Route path="/placeorder" element={<PlaceOrderPage />} />
        <Route path="/order-tracking" element={<OrderTrackingPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
