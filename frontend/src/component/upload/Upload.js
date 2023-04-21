import { Button, FormControl, FormLabel, Input, useToast, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from "axios";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const Upload = () => {
    const [title, setTitle]=useState();
    const [description, setDescription]=useState();
    const [category, setCategory]=useState();
    const [thumbnail, setThumbnail]=useState();
    const [video, setVideo]=useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const postThumbnail = (pics) => {
      setLoading(true);
      if(pics===undefined) {
        toast({
          title:"Please select an Image!",
          status:"warning",
          duration:5000,
          isClosable:true,
          position:"bottom",
        })
        return;
      }
      if(pics.type==="image/jpeg" || pics.type=== "image/png") {
        const data=new FormData();
        data.append("file",pics);
        data.append("upload_preset","UserImage")
        data.append("cloud_name","degkaauzc")
        fetch("https://api.cloudinary.com/v1_1/degkaauzc/image/upload", {
          method:"post",body:data,
        }).then((res)=> res.json())
        .then(data => {
          setThumbnail(data.url.toString())
          console.log(data.url.toString())
          setLoading(false);
        }).catch((err) => {
          console.log(err);
          setLoading(false);
        })
      }else {
        toast({
          title:"Please select an Image!",
          status:"warning",
          duration:5000,
          isClosable:true,
          position:"bottom",
        })
        setLoading(false);
        return;
      }
    }
useEffect(()=>{
  const data =()=>{
  const result = JSON.stringify(localStorage.getItem("video-user"));;
  if(!result){
    navigate("/");
}
  }
  data();
},[])

    
    
    const postVideos = (videos) => {
    
      setLoading(true);
      if(videos===undefined) {
        toast({
          title:"Please select a Video!",
          status:"warning",
          duration:5000,
          isClosable:true,
          position:"bottom",
        })
        return;
      }
      if(videos.type==="video/mp4" || videos.type=== "video/mov" || videos.type=== "video/mkv") {
        const data=new FormData();
        data.append("file",videos);
        data.append("upload_preset","UserImage")
        data.append("cloud_name","degkaauzc")
        fetch("https://api.cloudinary.com/v1_1/degkaauzc/video/upload", {
          method:"post",body:data,
        }).then((res)=> res.json())
        .then(data => {
          setVideo(data.url.toString())
          console.log(data.url.toString())
          setLoading(false);
        }).catch((err) => {
          console.log(err);
          setLoading(false);
        })
      }else {
        toast({
          title:"Please select an Video!",
          status:"warning",
          duration:5000,
          isClosable:true,
          position:"bottom",
        })
        setLoading(false);
        return;
      }

    }


    const submitHandler = async() => {
      setLoading(true);
      if(!title || !description || !category || !thumbnail || !video) {
        toast({
          title:"Please fill all the details",
          status:"warning",
          duration:5000,
          isClosable:true,
          position:"bottom",
        })
        setLoading(false);
        return;
      }
      try {
        const config = {
          headers : {
            "Content-type" : "application/json"
          },
        }
        const { data } = await axios.post("http://localhost:5000/upload",{title, description, category, thumbnail, video},
        config
        );
        toast({
          title:"Uploading successful",
          status:"success",
          duration:5000,
          isClosable:true,
          position:"bottom",
        });
        localStorage.setItem("userInfo",JSON.stringify(data));
        setLoading(false);
      } catch (error) {
        toast({
          title:"Error occured!",
          description: error.response.data.message,
          status:"error",
          duration:5000,
          isClosable:true,
          position:"bottom",
        })
        setLoading(false);
      }
    }

  return (
  <Uploading>
    <div className='uploader'>
      <h1>Upload Material Guys</h1>
    </div>
<div className='container'>
  
  <label>Title</label>
<input type="text" placeholder='title'  onChange={(e)=>setTitle(e.target.value)}/>
<label>Description</label>
<input type="text" placeholder='Description' onChange={(e)=>setDescription(e.target.value)}/>
<label>Category</label>
<input type="text" placeholder='Category' onChange={(e)=>setCategory(e.target.value)}/>
<label>Upload thumbnail</label>
<input type="file" placeholder='title'  onChange={(e)=>postThumbnail(e.target.files[0])}/>
<label>Upload Video</label>
<input type="file" placeholder='title' onChange={(e)=>postVideos(e.target.files[0])}/>
<div className='button'>
  <button onClick={submitHandler}>{loading?"loading..":"upload"}</button>
</div>
</div>
  </Uploading>
  )
}

export default Upload
const Uploading = styled.div`
background:  #202125;
min-height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
.container{
  display: flex;
  flex-direction: column;
  color: white;
  width: 30%;
}
label{
  margin-bottom: 0.5rem;
}
input{
background: transparent;
outline: red;
border: 1px solid #00cfff;
border-radius: 0.5rem;
width: 130%;
padding: 0.3rem;
color: white;
}
.button{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 130%;
}
button{
  background: blue;
  padding:0.5rem;
  width: 100%;
  border: 0px;
  margin-top:1rem;
  border-radius: 0.5rem;
}
.uploader{
  color: white;
  margin: 1rem;
  border:1px solid white;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
`
