import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Router } from './routes';
import { getAuth } from './redux/auth';

function App() {
  const isAuth = useSelector(getAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) { navigate('/login') }
  }, [isAuth]);


  return <Router />;
}

export default App
