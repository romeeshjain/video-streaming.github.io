import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Dubbed = () => {
    const [Value, setValue] = useState("");
    const [load, setload] = useState(false);
    const [resp, setresp] = useState("");
    const [count, setcount] = useState("");
    const [increase, setincrease] = useState(4);
    useEffect(() => {
        const load = async () => {
            setload(true);
            let result = await fetch('http://localhost:5000/allvideos', {
                method: "get",
                headers: { 'Content-Type': "application/json" }
            })
            result = await result.json();
            setValue(result);
            // console.log(result);
            setload(false);
        }
        const searches = async () => {
            ;
            let result = await fetch('http://localhost:5000/search/action', {
                method: "get",
                headers: { 'Content-Type': "application/json" }
            })
            result = await result.json();
            setresp(result);
            // console.log(result);
            setload(false);
        }


        const count = async () => {
            let data = await fetch(`http://localhost:5000/${Value._id}/viewcount`, {
                method: "put"
            });
            setcount(data);
        }
        count();
        searches()
        load();
    }, [])
  return (
   <DubbedContainer>
    <Main>
    <div className='imgs'>
    <div className='animehead'>Dubbed Guys</div>
    
                        <div className='trend'>
                            <div>
                                <h1>Home Anime</h1>
                                <div className='container'>
                                    {Value && Value.map((key, index) => {
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

                            <div className='trending'>
                                <h1 className='jods'>Home View</h1>
                                <div className='mc'>
                                    {Value && Value.slice(0, increase).map((key, index) => {
                                        return (
                                            <a href={`/videos/${key._id}`}>
                                                <div className='trendcontainer'>
                                                    <h2 className='b'>{index + 1}</h2>
                                                    <img src={key.thumbnail} />
                                                    <div className='info'>
                                                        <h2 className='box'>{key.title}</h2>
                                                        <div className='infos'>
                                                            <p><i className="fa-solid fa-eye">{key.views}</i></p>
                                                            <p><i className="fa-solid fa-heart">10k</i></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        )
                                    })}
                                    <button onClick={() => setincrease(increase + 1)}> more Videos</button>
                                </div>

                            </div>
                        </div>
                        </div>
                    </Main>
                    
   </DubbedContainer>
  )
}

export default Dubbed

const DubbedContainer = styled.div`

/* background: linear-gradient(360deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%); */
.imgs{
    background-image: url('/Image/riot.jpg') ;  
background-repeat: no-repeat;
min-height:60vh;
/* height: 100%;
width: 100%; */
position: relative;
/* position: fixed; */
background-size: 100% 100%;
/* background-position:fixed ; */
}
.imgs::before{
    background-image: linear-gradient(360deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%);
    /* position: fixed; */
max-height: 350px;
min-height: 30%;
left: 0;
right: 0;
bottom: 0;
content:""
}
.animehead{
    color:white;
    text-align :center;
    font-size:3rem;
}
`
const Main = styled.div`
.imgs{
    background-image: url('/Image/riot.jpg') ;
background-repeat: no-repeat;
min-height:100%;
min-width:100%;
/* position: fixed; */
background-size: 100% 100%;
background-position:fixed ;
}
.imgs::before{
    background-image: linear-gradient(360deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%);
    position: fixed;
max-height: 350px;
min-height: 30%;
left: 0;
right: 0;
bottom: 0;
content:""
}
.animehead{
    color:white;
    text-align :center;
    font-size:3rem;
}
min-height: 80vh;
display: flex;
justify-content: center;
align-items: center;
overflow: hidden;
button{
    background-color: #cae962;
    color:black;
    width: 100%;
    padding:0.3rem 0rem;
    font-weight: 600;
    
}
h1{
font-size: 22px !important;
line-height: 40px;
font-weight: 600;
padding: 0;
color: #cae962;
margin-bottom: 1rem;
}
.container{
    display: grid;
    grid-template-columns: repeat(4 ,auto) ;
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
    grid-template-columns: repeat(12 ,200px) ;
} 
}
.jods{
    margin-left: 1rem;
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
    h1{
        margin-right: 1rem;
    }
    p{
        font-size: 0.8rem;
        display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  color: #ccc;
    }
    p:hover{
        color: rgb(222, 212, 212);
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
.trend{
    display: flex;
}
.trending{
margin-left:0.5rem;
}
.box{
    color: white;
    display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  color: white;
  margin-right: 0.5rem; 
}
.b{
    /* color: white;
    display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  margin-right: 0.5rem; */
  margin-right: 0.5rem;
  font-weight: 600;
font-size: 20px;
color: #737682;
position: relative;
display: inline-block;
}
h2:hover{
    color: #cae962;
}
.trendcontainer{
    display: flex;
    align-items: center;
    margin-top:1rem;
    margin-bottom:0.5rem;
}
.trendcontainer img{
    height: 3rem;
    min-width: 3rem;
    max-width: 3rem;
    margin-left:0.8rem;
    margin-right: 0.8rem;
}
.mc{
    background: #2a2c31;
    width: 100%;
    /* height:100%; */
    padding-right:1rem;
    margin:1rem;
    padding-top:0rem;
    padding-left:0rem;
    padding:0.5rem;
}
.info{
    display: flex;
    flex-direction: column;
    color:gray;
}
.infos{
    display: flex;
}
i{
    font-size: 0.7rem;
    margin-right:1rem;
}
@media (max-width:1180px) {
    .trend{
        flex-direction: column;
        align-items: center;

    }
    .trending{
        width: 100%;
}
h1{
    margin-top:2rem;
}
.mc{
    margin:0rem;
}
}
`