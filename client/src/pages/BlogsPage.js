import Post from "../post";

export default function BlogsPage ()
{
    return (
        <div className="Blogs">
            <div className="BlogPage_title">JOURNALS</div>
            <div class="search-container2">

                <input type="text" class="search-input" placeholder="Search..." />
                <button class="search-button">Search</button>

            </div>
            
            <div className="Listofjournals">
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
                
               
            </div>
        </div>
    );
}