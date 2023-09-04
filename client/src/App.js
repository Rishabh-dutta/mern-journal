
import './App.css';
import Header from './Header';
import Layout from './Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import BlogsPage from './pages/BlogsPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import Post from './post';
import {Route,Routes} from "react-router-dom";
import { UserContextProvider } from './userContext';



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
      </Route>
     
      </Routes>
      </UserContextProvider>
      
    
  
  );
}

export default App;
