import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Slider from '../css/css';
import { NavLink, useNavigate } from 'react-router-dom';

const HomeVideos = () => {
    const [Value, setValue] = useState("");
    const [load, setload] = useState(false);
    const [resp, setresp] = useState("");
    const [count, setcount] = useState("");
    const [audios,setaudios]=useState(true);
    const [userdata , setuserdata] = useState("");
    const [increase, setincrease] = useState(4);
    const [clicked , setclicked] = useState();
    const navigate = useNavigate();
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

    // useEffect(()=>{
    //     const da=()=>{
    //         let data=()=>{
    //             const values =  JSON.parse(localStorage.getItem("video-user"))
    //             setuserdata(JSON.parse(localStorage.getItem("video-user")));
    //         }
    //         data();}
    // da();
    // })
    const scrollUp =()=>{
        window.scrollTo({
            top:450,
            behavior:"smooth"
        })
    }
       window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    const scroll =()=>{
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    }
    return (
        <>
            {load ?
                <Load>
                    <img src="/Image/tennis.png" />
                    <h1>Loading...</h1>
                </Load> :
                <div>
                      <Slider>
                        <div className='head'>
                            <h1>Wake Up to Reality</h1>
                            <button onClick={scrollUp}>Dead<br/> {userdata.username}</button>
                            </div>

                        <div classNamxe='video'>    
                       <video autoPlay loop muted={audios} >
                        <source src="/Image/videoplayback.mp4"/>
                       </video>
                       </div>
                       <button onlick={()=>setaudios(false)}>audio</button>
                       
                    </Slider>
                    <Main>
                        <div className='trend'>
                            <div>
                                <h1>Home Anime</h1>
                                <div className='container' >
                                    {Value && Value.map((key, index) => {
                                        return (
                                           <NavLink to={`/videos/${key._id}`} > 
                                                <div className='movie-card'>
                                                    <div className='img'>
                                                        <img src={key.thumbnail} />
                                                    </div>
                                                    <div className='card-info'>
                                                        <h3>{key.title}</h3>
                                                        <p>{key.description} </p>
                                                    </div>
                                                </div>
                                            
                                            </NavLink>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className='trending'>
                                <h1 className='jods'>Home View</h1>
                                <div className='mc' >
                                    {Value && Value.slice(0, increase).map((key, index) => {
                                        return (
                                            <NavLink to={`/videos/${key._id}`} > 
                                                <div className='trendcontainer' >
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
                                            </NavLink>
                                        )
                                    })}
                                    <button onClick={() => setincrease(increase + 1)}> more Videos</button>
                                </div>

                            </div>
                        </div>
                    </Main>

                    <Popular>
                        <div> <h3 style={{
                            color: "rgb(202, 233, 98)",
                            fontWeight: "600",
                            fontSize: "1.5rem",
                            marginLeft: "1rem",
                        }}>Trending</h3></div>
                        <div className='flex-box'>
                            <div className='trending'>
                                <div className='img'>
                                    <img src='/Image/usa.png' />
                                </div>
                                {/* <h1 className='jodsonClick={scroll}'>Most View</h1> */}
                                <div className='mc' >
                                    <h1 className='jods'>Top Airing</h1>
                                    {resp && resp.map((key, index) => {
                                        return (
                                            <NavLink to={`/videos/${key._id}`}  > 
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
                                               
                                           </NavLink>
                                        )
                                    })}
                                    <div clasName="but">
                                        <button>Read More</button>
                                    </div>
                                    {/* <button> more Videos</button> */}
                                </div>
                            </div>
                            <div className='trending'>
                                <div className='img'>
                                    <img src='/Image/wv-02.png' />
                                </div>
                                <div className='mc' >
                                    <h1 className='jods'>Most Favorite</h1>
                                    {resp && resp.map((key, index) => {
                                        return (
                                            <NavLink to={`/videos/${key._id}`} > 
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
                                             
                                            </NavLink>
                                        )
                                    })}
                                    <div clasName="but">
                                        <button>Read More</button>
                                    </div>
                                    {/* <button> more Videos</button> */}
                                </div>
                            </div>
                            <div className='trending'>
                                <div className='img'>
                                    <img src='/Image/luffy1.png' />
                                </div>
                                <div className='mc'>
                                    <h1 className='jods'>Completed</h1>
                                    {resp && resp.map((key, index) => {
                                        return (
                                            <NavLink to={`/videos/${key._id}`} > 
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
                                                </NavLink> 
                                        )
                                    })}
                                    <div clasName="but" >
                                        <button>Read More</button>
                                    </div>
                                    {/* <button> more Videos</button> */}
                                </div>
                            </div>
                        </div>
                    </Popular>
                    <Animeaction>
                        <div className='trend'>
                            <div >
                                <h1>Action Anime</h1>
                                <div className='container'>
                                    {resp && resp.map((key, index) => {
                                        return (
                                            <NavLink to={`/videos/${key._id}`} > 
                                                <div className='movie-card' >
                                                    <div className='img'>
                                                        <img src={key.thumbnail}/>
                                                    </div>
                                                    <div className='card-info'>
                                                        <h3>{key.title}</h3>
                                                        <p>{key.description}</p>
                                                    </div>
                                                </div>
                                           </NavLink>
                                        )
                                    })}
                                </div>
                            </div>
                            <div>
                                <div className='trending'>
                                    <h1 className='jods'>Action View</h1>
                                    <div className='mc'>
                                        {resp && resp.map((key, index) => {
                                            return (
                                                <NavLink to={`/videos/${key._id}`} > 
                                                    <div className='trendcontainer' >
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
                                                </NavLink>
                                            )
                                        })}

                                        <button> more Videos</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Animeaction>
                </div>
            }
        </>
    )
}

export default HomeVideos
const Main = styled.div`
min-height: 80vh;
background: #202125 ;
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
const Load = styled.div`
height: 90vh;
background: #202125 ;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;

img{
    height: 5rem;
    background: red;
    border-radius: 50%;
}
h1{
    color:white;
}
@keyframes img {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
  /* transform : translate(300px 200px);  */
}
@media (prefers-reduced-motion: no-preference) {
  img {
    animation: img infinite 0.5s linear;
  }
}
`
const Animeaction = styled.div`
min-height: 80vh;
background: #202125 ;
display: flex;
justify-content: center;
align-items: center;
overflow: hidden;
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
.movie-card{
    width: 100%;
} 
}
@media(max-width: 476px){
    .container{
    /* grid-template-columns: repeat(1 ,200px) ; */
} 
.movie-card{
    width: 100%;
} 
}
.jods{
    margin-left: 1rem;
}
.movie-card{
    height: 20rem;
    width: 14rem;
    @media(max-width: 500px){
    .container{
    grid-template-columns: repeat(2 ,auto) ;
}
.movie-card{
    width: 100%;
} 
}
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
button{
    background-color: #cae962;
    color:black;
    width: 100%;
    padding:0.3rem 0rem;
    font-weight: 600;
    
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
    border-radius:0.5rem ;
}
}
`


const Popular = styled.div`
min-height: 60vh;
background-color:#202125 ;
.trending{
margin-left:0.5rem;
margin-top: 1rem;
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
    /* margin:1rem; */
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
@media (max-width:812px) {
    .trend{
        /* flex-direction: column; */
        align-items: center;

    }
    .trending{
        /* width: 100%; */
}
h1{
    /* margin-top:2rem; */
}
.mc{
    margin:0rem;
}
.flex-box{
flex-wrap: wrap;

}
}
.flex-box{
display: flex;
/* flex-wrap: wrap; */
justify-content: center;
align-items: center;
}

.newhead{
    color:rgb(202, 233, 98);

}
h1{
    color: #cae962;
}
.jods{
    text-align: left;
    /* margin-top: 1rem; */
    padding: 1rem;
    border-bottom: 2px solid #cae962 ;
    font-weight: 600;
}
padding:1rem;
.img{
    width:100%;
    text-align: center;
    display: flex;
    justify-content: center;
}
img{
    max-height: 10rem;
}
.but{
    background : red ;
}
button{
    color:white;
    width:100%;
    text-align: center;
    background-color: #ccc;
    color: black;
    padding: 0.3rem ; 
    border-radius: 0.5rem ; 
}
`

