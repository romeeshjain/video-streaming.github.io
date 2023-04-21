import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import axios from 'axios'
import {useToast} from '@chakra-ui/react'

const PlayVideo = () => {
  const toast = useToast();
  const [videos, setvideos] = useState('');
  const [Values, setValues] = useState('');
  const [click, setclick] = useState(false);
  const [sount, setcount] = useState(0);
  const [commentinfo, setcomment] = useState("");
  const [increase, setincrease] = useState(4);
  const [username, setusername] = useState("");
  const [images, setimages] = useState("");
  const [allcomment, setallcomment] = useState([]);
  const [result ,setresult] =useState([]);
  // const [video_id , setvideo_id]=useState("");
  const [user_id, setuser_id] = useState("");
  const navigate = useNavigate()
  const data = JSON.parse(localStorage.getItem("videos"));
  useEffect(() => {
    const load = async () => {
      let result = await fetch(`http://localhost:5000/search/${data.category}`, {
        method: "get",
        headers: { 'Content-Type': "application/json" }
      })

      
      result = await result.json();
      setValues(result);
    }
    const count = async () => {
      let data = await fetch(`http://localhost:5000/${data._id}/viewcount`, {
        method: "put"
      });
      setcount(data);
      console.log(Values._id);
    }


    seecomment();
    infos();
    count();
    load();
  }, []);

  const seecomment = async () => {
    let video_ids = JSON.parse(localStorage.getItem("videos"))._id;
    // let data = await axios.get(`http://localhost:5000/getcomment`, {
    //   video_id
    // })
console.log(video_ids)
    let result = await fetch(`http://localhost:5000/getcomment/${video_ids}` ,{
      method:"get",
      headers:{'Content-Type':"application/json"},
  })
    result = await result.json()
    setallcomment(result.data);
    console.log("anser comment", result);
  }
  const nav = () => {
    navigate(`${data.video}`);
  }
  let infos = async () => {
    function  data(){
    let user_ids = JSON.parse(localStorage.getItem("video-user"));
    // setvideo_id(video_id);
    setuser_id(user_ids._id);
    setimages(user_ids.images);
    setusername(user_ids.username);
    }
    data();
  }
  const toaster = {
    position: "bottom-right",
    autoClose: 8000,
    pauseonHover: true,
    dragable: true,
    theme: "dark",
  }
  const addcomments = async () => {
    let video_id = JSON.parse(localStorage.getItem("videos"))._id;
    if(!username || !images){
      toast({
        title:"Login karle ",
        status:"error",
        duration:5000,
        isClosable:true,
        position:"bottom",
      })
      return;
    }
    if(!commentinfo){
      toast({
        title:"Comment karle bhai majak mat kar",
        status:"error",
        duration:5000,
        isClosable:true,
        position:"bottom",
      })
      return;
    }
    // toast.error("galat information", toaster)
    console.log(
      images,
      username,
      video_id,
      user_id,
      commentinfo
    )
    let { data } = await axios.post("http://localhost:5000/Comments", {
      images,
      username,
      video_id,
      user_id,
      commentinfo
    })
    if(data.status===true){
      toast({
        title:"Comment added bro",
        status:"success",
        duration:5000,
        isClosable:true,
        position:"bottom",
      })
    }
    setresult( images,
      username,
      video_id,
      user_id,
      commentinfo) 
    seecomment();
    setcomment("");
  }
  return (
    <>
      <Videos>
        <div className='videoContainer'>
          {/* <video controls autoPlay loop>
                <source src={data} type="video/mp4" >
                </source>
            </video> */}
          {/* <div className='cont'> */}
          <video width="640" height="480" autoPlay controls >
            <source src={data.video} type="video/ogg" />
            HTML5 video not supported.
            <source src={data.video} type="video/mp4" />
            <source src={data.video} type="video/ogg" />
            <a href={data.video} download>Download video</a>
          </video>
          <div className='info'>
            <a href={data.video} download>
              <button onClick={() => nav}>download</button>
            </a>
            {/* </div> */}
          </div>
        </div>
      </Videos>
      <VideoInfo>
        <div className='info'>
          <div>
            <img src={data.thumbnail} />
          </div>
          <div className='main-info'>
            <h2>{data.title}</h2>
            <p>{data.description}</p>
            <div className='img'>
              <p>{data.createdAt}</p>
            </div>
          </div>
        </div>
      </VideoInfo>
      <Comment>
        <div className='head'>
          <h2>Comment</h2>
        </div>
        <div className='container'>
          <div className='info'>
            <img src={images} />
            <div className='name'>
              <h1>Comment Uchiha  <span> {username}</span></h1>
            </div>
          </div>
          <div className='ghost'>
            <div className='com'>
              <textarea onClick={() => setclick(true)} value={commentinfo} onChange={(e) => setcomment(e.target.value)} placeholder='working' />
              {click ?
                <div className='but'>
                  <button onClick={() => setclick(false)} className='back'>Close</button>
                  <button onClick={addcomments}>Comment</button>
                </div> : ""}
            </div>
          </div>
          <div className='allComment'>
            <div className='img'>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWZqZNB2u4pc_L2kqGEe98OGEDmX5yVpTU3Q&usqp=CAU" />
              <div className='name'>
                <h1>Ghost</h1>
              </div>
            </div>
            <div >
              <div className='prev'>
                <h1>spoilers were there</h1>
              </div>
            </div>
          </div>
          {allcomment && allcomment.slice(0, increase).map((key, index) => {
            return (
              <div className='allComment'>
                <div className='img'>
                  <img src={key.images} />
                  <div className='name'>
                    <h1>{key.username}</h1>
                  </div>
                </div>
                <div >
                  <div className='prev'>
                    <h1>{key.commentinfo}</h1>
                  </div>
                </div>
              </div>
            )
          })}
          <button id="butt" classname="butt" onClick={() => setincrease(increase + 1)} >Read More</button>
        </div>
      </Comment>
      <Main>
        <div className='main-container'>
          <h1>Recommended for you</h1>
          <div className='container'>
            {Values && Values.map((key, index) => {
              return (
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
    </>
  )
}


export default PlayVideo;
const Videos = styled.div`
/* min-height: 100vh; */
background: #202125;
color:white;
text-align: center;
video{
  margin:1rem;
  margin-bottom:0rem ;
  max-height:30rem;
  width:80%;
  background-color: rgb(37, 39, 44);
  padding-bottom: 0.5rem;
}
.videoContainer{
  display:flex;
  align-items: center;
  flex-direction: column;
justify-content: center;
}
.cont{
  display:flex;
  align-items: center;
  flex-direction: column;
justify-content: center;
width: 100%;
  
}
button{
  background: black;
  text-align: center;
  padding:0.5rem;
  width: 70%;
  font-weight: 600;
  color:rgb(200, 231, 99);
}
.info{
  width: 100%;

}
`
const Comment = styled.div`
background: #202125;  
padding:2rem;
@media (max-width: 674px) {
  padding: 0rem;
  .container{
    padding:0rem;
  }
}
#butt{
  background: rgb(200, 231, 99);
  width:100%;
  padding:0.3rem;
  cursor: pointer;
  font-weight: 800;
  margin-top: 0.5rem;
}
.container{
  background-color: #2a2c31;
  /* min-height: 100vh; */
  padding: 2rem;
}
.head{
  margin-bottom: 1rem;
}
h2{
font-size: 2rem;
color:#c8e763;  
}
.com{
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
textarea{
background-color: #4c4f57;
color: #fff;
border-radius: 0.3rem;
resize: none;
box-shadow: none !important;
outline: none;
height: 72px;
width: 90%;
padding:0.3rem;
}
.info {
  display: flex;
}
.info img{
  height:2.3rem;
  width: 2.3rem;
  border-radius: 50%;
  margin-top: 2rem;
  background-color: white;
  margin-bottom: 0.5rem;
}
h1{
  color: white;
}
.name{
  margin-left:1rem;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
}
span{
  color: #c8e763;
}
.img{
  display: flex;
}
.img img{
  height:2.3rem;
  width: 2.3rem;
  border-radius: 50%;
  margin-top: 2rem;
  background-color: white;
}
.prev{
  margin-left: 3.3rem;
}
.prev h1{
  color:gray;
  font-size:0.9rem;
}
.but button{
  background-color: #c8e763;
  margin-top:0.5rem;
  padding: 0.2rem 0.5rem;
  color: black;
  font-weight: 100;
  border-radius: 0.3rem;
}
.but{
  width: 90%;
  display: flex;
  justify-content: end;
  transition: 1s;
}
.but .back{
  background-color: transparent;
  margin-top:0.5rem;
  margin-right: 1rem;
  padding: 0.2rem 0.5rem;
  color: white;
  font-weight: 200;
  border-radius: 0.3rem;
}
`
const VideoInfo = styled.div`
background:#202125;
padding:2rem;
img{
  min-height:10rem;
  max-width: 8rem;
}
.info{
  display: flex;
}
.main-info{
  margin-left: 2rem;
}
h2{
  color: white;
  font-size: 0.8rem;
}
p{
  color: #ccc;
  font-size: 0.8rem;
  width: 100%;
  display: -webkit-box;
  line-clamp: 2;
  overflow: hidden;
        display: -webkit-box;
        overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 10;

}
.img{
  /* background: cyan; */
}
.img p {
margin-top: 1rem;
/* position: absolute; */
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
@media(max-width: 500px){
    .container{
    grid-template-columns: repeat(2 ,auto) ;
}
.movie-card{
    width: 100%;
} 
}
`