import { useEffect, useState } from "react";
import Post from "../post";

export default function BlogsPage ()
{
    const [posts,setPosts] = useState([]);
    const [keyword,setKeyword] = useState("");
    useEffect(() => {
        fetch('http://localhost:4000/post').then(response => {
            response.json().then(posts => {
                setPosts(posts);
                //console.log(posts)
            });
        });
    }, [])
    let searchforkeyword = async (ev)=>{
        console.log("wello");
        fetch(`http://localhost:4000/searchforkeyword/${keyword}`).then(response => {
            response.json().then(posts => {
                setPosts(posts);
            });
        });
    }
    return (
        <div className="Blogs">
            <div className="BlogPage_title">JOURNALS</div>
            <div class="search-container2">

                <input type="text" class="search-input"
                placeholder="Search..." 
                value={keyword} 
                onChange={ev => setKeyword(ev.target.value) } />

                <button class="search-button" onClick={searchforkeyword}>Search</button>

            </div>
            
            <div className="Listofjournals">

            <>
               {posts.length > 0 && posts.map(post => (
                <Post {...post}/>
               ))}
            </>
               
                
               
            </div>
        </div>
    );
}

/*
 <div className="Pages">
                    <Post/>
                </div>
                <div className="Pages">
                    <Post/>
                </div>
                <div className="Pages">
                    <Post/>
                </div>
                <div className="Pages">
                    <Post/>
                </div>
                <div className="Pages">
                    <Post/>
                </div>
                <div className="Pages">
                    <Post/>
                </div>
                <div className="Pages">
                    <Post/>
                </div>
                <div className="Pages">
                    <Post/>
                </div>
                <div className="Pages">
                    <Post/>
                </div>
*/