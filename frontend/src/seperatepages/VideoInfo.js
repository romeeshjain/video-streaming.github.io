import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Toast } from '@chakra-ui/react'
const VideoInfo = () => {
    const params = useParams();
    const [videos, setvideos] = useState('');
    const[Values,setValues]=useState('');
    const [like , setlikes]=useState(1);
    const [click , setclick]=useState(false); 
    const [ifsub , setifsub] =useState(false);
    const[resp ,setresp]= useState(""); 
    const[counts , setcount]=useState("");
    const[sub, setsubdata]=useState("");
    const vid = "http://res.cloudinary.com/dne4fejan/video/upload/v1678880149/q942h91die4dw8ewxpzk.mp4";
    const getinfo=()=>{
        const loadNews = async () => {
            let result = await fetch(`http://localhost:5000/video/${params.id}`, {
                method: 'get',
                headers: {
                  'Content-Type': 'application/json'
                }
              });
              result = await result.json();
            //   console.warn(result);
              setValues(result);
              localStorage.setItem("videos",JSON.stringify(result));
        };
        loadNews();
      }
      const load = async()=>{
        let result = await fetch(`http://localhost:5000/search/${Values.category}` ,{
            method:"get",
            headers:{'Content-Type':"application/json"}
        })
        result = await result.json();
        setresp(result);
        // console.log(result , "god");
    }
    //   console.log(Values);
      useEffect(() => {
        const data=JSON.parse(localStorage.getItem("videos"));
        getinfo();
        load();
        subcount();
    }, []);
  
    const addsub =async()=>{
let {data} = await axios.post("http://localhost:5000/subscribe" , {

}) 
    }


const csssub= async ()=>{
    let video_id = JSON.parse(localStorage.getItem("video-user"))._id; ; 
    let user_id = params.id;
let {data}= await axios.post("http://localhost:5000/subscribe" , {
video_id,
user_id,
});
console.log(data) 
    setifsub(false)
}
const cssunsub=async()=>{
    const  video_id = await JSON.parse(localStorage.getItem("video-user"))._id; ; 
    const  user_id = await params.id;
const data =  await fetch("http://localhost:5000/subdelete" ,{
    method:"delete",
    body:JSON.stringify({
        video_id,
        user_id
    }),
    headers: {
        "Content-Type":"application/json"
    }
})
    console.log(data ,video_id, user_id,  "working unsub");

    setifsub(true);
}
    const subcount = async ()=>{
            let video_id = JSON.parse(localStorage.getItem("video-user"))._id; ; 
            let user_id = params.id;
    const{data} = await axios.post("http://localhost:5000/sublogin",{
    video_id ,
    user_id
    })
    if(data.status===true){
        setifsub(false);
    }else{
        setifsub(true);
    }
    console.log(data , user_id);
    }
    const onlike = ()=>{
        let count =like+1;
        setlikes(count);
        {click?setclick(false):setclick(true)};
    }
    const navigate = useNavigate();
    const count = async (id)=>{
        let data = await fetch(`http://localhost:5000/${Values._id}/viewcount`,{
            method:"put"
        });
        navigate("/playvideo")
        setcount(data);
        console.log(Values._id);
    }
    // const view = async()=>{
    //     let data = await fetch(`http://localhost:5000/${Values._id}/viewcount`,{
    //         method : "put",
    //         // headers:"Content-Type:application/json",
    //     })
    //     console.log("data");
    // }
    window.scrollTo({
        top:0,
        // behavior:"smooth"
    })
    return (
        <>
        <Videos>
            {/* {Values.video}
            {Values.thumbnail}
            <a href="/playvideo/video">play video</a>
            <video controls autoPlay loop>
                <source src={data} type="video/mp4" >
                </source>
            </video>
            <video  controls autoplay loop>
        <source src={"http://res.cloudinary.com/dne4fejan/video/upload/v1678880149/q942h91die4dw8ewxpzk.mp4"} type="video/mp4" >
        </source>
      </video> */}
      <div className='container'>
        <div className='cont'>
        {/* <div className='blur'></div> */}
      <img src={Values.thumbnail}/>
      </div>
      <div className='content'>
        <img src={Values.thumbnail}/>
        <div className='info'>
        <h1>{Values.title}</h1>
        <div className='category'>
        <span>Category:</span>
            <p>{Values.category}</p>
            </div>
        <div className='but'>
            {/* <button > */}
            <a onClick={()=>count(Values._id)}><i class="fa-solid fa-play"></i>Watch now</a>
            {/* </button> */}
            <a onClick={count} className='list'>+ Add to List </a>
        </div>
        <duv clasName ="subscribe">
        {ifsub ?<button onClick={csssub}> Subscribe</button>:<button onClick={cssunsub}>Unsubscribe</button>}
        </duv>
        <p>{Values.description}</p>
        <div className={click?'like':"likes"}>
        <h2>Like</h2>
        <div>
        <p clasName = "likecolor"onClick={onlike}><i class="fa-solid fa-thumbs-up"> {like}</i></p>
        </div>
        </div>
        </div>
      </div>
      </div>
      <Share>
                    <div className='share'>
                        <div className='fla'>
                        <div className='border'>
                            <h1>Share GhostSite</h1>
                            <p>share this to your friend</p>
                        </div>
                        <div style={{color:"white"}} className='box'>
                      
                        <i style={{
                        background:"#6f85d5"
                    }} id="log"class="fab fa-discord"></i>
                        <i style={{
                        background:"#08c"
                    }} id="log" class="fab fa-telegram-plane"></i>
                        <i style={{
                        background:"#ff3c1f"
                    }} id="log" class="fab fa-reddit-alien"></i>
                        <i style={{
                        background:"#1d9bf0"
                    }} id="log" class="fab fa-twitter"></i>
                    </div>
                    </div>
                    </div>
                    <img src="/Image/share-icon.gif"/>
                </Share>
      <Main>
        <div className='main-container'>
          <h1>Recommended for you</h1>
            <div className='container'>
                {resp&&resp.map((key,index)=>{
                    return(
                        <a href={`/videos/${key._id}`}>
                        <div className='movie-card'>
                    <div className='img'>
                        <img src={key.thumbnail} />
                    </div>
                    <div className='card-info'>
                        <h3>{key.title}</h3>
                        <p>{key.description} </p>
                    </div>
                </div>
                </a>
                    )
                })}
            </div>
            </div>
        </Main>
              </Videos>
              </>
    )
}

export default VideoInfo
const Videos = styled.div`
min-height: 100vh;
/* background: #202125; */
overflow: hidden;
color: white;

button{
    background-color: red;
    color: white;
    padding:0.3rem 1rem;
    margin-bottom:0.5rem;
    cursor: pointer;
    border-radius:1rem;
}
button:hover{
    color:#ccc;
    background: #cf2323;
}
video{
    width: 60%;
    height: 30rem;
    z-index: 1000000;
}
.container{
    position: relative;
}
.cont img{
filter: blur(1rem);
position: absolute;
width: 100%;
height: 100%;
overflow: hidden;
z-index: -1;
opacity: 0.8;
/* min-width: 100vw; */

min-height: 150vh;
z-index: -1;
object-fit: cover;
}
.content{
    padding:5rem;
    display: flex;
    z-index: 1000000;
}
.content img{
height: 20rem;
width:15rem;
z-index: -1;
/* position: absolute; */
/* object-fit: cover; */
}
.info{
    display: flex;
    flex-direction: column;
    margin:2rem;
    margin-top:0rem;
}
h1{
    font-size: 40px;
line-height: 1.1em;
margin-bottom: 20px;
}
.but{
    display: flex;
}
.but i{
    margin-right: 0.5rem;
}
.but a{
background: #c8e763;
padding:0.5rem 2rem;
margin-right:1rem;
margin-top: 1rem;
margin-bottom: 1rem;
cursor: pointer;
color:black;
border-radius: 1rem;
border: 0rem;
}
p{
font-weight: 300;
line-height: 1.5em;
font-size: 13px;
}
.but .list{
background: white;
padding:0.5rem 2rem;
margin-right:1rem;
margin-top: 1rem;
margin-bottom: 1rem;
cursor: pointer;
color:black;
border-radius: 1rem;
border: 0rem;
}
.but .list:hover{
    background:gray ;
}
.category{
}
@media (max-width: 782px){
    padding-top: 1rem;
    .content{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0rem;
} 
.info{
    align-items: center;
}
.but .list{
    padding:0.5rem 1rem;
    margin-right:0.5rem;
margin-bottom: 1rem;
}
.but a{
    padding:0.5rem 1rem;
    margin-right:0.5rem;
margin-bottom: 1rem;
margin-left: 0.5rem;
}
}
.like{
    color:white;
    cursor: pointer;
}
.likes{
    color:red;
    font-size: 1.5rem;
    cursor: pointer;
}
.like h2{
    font-size: 1.5rem;
}
.like p{
    font-size:1.5rem;
}
.like p{
    padding:0.5rem;
    padding-left: 0rem;
}
.likes p {
    font-size:1.5rem;
    z-index: 1000000;
}
.likes p i{
    background-color:  rgba(30 , 30 , 30 ,0.8);
    padding:0.5rem;
    padding-left: 0rem;
    padding-bottom:0rem ;
    z-index: 1000000;
}
.like p i {
    /* background-color: rgba(30 , 30 , 30 ,0.8);
    padding:0.5rem;
    cursor: pointer;
    margin-right: 0.5rem; */
}
.like .likecolor p{
    background-color:  rgba(30 , 30 , 30 ,0.8);
    padding:0.5rem;
    color:red;
    font-size: 1.5rem;
    z-index: 1000000;
}
.blur{
    background: rgba(32, 33, 37, 0.5);
width: 100%;
/* min-height: 100vh; */
height: 100%;

position: absolute;
z-index: 100;
}
`

const Main = styled.div`
min-height: 80vh;
background: #202125 ;
display: flex;
justify-content: center;
align-items: center;
overflow: hidden;
h1{
  font-size: 2rem;
color: rgb(200, 231, 99);
 margin-bottom: 1rem;
}
.container{
    display: grid;
    grid-template-columns: repeat(5 ,auto) ;
    grid-gap: 1rem;
}
@media(max-width:1214px) {
    .container{
    grid-template-columns: repeat(4 ,auto) ;
}
}
@media(max-width: 966px){
    .container{
    grid-template-columns: repeat(3 ,auto) ;
} 
}
@media(max-width: 744px){
    .container{
    grid-template-columns: repeat(2 ,auto) ;
} 
}
@media(max-width: 476px){
    .container{
    grid-template-columns: repeat(1 ,200px) ;
} 
}
.movie-card{
    height: 20rem;
    width: 14rem;
    .img{
        height: 100%;
        width: 100%;
        transition: 0.5s;
        cursor: pointer;
    }
    img{
        height: 100%;
        width:100%;
        z-index: -1;
    }
    .img:hover{
        filter: grayscale(100%);
        z-index: -1;
    }
    .card-info{
        /* position: absolute; */
        transform: translate(0px ,-100px);
        background: rgba(32, 33, 37, 0.7);
    }
    h3{
        color: white;
        font-size: 1rem;
        font-weight: 100;
        display: -webkit-box;
        overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
    }
    p{
        font-size: 0.8rem;
        display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  color: wheat;
    }
    p:hover{
  color:rgb(200, 231, 99);

    }
}
@media(max-width: 526px){
   .main-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
   }
}

`


const Share = styled.div`
height: 10rem;
padding:0rem;
font-family: "Montserrat", Arial;
/* margin-bottom: 2rem; */
img{
    height: 5rem;
    width: 5rem;
    display: none;
}
.fla{
    display: flex;
}
.box{
    display: flex;
    margin:0.3rem;
    flex-wrap: wrap;
}
#log{
    font-size: 1rem;
    /* margin-top: 1rem; */
    margin-top: 0.3rem;
    margin-left: 0.5rem;
    text-align: center;
    justify-content: center;
    align-items: center;
    display: flex;
    height: 1rem;
    width: 1rem;
    background: #6f85d5;
    opacity: 0.9;
    padding:1rem;
    border-radius: 10%;
    cursor: pointer;
}
#log:hover{
    color: white;
    opacity: 10;
}
.share{
    background: black;
    height: 5rem;
    margin:1rem;   
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 0.5rem;
}
h1{
    color: #cae962;
    margin:0.5rem;
    margin-bottom: 0rem;
}
p{
    color: white;
    margin: 0.5rem;
    margin-top: 0;
    
}
hr{
    height: 100%;
    position: absolute;
    background-color: red;
}
.border{
        border-left: 2px solid #cae962;
        margin-left:0.5rem;
    }
    .border h1{
        font-size: 18px;
    }
`