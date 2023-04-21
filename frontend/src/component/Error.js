import React, { useState } from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
const Error = () => {
    const navigate =useNavigate()
    const [click, setonclick] = useState("");
    const oncheck=()=>{
        navigate("/");
    }
    return (
        <ErrorBox>
            <div className='postbro'>
                <p>404 Error Bro</p>
                <img src="/Image/error.png"></img>
                <button onClick={oncheck}>Backend on karle Fuck you </button>
            </div>
        </ErrorBox>
    )
}

export default Error;

const ErrorBox = styled.div`
background-color: rgb(32, 33, 37);
display: flex;
justify-content: center;
padding-top: 1rem;
/* align-items: center  ; */
color:white;
height: 80vh;
text-align: center;
.postbro{
    height: 70%;
}
img{
    height: 100%;
    width: 100%;
}
p{
   font-size :2rem ;
   font-weight: 600;
}
button{
    padding: 0.5rem;
    background: rgb(200, 231, 99);
    width: 100%;
    color: black;
    font-weight: 600;
    border-radius: 0.5rem;
}

`