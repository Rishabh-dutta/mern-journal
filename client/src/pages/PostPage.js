import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../userContext";
//import { Viewer, Worker } from "@react-pdf-viewer/core"
//import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"
import "@react-pdf-viewer/core/lib/styles/index.css"
import "@react-pdf-viewer/default-layout/lib/styles/index.css"
import DocViewer,{DocViewRenderers} from "react-doc-viewer"

import { Document, Page } from 'react-pdf';


import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


export default function PostPage() {
    const [postInfo, setPostInfo] = useState(null);
    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    //const [pdfFile,setPdfFIle] = useState(null);
    //const {userInfo} = useContext(UserContext)
    const { id } = useParams();
    useEffect(() => {

        fetch(`http://localhost:4000/post/${id}`)
            .then(response => {
                response.json().then(postInfo => {
                    setPostInfo(postInfo);

                });
            });
    }, []);

    if (!postInfo)
        return '';


   

    const onDocumentLoadSuccess = (numPages) => {
        setNumPages(numPages);
    }
    return (
        <div classname="post-page">
            <h1>{postInfo.title}</h1>
            <div>
                <Document file="http://localhost:4000/uploads/59a143e73c953cc8a74727652008b6ed.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} />
                </Document>
                <p>
                    Page {pageNumber} of {numPages}
                </p>
            </div>
            
           

            








            <div className="author">by @{postInfo.author.username}</div>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
        </div>

    );

    //<div src={'http://localhost:4000/' + 'uploads/59a143e73c953cc8a74727652008b6ed.pdf'} alt="NO file" />
    /*
    <h1>{postInfo.title}</h1>
           
*/
}