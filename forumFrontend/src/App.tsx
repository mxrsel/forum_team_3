import LoginForm from './components/LoginForm/LoginForm.tsx';
import { Navigate, Route, Routes } from 'react-router-dom';
import RegisterForm from './components/RegisterForm/RegisterForm.tsx';
import NavBar from './components/UI/NavBar/NavBar.tsx';
import Posts from './components/Posts/Posts.tsx';
import FullPost from './components/Posts/FullPost.tsx';
import NewPost from './containers/NewPost/NewPost.tsx';

const App = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/add-post" element={<NewPost />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:postId" element={<FullPost />} />
      </Routes>
    </>
  );
};

export default App;
