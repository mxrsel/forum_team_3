import Posts from './components/Posts/Posts.tsx';
import { Route } from 'react-router-dom';

const App = () => {
    return (
        <>










          <Route path='/posts' element={<Posts/>} />

        </>
    );
};

export default App;