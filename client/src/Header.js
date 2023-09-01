import { Link } from "react-router-dom";
import logo from "./logo.png"
export default function Header() {
  return (
    <restheader>
      

        <div class="right">
          <button class="btn"><Link to="/login">Login</Link></button>
          <button class="btn"> <Link to="/register">Register</Link></button>


        </div>

        <div class="mid">

        </div>
        <div class="rightnav">
          <ul class="navbar">
            <li><Link to="/index">Home</Link> </li>
            <li><Link to="#">Journals</Link></li>
            <li><Link to="#">Books</Link></li>
            <li><Link to="#">About Us</Link></li>
            <li><Link to="#">Contact Us</Link></li>
          </ul>
        </div>
        </restheader>
  
        /*
      <Link to="/" className="logo">MyBlog</Link>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>*/
    );
}