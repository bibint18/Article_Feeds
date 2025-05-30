// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import RegisterForm from './components/RegisterForm';
// import VerifyOtpForm from './components/VerifyOtpForm';

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<RegisterForm />} />
//         <Route path="/verify-otp" element={<VerifyOtpForm/>} />
//         <Route path="/success" element={<div>Registration Successful!</div>} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;



import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store'
import Navbar from './components/Pages/Navbar';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Navbar />
          <AppRoutes />
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;