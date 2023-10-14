
//import './CSS material/App.css';
import './CSS material/header.css';
import './CSS material/journalpage.css';
import './CSS material/Post.css';
import './CSS material/searchbar.css';
import Header from './Header';
import Layout from './Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import BlogsPage from './pages/BlogsPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import SubmitPage from './pages/SubmitPage'
import Post from './post';
import {Route,Routes} from "react-router-dom";
import { UserContextProvider } from './userContext';
import PostPage from './pages/PostPage';



function App() {
  return (
      <UserContextProvider>
      <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<IndexPage />} />
      <Route path={'/login'} element={<LoginPage />} />
      <Route path={'/index'} element={<IndexPage />} />
      <Route path={'/register'} element={<RegisterPage />} />
      <Route path={'/blogs'} element={<BlogsPage />} />
      <Route path={'/profile'} element={<ProfilePage />} />
      <Route path={'/submit'} element={<SubmitPage />} />
      <Route path={'/post/:id'} element={<PostPage />} />
      </Route>
     
      </Routes>
      </UserContextProvider>
      
    
  
  );
}

export default App;
