import React ,{useEffect , useState} from 'react'
import styled from 'styled-components';
import {Link, useNavigate} from 'react-router-dom';
const ReadMore = () => {
    const [resp , setresp]=useState("");
    const navigate = useNavigate();
    
    useEffect(()=>{
        const load = async()=>{
            // fetch("http://localhost:5000/post").then(
            //     resp=>resp.json
            //     ).then(
            //         e=>{
            //             setresp(e);
            //         }
            // )
            let result = await fetch(`http://localhost:5000/plot` ,{
            method:"get",
            headers:{'Content-Type':"application/json"}
        })
        result = await result.json();
        setresp(result);
        console.log(result);
        }
        load();
    },[]);
    const load = async()=>{
        // fetch("http://localhost:5000/post").then(
        //     resp=>resp.json
        //     ).then(
        //         e=>{
        //             setresp(e);
        //         }
        // )
        let result = await fetch(`http://localhost:5000/plot` ,{
        method:"get",
        headers:{'Content-Type':"application/json"}
    })
    result = await result.json();
    setresp(result);
    console.log(result);
    }
  return (

    <>
    <SiteInfo>
                    <div className='trend'>
                    <a className="create"href='/post'><i class="fa-solid fa-plus fa-flip"></i> Create</a>
                    <a className='my' href='/post'><i class="fa-solid fa-ghost fa-bounce"></i>My Post</a>
                   
                    <Link  refresh="true"><i onClick={()=>load} class="fa-solid fa-rotate-left" style={
                        {
                            marginLeft:"1rem",
                            cursor:"pointer",               
                        }}></i></Link>
                        {resp&&resp.map((key,index)=>{
                            return(
                                <div className='head'>
                            <div className='trend-box'>
                                <div className='boxe'>
                                    <div className='flex'>
                                    <div className='tags'>
                                        <p>{key.hashtags}</p>
                                        <p>{key.createdAt}</p>
                                    </div>
                                    <div className='comment'>
                                    <i Class="fa-solid fa-comment"></i> Comment
                                    </div>
                                    </div>
                                    <div className='comment-heading'>
                                        <h1>{key.title}</h1>
                                        <p>{key.description}</p>
                                    </div>
                                    <div className='img'><img src={key.images}/>{key.username}</div>
                                </div>
                            </div>
                        </div>  
                            )
                        })}
            
                       
                    </div>
                </SiteInfo>
    </>
  )
}

export default ReadMore;

const Container =styled.div`
min-height: 60vh;
background: #202125;

`

const SiteInfo = styled.div`
display: flex;
color:white;
background: #202125;
.info{
    display: flex;
    padding:0.5rem;
}
.heading h1{
    font-size: 1.5rem;
    font-weight: 600;
}
.heading p{
    font-size: 0.9rem;
    color:#ccc;
    margin-top: 1rem;
}
img{
    height: 2.5rem;
    width:2.5rem;
    margin-top: 0.5rem;
    border-radius: 50%;
    margin-right: 0.5rem;
}
.img{
    display: flex;
    align-items: center;
}
.but{
    width: 100%;
    text-align: center;
}
button{
    background: rgb(202, 233, 98);
    color: black;
    width: 90%;
    font-size: 1.5rem;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
}
.but :hover button{
    color:red;
}
.trend{
width:50rem;
margin-right: 0.5rem;
}
.main-box{
    /* /* padding:1rem;  */
}
.heading{
    margin:2rem;
}
br{
    margin: 1rem;
}
span{
    color:white;
    font-weight: 600;
}
.trendbox{

}
.boxe{
    width: 100%;
    display: block;
    cursor: default;
    padding: 20px;
    border-radius: 1rem;
    position: relative;
    font-size: 12px;
    line-height: 1.4;
    background: rgb(255,255,255,.05);
    margin-bottom: 0.5rem;
    display: flex;
    flex-direction: column;
}
.flex{
    display: flex;
    justify-content: space-between;
}
.tags{
    display: flex;
}
.tags p{
    margin-right:1rem;
    width: 9.2ch;
    display: -webkit-box;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
}
.comment{
    margin-left: 1rem;
}
.head h1{
    font-size: 1rem;
}
.comment-heading{
    margin-top: 0.5rem;
}
.comment-heading p{
    margin-top:0.5rem ;
    color:#ccc;
}
@media (max-width: 960px) {
    flex-direction: column;
    align-items: center;
}
.trend{
width:100%;
margin-right: 0.5rem;
margin:0.5rem;
}
.head{
    padding: 0.5rem;
}
height: 100%;
overflow: hidden;
.create{
    background-color: white;
    color: black;
    margin-left: 1rem;
    margin-top: 1rem;
    padding:0.5rem 1rem;
    border-radius: 1.5rem;
    cursor: pointer;
    font-weight: bold;
}
.create:hover{
    background-color:#ccc;
}
.my{
    margin-left: 1rem;
}
.my:hover{
    color:#cae962;
}
i{
    margin-right: 0.5rem;
}
`