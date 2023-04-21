import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {useToast} from '@chakra-ui/react'
import axios from 'axios';
const FirstPage = () => {
    const [ search , setSearch]=useState("");
    const[resp , setresp] =useState("")
    const navigate = useNavigate();
    const toast = useToast();
    const searching =()=>{
        if(!search){
            toast({
                title:"Please search bro don't make me fool",
          status:"warning",
          duration:5000,
          isClosable:true,
          position:"bottom",
            })
        }
        else{
        navigate(`/search/${search}`)
        }
    }
    useEffect(()=>{
        const load = async()=>{
            // fetch("http://localhost:5000/post").then(
            //     resp=>resp.json
            //     ).then(
            //         e=>{
            //             setresp(e);
            //         }
            // )
            let result = await fetch(`http://localhost:5000/post` ,{
            method:"get",
            headers:{'Content-Type':"application/json"}
        })
        result = await result.json();
        setresp(result);
        console.log(result);
        }
        load();
    },[]);

    const Readmore=()=>{
        navigate("/readmore");
    }

   
    return (
        <>
            <Full>
                <Blur>
                    <div className='top'></div>
                </Blur>
                <PageContainer>
                    <div className='container'>
                        <div className='flex-box'>
                            <div className='logo'>
                                <img className='luffy' src='/Image/logo.png' />
                                <div className='text'>
                                    <h2>Ghost Never Die</h2>
                                    <p> They Make People <span>Die</span></p>
                                </div>
                            </div>
                            <div className='but'>
                                <input type="text" placeholder='Search Bro...' value={search} onChange={(e)=>setSearch(e.target.value)}/>
                                
                                <button onClick={searching}>
                                    <i Class="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </div>
                            <div className='linkes'>
                                Top Search : <a href={`/search/Naruto`}>Naruto</a> , <a href={`/search/Demon Slayer`}>Demon Slayer</a>, <a href={`/search/ghost`}>Ghost</a> , <a href={`/search/naruto baryon`}>Naruto baryon</a> , <a href={`/search/Find`}>Find Crimson</a> , <a>One Piece</a>
                            </div>
                        </div>
                        <div className='img'>
                            <img src="/Image/zoro-min.png" />
                        </div>
                    </div>
                </PageContainer>
                <FullSite>
                    <div className='text'>
                        <a href="/Home">
                            View FullSite <i Class="fas fa-arrow-circle-right ml-2"></i>
                        </a>
                    </div>
                </FullSite>
                <Share>
                    <div className='share'>
                        <div className='border'>
                            <h1>Share GhostSite</h1>
                            <p>share this to your friend</p>
                        </div>
                    </div>
                    <img src="/Image/share-icon.gif"/>
                </Share>
                <SiteInfo>
                    <div className='info'>
                        <div className='main-box'>
                            <div className='heading'>
                                <h1>Ghost - The best site to watch anime online for Free</h1>
                                <p>Do you know that according to Google, the monthly search volume for anime related topics is up to over 1 Billion times? Anime is famous worldwide and it is no wonder we've seen a sharp rise in the number of free anime streaming sites.
                                    <br />
                                    Just like free online movie streaming sites, anime watching sites are not created equally, some are better than the rest, so we've decided to build Ghost.to to be one of the best free anime streaming site for all anime fans on the world.</p>
                            </div>
                            <div className='heading'>
                                <h1>1/ What is Ghost.to?</h1>
                                <p>Ghost.to is a free site to watch anime and you can even download subbed or dubbed anime in ultra HD quality without any registration or payment. By having No Ads in all kinds, we are trying to make it the safest site for free anime.

                                    Just like free online movie streaming sites, anime watching sites are not created equally, some are better than the rest, so we've decided to build Ghost.to to be one of the best free anime streaming site for all anime fans on the world.</p>
                            </div>
                            <div className='heading'>
                                <h1>2/ Is Ghost.to safe?</h1>
                                <p>Yes we are, we do have only one Ads to cover the server cost and we keep scanning the ads 24/7 to make sure all are clean, If you find any ads that is suspicious, please forward us the info and we will remove it.
                                </p>
                            </div>
                            <div className='heading'>
                                <h1>3/ So what make Ghost.to the best site to watch anime free online?</h1>
                                <p><span>Safety:</span> We try our best to not having harmful ads on Ghost.
                                </p>
                                <p>
                                    <li><span>Content library:</span> Our main focus is anime. You can find here popular, classic, as well as current titles from all genres such as action, drama, kids, fantasy, horror, mystery, police, romance, school, comedy, music, game and many more. All these titles come with English subtitles or are dubbed in many languages.</li></p>
                                <p>
                                    <li><span>Content library:</span> All titles are in excellent resolution, the best quality possible. Ghost.to also has a quality setting function to make sure our users can enjoy streaming no matter how fast your Internet speed is. You can stream the anime at 360p if your Internet is being ridiculous, Or if it is good, you can go with 720p or even 1080p anime.</li></p>
                                <p>
                                    <li><span>Streaming experience: </span> Compared to other anime streaming sites, the loading speed at Ghost.to is faster. Downloading is just as easy as streaming, you won't have any problem saving the videos to watch offline later.</li></p>
                                <p>
                                    <li><span>Updates: </span> Ghost works alright on both your mobile and desktop. However, we'd recommend you use your desktop for a smoother streaming experience.</li></p>
                                <p>
                                    <li><span>Customer care:  </span> We are in active mode 24/7. You can always contact us for any help, query, or business-related inquiry. On our previous projects, we were known for our great customer service as we were quick to fix broken links or upload requested content.</li></p>
                                <p>So if you're looking for a trustworthy and safe site for your Anime streaming, let's give Ghost.to a try. And if you like us, please help us to spread the words and do not forget to bookmark our site.</p>
                                <p>Thank you!</p>
                            </div>
                        </div>
                    </div>
                    <div className='trend'>
                        <div className='headingg'>
                        <h1>Trending</h1>
                        </div>
                        {resp&&resp.map((key,index)=>{
                            return(
                                <div className='head'>
                            <div className='trend-box'>
                                <div className='boxe'>
                                    <div className='flex'>
                                    <div className='tags'>
                                        <p>{key.hashtags}</p>
                                        <p>{key.createdAt}</p>
                                    </div>
                                    <div className='comment'>
                                    <i Class="fa-solid fa-comment"></i> Comment
                                    </div>
                                    </div>
                                    <div className='comment-heading'>
                                        <h1>{key.title}</h1>
                                        <p>{key.description}</p>
                                    </div>
                                    <div className='img'><img src={key.images}/>{key.username}</div>
                                </div>
                            </div>
                        </div>  
                            )
                        })}
            
                        <div className='but'>
                            <button onClick={Readmore}>Read More</button>
                        </div>
                    </div>
                </SiteInfo>
            </Full>
        </>

    )
}

export default FirstPage;
const PageContainer = styled.div`
.top{
    border-top: 5rem solid rgba(32,33,37,1) ;
    /* position: absolute; */
    height: 10rem;
}
input::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: black;
  font-weight: 600;
  opacity: 10; 
}
 background-image: url("/Image/zoro-bg.jpg");
 height: 100%;
 background-size: cover;
 background-position: center;
 min-height: 20rem;
 .container {
  background: linear-gradient(180deg, rgba(32,33,37,1) 0%, rgba(32,33,37,0) 64%);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
}
.luffy{
    height: 5rem;
    width: 5rem;
}
.logo{
    color:white;
    display: flex;
}
h2{
    font-weight: 600;
}
p{
    color:#cae962;
}
span{
    color:red;
    font-weight: 600;
}
.flex-box{
    width: 70%;
    padding-left: 5rem;
}
input{
    width: 70%;
    border-radius:1rem ;
    padding:0.5rem;
    outline: none;
}
.img{
    text-align: end;
}
img{
    width: 100%;
    height: 25rem;
}
.container::before{
    background: linear-gradient(180deg, rgba(32,33,37,1) 0%, rgba(32,33,37,0) 64%);
    height: 10rem;
    background: red;  
}
.but{
    display: flex;
}
button{
    /* background: red; */
    margin-left:0.5rem;
}
i{
    color: #111;
    font-size: 20px;
    line-height: 50px;
    border-radius: 50%;
    height: 3rem;
    font-weight: 800;
    width: 3rem;
    background: #cae962;
}
.linkes{
    font-family: "Montserrat", Arial;
    color:white;
    font-size: 14px;
    margin-top: 2rem;
}
a{
    color: #aaa;
}
a:hover{
color: #cae962;
cursor: pointer;
}
@media (max-width: 796px) {
    /* img{
        display: none;
    } */
    .logo{
        margin-top: 2rem;
    }
    .flex-box{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        padding-left: 0rem;
    }
    .container{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    input{
        width: 15rem;
    }
    .img{
        display: none;
    }
}
`
const Blur = styled.div`
border-top: 5rem solid rgba(32,33,37,1) ;
height: 10rem;
position: absolute;
`
const FullSite = styled.div`
height: 3rem;
background:#cae962;
border-radius:0rem 0rem 5rem 5rem;
display: flex;
justify-content: center;
.text{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 600;
    cursor: pointer;
}
i{
    margin-left: 0.5rem;
}

`
const Full = styled.div`
background: #202125;
overflow: hidden;
`
const Share = styled.div`
height: 10rem;
padding:2rem;
font-family: "Montserrat", Arial;
/* margin-bottom: 2rem; */
img{
    height: 5rem;
    width: 5rem;
    display: none;
}
.share{
    background: black;
    height: 5rem;
    margin:1rem;   
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 0.5rem;
}
h1{
    color: #cae962;
    margin:0.5rem;
    margin-bottom: 0rem;
}
p{
    color: white;
    margin: 0.5rem;
    margin-top: 0;
    
}
hr{
    height: 100%;
    position: absolute;
    background-color: red;
}
.border{
        border-left: 2px solid #cae962;
        margin-left:0.5rem;
    }
`

const SiteInfo = styled.div`
display: flex;
color:white;
.info{
    display: flex;
    padding:0.5rem;
}
.heading h1{
    font-size: 1.5rem;
    font-weight: 600;
}
.heading p{
    font-size: 0.9rem;
    color:#ccc;
    margin-top: 1rem;
}
img{
    height: 2.5rem;
    width:2.5rem;
    margin-top: 0.5rem;
    border-radius: 50%;
    margin-right: 0.5rem;
}
.img{
    display: flex;
    align-items: center;
}
.but{
    width: 100%;
    text-align: center;
}
button{
    background: rgb(202, 233, 98);
    color: black;
    width: 90%;
    font-size: 1.5rem;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
}
.but :hover button{
    color:red;
}
.trend{
width:50rem;
margin-right: 0.5rem;
}
.main-box{
    /* /* padding:1rem;  */
}
.heading{
    margin:2rem;
}
br{
    margin: 1rem;
}
span{
    color:white;
    font-weight: 600;
}
.trendbox{

}
.boxe{
    width: 100%;
    display: block;
    cursor: default;
    padding: 20px;
    border-radius: 1rem;
    position: relative;
    font-size: 12px;
    line-height: 1.4;
    background: rgb(255,255,255,.05);
    margin-bottom: 0.5rem;
    display: flex;
    flex-direction: column;
}
.flex{
    display: flex;
    justify-content: space-between;
}
.tags{
    display: flex;
}
.tags p{
    margin-right:0.5rem;
    width: 9.2ch;
    display: -webkit-box;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
}
.comment{
    margin-left: 1rem;
}
.head h1{
    font-size: 1rem;
}
.comment-heading{
    margin-top: 0.5rem;
}
.comment-heading p{
    margin-top:0.5rem ;
    color:#ccc;
}
@media (max-width: 960px) {
    flex-direction: column;
    align-items: center;
}
.trend{
width:100%;
margin-right: 0.5rem;
margin:0.5rem;
}
.head{
    padding: 0.5rem;
}
height: 100%;
overflow: hidden;
.headingg{
 margin-left   :0.5rem ;
}
::before{
    opacity: 0;
}
`