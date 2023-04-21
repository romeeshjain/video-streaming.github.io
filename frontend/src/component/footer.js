import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Footer = () => {
    return (
        <Footers>
            <div className='container'>
                <div className="box">
                <div className='info'>
                    <nav>
                        <ul>
                            
                            <li><NavLink to="/">Home</NavLink></li>
                            <li>All Movies</li>
                            <li>New Movies</li>
                        </ul>
                    </nav>
                    </div>
                <div className='info'>
                <nav>
                        <ul>
                            <li>Facebook</li>
                            <li>Git Hub</li>
                            <li>Instagram</li>
                        </ul>
                    </nav>
                </div>
                </div>

                <div className='anime-list'>
                   <h3>A to Z List</h3><span></span> <h3>searching anime by alphabets</h3>
                </div>
                <span></span>
                <div className='copy'>
                    <p>Ghosty does not store any files on our server, we only linked to the media which is hosted on 3rd party services. </p>
                    <p>&copy; 1996-2023, ghost.site, Inc. or its affiliates</p>
                    <img src="https://res.cloudinary.com/degkaauzc/image/upload/v1679634391/sasuke_ozl7fm.gif"/>
                    </div>
            </div>
        </Footers>
    )
}

export default Footer
const Footers = styled.div`

.container{
    background-image:  url("/Image/footer.jpg")  ;
    height: 30rem;
    background-position: top;
    color: white;
    position: relative;
    bottom: 100;
    top: 0;
    background-repeat: no-repeat;
    background-color: #2a2c31;
   
}
.box{
    display: grid;
    grid-template-columns: repeat(2 ,200px);
    grid-gap: 1rem;
}
nav ul li{
    margin:1rem;
    list-style: none;
    cursor: pointer;
}
nav ul li:hover{
    color: gray;
}
h3{
    font-weight: 100;
    margin: 1rem;
    /* margin-left:3.5rem; */
}
.anime-list{
    display: flex;
    margin-left: 2.5rem;
}
.anime-list span{
    border: #2a2c31;
    margin:1rem;
    border: 1px solid red;
}
.copy{
display: flex;
flex-direction: column;
text-align: center;
justify-content: center;
align-items: center;
}
.copy p{
    font-size: 1rem;
    font-weight: 100;
    
}
img{
    height: 10rem;
    width: 10rem;
    margin: 1rem;
}
`