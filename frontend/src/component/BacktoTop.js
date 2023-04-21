import React, { useState , useEffect } from 'react'
import styled from 'styled-components';

const BacktoTop = () => {
    const[backtotop , setbacktotop]=useState(false);
    
    const scrollUp =()=>{
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    }
    useEffect(()=>{
        window.addEventListener("scroll" , ()=>{
            if(window.scrollY>10){
                setbacktotop(true);
            }
            else{
                setbacktotop(false);
            }
        })
    },[])
  return (
    <Bitt>
        {backtotop? <div className='scroll' onClick={scrollUp}>
            <img src="/Image/scroll.png"/>
        </div>:""}
    </Bitt>
  )
}

export default BacktoTop;
const Bitt = styled.div`
.scroll{
 position: fixed;
z-index: 2;
color: white;
bottom: 50px;
right: 10px;
cursor: pointer;
width: 3rem;
height: 3rem;
font-size:3rem;
}
.scroll:hover{
    border-radius: 50%;
background: black;
}

`