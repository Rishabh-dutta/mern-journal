import Post from "../post";
import logo from "../logo.png"
import "../CSS material/App.css"


export default function IndexPage() {
    /*return (
        <div>
            <Post />
            <Post />
            <Post />
        </div>
    );*/
    return (
        <body>
            <div class="search-container">

                <input type="text" class="search-input" placeholder="Search..." />
                <button class="search-button">Search</button>

            </div>
            <div class="header">

                <div class="left">

                    <img src={logo} alt="Error Loading Image" />
                </div>
            </div>
        </body>
    );
}