import LoginForm from './components/LoginForm/LoginForm.tsx';
import { Route, Routes } from 'react-router-dom';
import RegisterForm from './components/RegisterForm/RegisterForm.tsx';

const App = () => {
    return (
        <>
          <Routes>
            <Route path="/register" element={<RegisterForm/>}/>
            <Route path="/login" element={<LoginForm/>}/>
          </Routes>
        </>
    );
};

export default App;