import './App.css';
import { Route, Routes, json, useNavigate } from 'react-router-dom';
import ChatPage from './components/ChatPage/ChatPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import { useEffect, useState } from 'react';
import firebase from './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from './redux/actions/user_action';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log('user', user);
      // 로그인이 된 상태
      if (user) {
        navigate('/');
        dispatch(setUser(user));
      } else {
        navigate('/login');
        dispatch(clearUser(user));
      }
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
