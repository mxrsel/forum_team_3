import LoginForm from './components/LoginForm/LoginForm.tsx';
import { Route, Routes } from 'react-router-dom';
import RegisterForm from './components/RegisterForm/RegisterForm.tsx';
import NavBar from './components/UI/NavBar/NavBar.tsx';
import NewPostForm from './components/NewPostForm/NewPostForm.tsx';
import Posts from './components/Posts/Posts.tsx';

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
            <Route path='/posts' element={<Posts/>} />
          </Routes>












        </>
    );
};

export default App;