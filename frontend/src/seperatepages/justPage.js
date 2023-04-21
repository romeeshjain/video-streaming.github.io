import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import ReCAPTCHA from 'react-google-recaptcha';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Button, FormControl, FormLabel, Input, useToast, VStack } from '@chakra-ui/react'

const JustPage = ({setvisible , visible , info}) => {
     // console.log(auth ,"working");
  const navigate = useNavigate;
  function onChanges(value) {
    console.log("Captcha value:", value);
  }
  // console.log(visible);

  const[reg , setreg]=useState(true);
  const[show , setshow]=useState(true);
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toaster = {
    position: "bottom-right",
    autoClose: 8000,
    pauseonHover: true,
    dragable: true,
    theme: "dark",
  }
  const [images , setImages]=useState("");
  const [loading,setLoading]=useState(false);
  const toast = useToast();
  const handleChange = async (e) => {
    setValues({ ...Values, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username, email, password } = Values;
      const { data } = await axios.post("http://localhost:5000/register", {
        username,
        email,
        password,
        images
      });
      if (data.status === false) {
        toast.error("galat information", toaster)
      }
      // console.log(data.result);
      if (data.status === true) {
        setvisible(false);
        localStorage.setItem("video-user", JSON.stringify(data.result));
      }
    }
  }
  const newset=()=>{
    setshow(false);
  }

  const postDetails=(pics)=>{
    setLoading(true);
    if(pics===undefined) {
        return;
    }
    //pics.type==="image/jpeg" || pics.type==="image/png"
    if(pics) {
        const data = new FormData();
        // console.log(data);
        data.append("file",pics);
        data.append("upload_preset","UserImage");
        data.append("cloud_name","degkaauzc");
        fetch("https://api.cloudinary.com/v1_1/degkaauzc/image/upload", {
            method:"post", 
            body:data,
        }).then((res) => res.json())
        .then(data => {
          setImages(data.url.toString());
            console.log(data.url.toString(),"working"); 
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        })
    } else {
        setLoading(false);
        return;
    }
  }
  useEffect(()=>{
const data = localStorage.getItem("video-user");
if(data){
    setvisible(false);
}
  },[]);
// console.log(Values);
  const handleValidation = () => {
    const { password, confirmPassword, username, email } = Values;
    if (password !== confirmPassword) {
      toast({
        title:"Password and confirm password should be same.",
        status:"error",
        duration:5000,
        isClosable:true,
        position:"bottom",
      })
      return false;
    }
    if (username.length < 3) {
      toast({
        title:"Username should be greater than 3 characters.",
        status:"error",
        duration:5000,
        isClosable:true,
        position:"bottom",
      })
      return false;
    } else if (password.length < 3) {
      toast({
        title:"Password should be equal or greater than 8 characters.",
        status:"error",
        duration:5000,
        isClosable:true,
        position:"bottom",
      })
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toaster);
       toast({
          title:"Error occured!",
          status:"error",
          duration:5000,
          isClosable:true,
          position:"bottom",
        })
      return false;
    }
    return true;
  };


  //wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww........................
  const handleValidationlogin = () => {
    const {email } = Values;
    if (email) {
        toast({
          title:"Password and confirm password should be same.",
          status:"error",
          duration:5000,
          isClosable:true,
          position:"bottom",
        })
        return false;
      }
    return true;
  };


  const handlelogin = async (e) => {
    console.log("working");
    e.preventDefault();
      const { email, password } = Values;
      const { data } = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      console.log(email ,password)
      console.log(data.status)
      if (data.status === false) {
        toast.error("galat information", toaster)
      }
      console.log("workinglogin");
      console.log(data.result);
      if (data.status === true) {
        localStorage.setItem("video-user", JSON.stringify(data.result));
        setvisible(false);
        info();
      }
    
  }
  
  
  return (
    <PageContainer>
        {reg?
<div clasName = "container">
<form action="" onSubmit={(e) => handleSubmit(e)}>
<div className='conatainer'>
    <div className='cancel'>
    <i onClick={()=>setvisible(false)} class="fa-solid fa-xmark"></i>
    </div>
<label>Your name</label>
  <input name="username" placeholder="userName"type="text" onChange={(e) => handleChange(e)}/>
  <label>Email</label>
  <input name="email" type="text" onChange={(e) => handleChange(e)}/>
  <label>Password</label>
  <input name="password"  type="password" onChange={(e) => handleChange(e)}/>
  <label>Confirm Password</label>
  <input name="confirmPassword" type="password" onChange={(e) => handleChange(e)}/>
  <label>upload profile pic</label>
  <input type="file"
            p={1.5}
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}/>
</div>
<div className='but'>
  <button type="submit">{loading?"loading" :"Create User"}</button>
  <p>Have an account ? <a onClick={(e)=>setreg(false)}>Login</a></p>
</div>
</form>
</div>:
<div clasName = "container">
<form action="" onSubmit={(e) => handlelogin(e)}>
<div className='conatainer'>
    <div className='cancel'>
    <i onClick={()=>setvisible(false)} class="fa-solid fa-xmark"></i>
    </div>
<label>Your email</label>
  <input name="email" type="email" onChange={(e) => handleChange(e)}/>
  <label>Password</label>
  <input style={{
    width:"100%",
  }} name="password"  type="password" onChange={(e) => handleChange(e)}/>
</div>
<div className='but'>
  <button type="submit" onClick={()=>handleValidationlogin}>{loading?"loading" :"Login User"}</button>
  <p>Not Have an Account ? <a onClick={(e)=>setreg(true)}>Login</a></p>
</div>
</form>
</div>
}
 
    </PageContainer>
  )
}

export default JustPage
const PageContainer = styled.div`
color:white;
 position: absolute;
 min-height: 30rem;
 z-index:103;
    width: 25rem;
    display: flex;
    /* overflow: hidden; */
    min-height:25rem;
    background-image: url("/Image/rias.jpg");
    background-color: black;
    background-position: top;
    background-repeat: none;
    background-position-y: -2rem;
    min-height: 20rem;
    border-radius: 0.5rem;
    margin: 2rem;
    z-index:103;
    /* align-items: center; */
    justify-content: center;
    @media (max-width:442px) {
      width:90%;
    }
    .conatainer{
        display: flex;
        flex-direction: column;
        z-index:1000200;
        min-height: 20rem;
        width: 100%;
        font-weight: 600;

    }
    input{
        /* margin: 1rem; */
        padding:0.4rem;
        color: white;
        height: 100%;
        width: 100%;
        background-color: #ccc;
        border-radius: 0.5rem;
        background: transparent;
border-radius: 0.5rem;
border: 1px solid white;
    }
    label{
        margin-top: 1rem;
    }
    .but{
        justify-content: center;
        text-align: center;
    }
    form{
        width: 100%;
    }
    button{
        color: black;
    }
    .cancel{
        text-align: center;
        width: 100%;
    }
    i{
        background-color: transparent;
        color: white;
        border-radius: 50%;
        /* padding: 0.1rem; */
        /* margin-top: 1rem; */
        height: 1.5rem;
        font-size: 1.5rem;
        width: 1.5rem;
        cursor: pointer;
        /* transform: translate(0px,-10px); */
        z-index:121;     
    }
    i:hover{
        background: red;
        color: #ccc;
    }
    input{
        outline:none;
    }
    a{
        color: blue;
        cursor: pointer;
    }
    a:hover{
        text-decoration: underline;
    }
`