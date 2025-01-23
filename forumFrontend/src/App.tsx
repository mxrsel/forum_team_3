import LoginForm from './components/LoginForm/LoginForm.tsx';
import { Route, Routes } from 'react-router-dom';
import RegisterForm from './components/RegisterForm/RegisterForm.tsx';
import NavBar from './components/UI/NavBar/NavBar.tsx';
import NewPostForm from './components/NewPostForm/NewPostForm.tsx';

const App = () => {
    return (
        <>
          <header>
            <NavBar/>
          </header>
          <Routes>
            <Route path="/register" element={<RegisterForm/>}/>
            <Route path="/login" element={<LoginForm/>}/>
            <Route path="/add-post" element={<NewPostForm/>}/>
          </Routes>
        </>
    );
};

export default App;