import React, { lazy } from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Layout from './components/Layout/layout';
import EmailDetails from './pages/Email/emailDetails';
import ResumeMatching from './pages/Matching';
import Register from './pages/Register';
import { store } from './store';

const theme = createTheme({
  direction: 'rtl',
  // other theme properties
});

const EmailListing = lazy(() => import('./pages/Email'));


const ProtectedRoute = ({ Component }) => {
  // const isLoggedIn = !!localStorage.getItem('token');
  // if (!isLoggedIn) return <Navigate to="/login" replace />;
  return (
    <Layout>
      <Component />
    </Layout>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <Provider store={store} >
      <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Register />} />
            <Route path='/' element={<ProtectedRoute Component = {EmailListing} /> } />
            <Route path='/email-details' element={<ProtectedRoute Component = {EmailDetails} />} />
            <Route path='/resume-matching' element={<ProtectedRoute Component = {ResumeMatching} />} />
          </Routes>
      </BrowserRouter>
    </Provider>
    </ThemeProvider>
  );
}; 
export default hot(App);
