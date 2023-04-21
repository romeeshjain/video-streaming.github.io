import React, { useEffect , useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
const Search = () => {
    const params = useParams();
    const[resp , setresp] =useState("")
    useEffect(()=>{
        const searching =()=>{
            fetch(`http://localhost:5000/search/${params.id}`).then((result) => {
                return result.json();
            }).then((resp) => {
                setresp(resp);
            });
        }
        console.log(resp , params)
        searching();
    },[])
  return (
   <>
   {/* <Geners>
<div className='container'>
    <div className='Geners'>
        
    </div>
</div>
   </Geners> */}
   <Main>
        <div className='main-container'>
          <h1>Working <span>{params.id}</span></h1>
            <div className='container'>
                {resp&&resp.map((key,index)=>{
                    return(
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
        </Main>
   </>
  )
}

export default Search

const Main = styled.div`
min-height: 80vh;
background: #202125 ;
display: flex;
justify-content: center;
align-items: center;
overflow: hidden;
h1{
  font-size: 2rem;
color: rgb(200, 231, 99);
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
    grid-template-columns: repeat(1 ,200px) ;
} 
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
    p{
        font-size: 0.8rem;
        display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  color: wheat;
    }
    p:hover{
  color:rgb(200, 231, 99);

    }
}
@media(max-width: 526px){
   .main-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
   }
}

`

const Geners =styled.div`
background: linear-gradient(0deg,rgba(51,53,60,0) 0,#33353c 50%,#33353c 100%);
background: rgb(32, 33, 37);
min-height: 50vh;
`