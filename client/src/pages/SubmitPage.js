import { useState } from "react";
import ReactQuill from "react-quill";
import { Navigate } from "react-router-dom"
import 'react-quill/dist/quill.snow.css';


const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']]};


const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];



export default function SubmitPage() {
    //author info
    //references  <textarea name="" id="" cols="30" rows="10"></textarea>
    //citations
    //license
    //doi

    const [redirect,setRedirect]=useState(false);
    const [title,setTitle]=useState('');
    const [summary,setSummary]=useState('');
    const [content,setContent]=useState('');
    const [files,setFiles]=useState('');

    const submitJournal=async (ev)=>{
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        
        

        ev.preventDefault();
        //console.log(files);
        const response= await fetch('http://localhost:4000/submit', {
            method: 'POST',
            body: data,
            credentials: 'include',
            
        });
        //console.log(await response.json());
        if(response.ok) {
            setRedirect(true);

        }
       

    }
    if(redirect)
    {
        return <Navigate to={'/'} />
    }

    return (
        <form onSubmit={submitJournal}>
            <input type="title" 
                placeholder={'Title'} 
                value={title} 
                onChange={ev => setTitle(ev.target.value)}/>
            <input type="summary" 
                placeholder={'Summary'}
                value={summary}
                onChange={ev => setSummary(ev.target.value)}/>
            <input type="keywords" placeholder={'Keywords'}/>
            <input type="file" 
            
            onChange={ev=> setFiles(ev.target.files)}/>
           
            <input type="abstract" 
            placeholder={'Abstract'}/>
            <ReactQuill value={content}
                        onChange={newValue => setContent(newValue)}
                        modules={modules} 
                        formats={formats}/>
            <button style={{marginTop: '5px'}}>Submit</button>
           </form>
    );
}