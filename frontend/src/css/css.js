import styled from "styled-components";

const Slider = styled.div`
font-family: Tungsten,Oswald,Helvetica,sans-serif;
font-size:.85rem;
position: relative;
top:0;
max-height:25rem;
overflow: hidden;
/* min-height:100vh; */
video{
    /* width: 100%; */
    max-height: 70rem;
    /* min-width: 100%; */
    opacity: 0.5;
    /* object-fit: cover; */
    z-index: -100;
    /* position: absolute; */
    right: 0;
    bottom: 0;
    background: url("/Image/videoplayback.mp4") no-repeat center center;
    background-size: cover;
    /* overflow: hidden; */
}
video::before{
    background: red;
    position: absolute;
    top:0;
    bottom: 0;
}
background: rgb(32, 33, 37);
button{
width: 100%;
background: black;
font-size:2rem;
text-align:center;
color:rgb(202, 233, 98);
border-radius:0rem 0rem 2rem 2rem;
}
button:hover{
    color:green;
}
.video{
    /* max-height:60vh; */
overflow: hidden;
height: 100%;
width: 100%;
/* background: url(../img/index-image.jpg) no-repeat center center; */
    background-size: cover;
}
.head{
    color:white;
    position: absolute;
    display: flex;
    justify-content:center;
    align-items:center;
    text-align:center;
    flex-direction:column;
    width: 100%;
    height: 100%;
}
h1{
    font-size:2rem;
    text-transform: uppercase;
    font-family: Tungsten Oswald,Helvetica,sans-serif;
    font-weight:800;
}
text-transform: uppercase;
.head button{
    /* min-width: 5rem; */
    max-width:8rem;
    font-size:1.2rem;
    z-index:1;
    opacity: 0.5;
    border-radius:0.5rem ;
    background: transparent;
    border:3px solid white;
    text-transform: uppercase;
    font-family: Tungsten Oswald,Helvetica,sans-serif;
}
.head button:hover{
    opacity: 1;
    color: rgb(202, 233, 98);
    font-weight:600
}
`

export default Slider;
