
import React, { useEffect, useState } from 'react'
import { Button, FormControl, FormLabel, Input, useToast, VStack } from '@chakra-ui/react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const Profile = () => {
    const params =useParams();
    const [Value , setValue]=useState("");
    const [username , setusername] = useState("");
  const [email , setemail] = useState("");
  const [date , setdate] = useState("");
  const [currentpassword , setcurrentpassword] = useState("")
  const [conpassaowrd , settconpassword]=useState('');
  const [password , setpassword] = useState("")
  const [t,sett] = useState(false);
  const toast = useToast();
    useEffect(()=>{
const info = async ()=>{
// const result = await fetch(`http://localhost:5000/users/${params}`);
console.log(params , Value)
let data = await fetch(`http://localhost:5000/users/${params.id}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  data = await data.json();
  console.warn(data);
setValue( data);
    setusername( data.username);
    setemail( data.email);
    setdate( data.updatedAt);
    settconpassword( data.password);
    setcurrentpassword( data.password);
}
info();
    },[]);
    const info = async ()=>{
        // const result = await fetch(`http://localhost:5000/users/${params}`);
        console.log(params , Value)
        let data = await fetch(`http://localhost:5000/users/${params.id}`, {
            method: 'get',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          data = await data.json();
          console.warn(data);
        setValue( data);
            setusername( data.username);
            setemail( data.email);
            setdate( data.updatedAt);
            settconpassword( data.password);
            setcurrentpassword( data.password);
        }
    console.log(username)
    const updateAll = async ()=>{
        if(t){
        if(currentpassword !==conpassaowrd||password===""){
            toast({
                title:"Enter the correct Password",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"bottom",
              })
              return;
        }}else{
          
        }
        let result = await fetch(`http://localhost:5000/details/${Value._id}`,{
            method:"put",
            body:JSON.stringify({
                email,
                username,
            }),
            headers:{
                'Content-Type':"application/json"
            }
        })
        result =await result.json();
        if(await result.acknowledged){
            console.log(await result.acknowledged);
            toast({
                title:"Change successfully",
                status:"success",
                duration:5000,
                isClosable:true,
                position:"bottom",
              })
              info();
        }
          }
  return (

    <>
    <GetHi>
<div className='img'>
<div className='cover'></div>
    <img src={Value.images}/>
    <h1>Hi,<span>{Value.username}</span></h1>
    <nav>
        <ul>
            <li><a href='/profile'><p><i className="fa-solid fa-user"></i><label>Profile</label></p></a></li>
            <li><p><i className="fa-solid fa-clock-rotate-left"></i><label>Continue Watching</label></p></li>
            <li><p><i className="fa-solid fa-heart"></i><label>watch List</label></p></li>
        </ul>
    </nav>
</div>
    </GetHi>
    <Container>
<div className='container'>
    <div className='main-div'>
<div className='head'>
    <div className='heading'>
<h1><i className="fa-solid fa-user"></i>Edit Profile</h1>
</div>

<div className='inputs'>
    <span>Email address</span>
    <input type="email" placeholder={Value.email} value={email} onChange={(e)=>{setemail(e.target.value)}}/>
    <span>your name</span>
    <input type="text" placeholder={Value.username} value={username} onChange={(e)=>{setusername(e.target.value)}}/>
    <span>joined</span>
    <input type="text" className='in' placeholder={Value._id}  value={date} onChange={()=>{setdate(date)}}  maxlength = "3"/>
    <label><p onClick={()=>t?sett(false):sett(true)}><i className="fa-solid fa-key"></i> Change Password</p></label>
    {t?<div className='password'>
        <span>Crrent password</span>
        <input type="password" placeholder={Value.password} value={currentpassword} onChange={(e)=>{setcurrentpassword(e.target.value)}}/>
        <span>New Password</span>
        <input type="password" placeholder={"Enter New Password"} value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
   </div>:<div></div>}
    <button onClick={updateAll}>Save</button>

</div>
</div>
</div>
<div className='profile'>
        <img src={Value.images}/>
    </div>
</div>
    </Container>
    </>
  )
}

export default Profile
const Container = styled.div`
font-family: Montserrat,Arial;
background: #202125;
min-height:100vh;
display:flex;
justify-content: center;
align-items: center;
color: white;
.container{
    display: flex;
    justify-content: center;
    /* align-items: center; */
    /* flex-direction: column; */
}

.password{
margin-top: 1rem;
line-height: 1.3em;
font-family: Montserrat,Arial;
}
.head h1{
font-size: 2rem;
margin-top: 1rem;
}
.heading{
    display: flex;
}
.heading i{
margin-right: 1rem;
}
.inputs{
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    width: 35rem;
    background: linear-gradient(180deg,#292a2b 0,rgba(64,66,70,0) 100%);background: linear-gradient(180deg,#404246 0,rgba(64,66,70,0) 100%);    
}
.inputs input{
    font-size: 13px;
border-radius: 3px;
border: none !important;
padding:0.5rem;
width:100%;
margin-bottom: 1rem;
color: black;
outline: none;
}
.inputs .in{
    color:#ccc;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.inputs{
    width: 25rem;
    padding:1rem;
    padding-right:1rem;
}
span{
font-size: 11px;
text-transform: uppercase;
opacity: .5;
font-weight: 400;
margin-top:1rem;
letter-spacing: 1px;
margin-bottom: 0.5rem;
}
.in{
    background-color: #404246;
    color: white;
    cursor: no-drop;
}
button{
  background: #cae962 !important;
  color: #111 !important;
  padding:0.3rem 0rem;
  border-color: #cae962 !important;
  box-shadow: none !important;
  font-weight: 400;
font-size: 16px;
margin-top: 1.5rem !important;
margin-bottom: 1rem;
}
input::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: gray;
  opacity: 10; 
}
.in::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: white;
  opacity: 1; /* Firefox */
}
.profile img{
height: 5rem;
width: 5rem;
background-color:#292a2b;
border-radius:50% ;
image-orientation: from-image;
/* position: absolute; */
}
.profile{
    /* height: 100%; */
    /* background-color: #292a2b; */
    margin-top: 95px;
    position: relative;
    padding: 3rem;
    background: linear-gradient(180deg,#292a2b 0,rgba(64,66,70,0) 100%);
    /* background: linear-gradient(180deg,#404246 0,rgba(64,66,70,0) 100%); */
    padding-top: 1.5rem;
}
.inputs label p{
    color: gray;
    cursor: pointer;
}
 .inputs label p:hover{
    color: #ccc;
}
@media (max-width: 1000px) {
    .container{
        flex-direction: column-reverse;
    }
    .profile{
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
@media (max-width: 496px) {
    .container{
        width: 95%;
    }
    .inputs{
        width: 100%;
    }
}
button{
    margin-bottom:1rem;
}
`

const GetHi=styled.div`
img{
    width: 100%;
   max-height: 10rem;
   overflow: hidden;
    filter: blur(10px);
    position: absolute;
    z-index: -1;
opacity: 0.8;
}
.img{
    height: 10rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}
.img h1{
    font-size: 3rem;
    opacity: 2;
    position: absolute;
    /* margin-top:5.5rem; */
    color:white;
    z-index: 2;
    font-size: 30px;
line-height: 1.4em;
margin-bottom: 15px;
font-weight: 500;
}
nav{
    opacity: 2;
    position: absolute;
    /* margin-top:5.5rem; */
    color:white;
    z-index: 2;
line-height: 1.4em;
/* margin-bottom: 15px; */
font-weight: 500; 
}
nav ul {
    display: flex;
    margin-top: 5rem;
}
nav ul li{
    margin: 1rem;
    list-style: none;
}
nav ul li p{
    font-size: 14px;
    cursor: pointer;   
    font-family: Montserrat,Arial;
    border-color: #cae962;
}
nav ul li p:hover{
    color: #cae962;
    font-family: Montserrat,Arial;
}
i{
     margin-right: 0.5rem;
}
.cover{
/* position: absolute; */
/* inset: 100%; */
background: rgba(32, 33, 37, 0.8);
width: 100%;
height: 100%;
z-index: 1;
}
span{
    color: #cae962;
}
label{
    cursor: pointer;
}
@media (max-width:400px){
    label{
        display: none;
    }
}
`