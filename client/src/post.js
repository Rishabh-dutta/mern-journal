import {formatISO9075} from "date-fns";
export default function Post({title,summary,content,cover,createdAt,author}){
  /* <div className="image">
  <img src="https://techcrunch.com/wp-content/uploads/2023/05/T-15882236-L.jpg?w=1390&crop=1"></img>
  </div>*/
    /*return(
      

      <div className="post">
   
      <div className="texts">
        <h2>Full-house battery backup coming next year</h2>
        <p className="info">
          <a className="author">David Paszko</a>
          <time>2023-01-06 16:45</time>
        </p>
        <p>Nvidia’s second-quarter earnings, which were reported Wednesday after markets closed, 
          prove there is money to be made — and lots of it — selling the picks and
           shovels of the generative AI boom.
            </p>
            </div>
            </div>
            
    );*/


    return(
      

      <div className="post">
   
      <div className="texts">
        <h2>{title}</h2>
        <p className="info">
          <a className="author">{author.username}</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p>{summary}
            </p>
            </div>
            </div>
    );
   
}