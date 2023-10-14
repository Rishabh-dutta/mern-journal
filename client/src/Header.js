import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import logo from "./logo.png"
import { UserContext } from "./userContext";
export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  //const [username,setUsername]=useState(null);
  useEffect(() => {
     fetch('http://localhost:4000/profile',
    {
      credentials: 'include',
    }).then(response =>{
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  const logout= (ev)=>
  {
    fetch('http://localhost:4000/logout',
    {
      credentials: 'include',
      method: 'POST'
    });
    setUserInfo(null);
  }
const username=userInfo?.username;

  return (
    <header>
      

        <div class="right">
          {username && (
            <>
            <button class="btn"><Link to="/submit">Submit a journal</Link></button>
            <button class="btn" onClick={logout}>Log out</button> 
            </>
          )}
          {!username && (
            <>
                <button class="btn"><Link to="/login">Login</Link></button>
                <button class="btn"> <Link to="/register">Register</Link></button>
            </>
          )}
          


        </div>

        <div class="mid">

        </div>
        <div class="rightnav">
          <ul class="navbar">
            <li><Link to="/index">Home</Link> </li>
            <li><Link to="/blogs">Journals</Link></li>
            <li><Link to="#">Books</Link></li>
            <li><Link to="#">About Us</Link></li>
            <li><Link to="#">Contact Us</Link></li>
          </ul>
        </div>
        </header>
  
        /*
      <Link to="/" className="logo">MyBlog</Link>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>*/
    );
}