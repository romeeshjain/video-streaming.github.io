import React from 'react'
import styled from 'styled-components'
import "../css/css"
const Discord = () => {
  return (
   <ImageContainer>
<div className='discord'>
    <div className='main-container'>
        <div className='head'>
            <img src='/Image/naruto.gif'></img>
        <h1>Wake Up To Reality</h1>
        </div>
        <div className='info'>
            Ghost is Real
        </div>
        <div className='users'>
            <li>Online</li><li>Members</li>
        </div>
        <div className='inputinfo'>
<label>Username</label>
<div className='input'>
<input type='text' placeholder='What should every one call you....... '/>
</div>
<div className='but'>
<button>Continue</button>
</div>
    </div>
    <div className='already'>
        <p>aleready have an account</p>
    </div>
    <div className='terms'>
        <p> By registerning you will agree to Ghost registration <span>Terms and Condition</span></p>
    </div>
</div>
</div>

   </ImageContainer>
  )
}

export default Discord

const ImageContainer = styled.div`
background-image: url("/Image/zorogod.jpg");
height: 100vh;
background-position: center top  ;
background-repeat: no-repeat;
  background-size: cover;
.discord{
   height :10rem ;
   position: relative;
   /* background-color: red; */
   display: flex;
   justify-content: center;
   align-items: center;
   height: 100%;
}
.main-container{
    background: rgba(66, 69, 73, 0.8);;
    color: white;
    width: 30rem;
    height: 30rem;
    padding: 0.3rem;
    border-radius: 1rem;
    padding: 3rem;
}
img{
    height: 5rem;
}
.head{
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #ccc;
}
.info{
    text-align: center;
    font-weight: 600;
    font-size: 1.3rem;
}
.users{
    justify-content: center;
    /* align-items: center; */
    gap: 3rem;
    display: flex;

}
.users li{
    margin-left:0 ;
    color: #ccc;
}
.inputinfo{
    display: flex;
    flex-direction: column;
    margin-top: 3rem;
}
.input{
    width: 100%;
}
label{
    text-transform: uppercase;
    color: #ccc;
    font-size: 0.7rem;
}
input{
    width: 100%;
    background-color: #202225;;
    color: white;
    padding: 0.5rem;
}
.but{
    width: 100%;
    margin-top: 1rem;
}
button{
    width: 100%;
    background-color:  rgb(17, 103, 179);
    font-weight: 600;
    padding: 0.5rem;
    border-radius: 0.4rem;
}
button:hover{
background-color:#005bac;
}
.already p {
    font-size: 0.8rem;
    color: cyan;
    cursor: pointer;
}
.already p:hover{
    text-decoration: underline;
}
.already{
    margin-top: 0.5rem;
}
.terms{
    font-size: 0.7rem;
    margin-top: 1.5rem;
    color: #ccc;
}
span{
    color:cyan;
    cursor: pointer;
}
span:hover{
    text-decoration:underline;
}
@media (max-width: 484px) {
    height: 100%;
    width: 100%;
    .main-container{
    background: rgba(66, 69, 73, 1);;
    border-radius: 0rem;
} 
}
`