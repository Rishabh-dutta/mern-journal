import { useEffect, useState } from "react";
import Post from "../post";

export default function BlogsPage ()
{
    const [posts,setPosts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:4000/post').then(response => {
            response.json().then(posts => {
                setPosts(posts);
                //console.log(posts)
            });
        });
    }, [])
    return (
        <div className="Blogs">
            <div className="BlogPage_title">JOURNALS</div>
            <div class="search-container2">

                <input type="text" class="search-input" placeholder="Search..." />
                <button class="search-button">Search</button>

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