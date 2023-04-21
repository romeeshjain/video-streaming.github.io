import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Registration from '../seperatepages/Registration'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import JustPage from '../seperatepages/justPage';
import { useParams } from 'react-router-dom';
import Discord from './Discord';
const Nav = () => {
    const params = useParams();
    const navigate = useNavigate;
    const [data, setdata] = useState("");
    const [newcss, setnewcss] = useState(false);
    const [visible, setvisible] = useState(false);
    const [searchcss, setsearchcss] = useState(false);
    const [prof, setprof] = useState(false);
    const [change, setchange] = useState("");
    const [resp, setresp] = useState([]);
    const [Value, setValue] = useState({
        search: ""
    });
    const [par , setpar]= useState(true);
    console.log(params.id  ,"params");
    useEffect(() => {
        const d =()=>{
           if(!params){
                setpar(false)
           }
        }
        d();
    }, []);
    const [img, setimg] = useState("");
    const auth = localStorage.getItem("video-user");
    // const im = JSON.parse(localStorage.getItem('video-user')).images;
    // setimg(im);
    // if(auth){
    useEffect(() => {
        const ghost = async () => {
            const img = await JSON.parse(localStorage.getItem('video-user')).images;
            const v = await JSON.parse(localStorage.getItem('video-user'));
            setimg(img);
            setchange(v);
            const info = async () => {
                // const result = await fetch(`http://localhost:5000/users/${params}`);
                console.log(change._id)
                let data = await fetch(`http://localhost:5000/users/${v._id}`, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                data = await data.json();
                console.warn(data);
                setdata(data);
            }
            info();
        }
        ghost()
    }, [])

    // setimg(img);
    // }
    // const img = JSON.parse(localStorage.getItem("video-user")).images;
    // console.log(img);
    const info = async () => {
        // const result = await fetch(`http://localhost:5000/users/${params}`);
        const v = await JSON.parse(localStorage.getItem('video-user'));
        console.log(change._id)
        let data = await fetch(`http://localhost:5000/users/${v._id}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        data = await data.json();
        console.warn(data);
        setdata(data);
    }
    
    const logout = () => {
        localStorage.clear('video-user');
        navigate("/home")
        setvisible(false);
        info()
        setprof(false);
    }
    const searches = () => {
        const { search } = Value;
        fetch(`http://localhost:5000/search/${search}`).then((result) => {
            return result.json();
        }).then((resp) => {
            setresp(resp);
        });
    }
    const handleChange = async (e) => {
        setValue({ ...Value, [e.target.name]: e.target.value })
        const { search } = Value;
        fetch(`http://localhost:5000/search/${search}`).then((result) => {
            return result.json();
        }).then((resp) => {
            setresp(resp);
        });
    }
    const controler = ()=>{
        if(newcss){
            setnewcss(false)
        }else{
            setnewcss(true)
        }
    }
    const wrap=()=>{
        setnewcss(false)
        setvisible(false)
    }
    // console.log("working jod..", Value, resp);
    return (
        <div>
            {par?
        <NavContainer>
            <div className='navcon'>

                <div className='side-bar' >
                    <a onClick={controler}>
                    {newcss ? <i id={searchcss ? "jod" : ""} className="fa-sharp fa-solid fa-arrow-left"></i> : <i className="fa-solid fa-bars"></i>}</a>
                    <p style={{
                        fontSize:"14px"
                        ,color:"#ccc",
                        marginLeft:"1rem",
                        fontWeight:"400" ,
                        opacity:".8",
                        padding:"0, 0.5rem",
                        fontFamily:"Montserrat,Arial",
                        WebkitTextSizeAdjust:"none",
                    }}>Join <br/>now</p>
                    <NavLink to="/discord/discord">
                    <i style={{
                        background:"#6f85d5"
                    }} id="log"class="fab fa-discord"></i>
                    </NavLink>
                    <i style={{
                        background:"#08c"
                    }} id="log" class="fab fa-telegram-plane"></i>
                    <i style={{
                        background:"#ff3c1f"
                    }} id="log" class="fab fa-reddit-alien"></i>
                    <div className='none'>
                    <i style={{
                        background:"#1d9bf0"
                    }} id="log" class="fab fa-twitter"></i>
                    </div>
                </div>
                <div className='right'>
                    {/* <input className ="search"type="search" placeholder='search'/> */}
                    <i id={searchcss ? "jod" : "i"} className="fa-solid fa-magnifying-glass" onClick={() => { searchcss ? setsearchcss(false) : setsearchcss(true) }}></i>
                    {auth ?
                        <div className='img'>
                            <img src={img} onClick={() => { prof ? setprof(false) : setprof(true) }} />
                        </div>
                        : <button onClick={(e) => setvisible(true)}>
                            Login
                        </button>}
                    {prof ?
                        <div className='profile'>
                            <div className='component'>
                                <div className='name'>
                                    <h1>{data.username}</h1>
                                    <p>{data.email}</p>
                                </div>
                                <ul>
                                  <NavLink to={`/profile/${change._id}`} onClick={()=>{setprof(false)}}>  <a href={`/profile/${change._id}`}><li href><a><i className="fa-solid fa-user"></i>profile</a></li></a></NavLink>
                                    <li><a><i className="fa-solid fa-film"></i>continue Watching</a></li>
                                    <li><a><i className="fa-regular fa-rectangle-list"></i>watchlist</a></li>
                                    <NavLink to={'/post'}><li><a><i class="fa-solid fa-signs-post"></i>Post</a></li></NavLink>
                                </ul>
                            </div>
                            <div className='logout'>
                                <a onClick={logout}>logout <i className="fa-sharp fa-solid fa-arrow-right"></i></a>
                            </div>
                        </div> : ""}
                </div>
            </div>
            <div className={newcss || visible ? 'wrap' : ''} onClick={wrap}></div>
            <div className='maincontainer'>
                {/* <div className={data ? 'cross' : 'across'} onClick={(e) => setdata(false)}>
                        <i className="fa-solid fa-xmark"></i>
                    </div> */}

                {/* <Registration setvisible={setvisible} visible={visible} /> */}
                {visible?<JustPage setvisible={setvisible} visible={visible} info={info()}/>:""}
            </div>
            <div className={newcss ? 'side-items' : 'side-item'}>
                <nav>
                    <ul>
                        <li className="close" onClick={() => { newcss ? setnewcss(false) : setnewcss(true) }} style={{
                            background:"#5a6268",
                            color:"#ccc",
                            padding:"0.3rem",
                            borderRadius:"30px",
                        }}>
                          <i style ={{
                            fontWeight:"900",
                            margin:"0"
                          }}class="fas fa-angle-left mr-2" ></i> Close menu
                        </li>
                        <li onClick={wrap}>
                            <NavLink to ="/home">Home</NavLink>
                        </li>
                        <li onClick={wrap}>
                           <NavLink to ="/">About Us</NavLink>
                        </li>
                        <li onClick={wrap}>
                        <NavLink to ="/Dubbed">Dubbed Anime</NavLink>
                        </li>
                        <li onClick={wrap}>
                            <a>Movies</a>
                        </li>
                        <li onClick={wrap}>
                            <a>Horror</a>
                        </li>
                        {auth&&<li onClick={wrap}>
                            <NavLink to ="/upload">Upload</NavLink>
                        </li>}
                    </ul>
                </nav>
            </div>
            {searchcss ?
                <div>
                    <div className='searches'>
                        {/* <i className="fa-solid fa-magnifying-glass"></i>     */}
                        <input type="search" name='search' placeholder="Search...." onChange={(e) => handleChange(e)} />
                        <a href={`/search/${Value.search}`}><i onClick={searches} className="fa-solid fa-magnifying-glass"></i></a>

                    </div>
                    <div>
                        <div className='search-box'>
                            {resp.map((key, index) => {
                                return (
                                    <a href={"/videos/" + key._id}> <div className='card'>
                                        <img src={key.thumbnail} />
                                        <div>
                                            <h3>{key.title}</h3>
                                            <p>{key.description}</p>
                                            <p>{key.updatedAt}</p>
                                        </div>
                                    </div></a>
                                )
                            })}
                        </div>
                    </div>
                </div> : ""}
        </NavContainer>
        :""}
</div>
    )
}

export default Nav
const NavContainer = styled.div`
.navcon{
    background: #2a2c31 ;
display: flex;
justify-content: space-between;
/* position: fixed; */
z-index:1;
width: 100%;
}
/* padding-top: 25px; */
.across{
    background-color: white;
  color: black;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  transform:translate(0rem , 6rem);
  cursor: pointer;   
}
#log{
    font-size: 1rem;
    /* margin-top: 1rem; */
    margin-top: 0.3rem;
    margin-left: 0.5rem;
    text-align: center;
    justify-content: center;
    align-items: center;
    display: flex;
    height: 1rem;
    width: 1rem;
    background: #6f85d5;
    padding:1rem;
    border-radius: 50%;
}
#log:hover{
    color: white;
}
.cross{
    background-color: white;
  color: black;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  cursor: pointer;
}
.cross:hover{
background: #c8e763;
}
.maincontainer{
    display: flex;
    width: 100%;
    /* justify-content: center; */
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    /* width: 100vw; */
    /* background: #131324; */
}
button{
    padding: 0.6rem 1.2rem;
    border :0px;
    border-radius: 5px;
    background: #c8e763;
    cursor: pointer;
    margin:13px;
    height: 2.6rem;
}
.close:hover{
    background: red;
}
.side-bar{
    color:white;
    font-size: 2rem;
    margin: 13px;
    cursor: pointer;
    height: 100%;
    display: flex;
    z-index: 1000200;
    transition: 0.5s;
    margin-bottom: 0.5rem;
    
}
.side-bar i{
    opacity: 0.8;
}
/* .side-bar #log{
    opacity: 0.8;
} */
.side-bar i:hover{
    color:#c8e763;
    opacity: 10;
}
.side-item{
    background: #2a2c31;
    width:20rem;
    color: white;
    position: absolute;
    transform: translate(-350px);
    transition: 0.5s;
    position: absolute;
    height:70%;
    /* opacity: 1; */
z-index: 1000200;
}
.side-items{
    background: #2a2c31;
    width:15rem;
    color: white;
    position: absolute;
    transition: 0.5s;
    height: 70%;
    z-index: 1000200;
}
li{
    list-style: none;
    font-weight: 600;
}
li a{
    color: white;
    text-decoration: none;
}
li a :hover{
    color:#c8e763;
}
nav{
    padding:1rem;
    display: flex;
}
nav ul li{
display: block;
width: 100%;
border-bottom: 1px solid rgba(255,255,255,.05);
position: relative;
font-size: 14px;
padding-top: 2rem;
/* margin-top:1rem; */
cursor: pointer;
}
nav ul li:hover{
    width: 100%;
}
nav ul li:hover{
    color: #c8e763;
}
nav ul li a:hover{
    color: #c8e763;
}

img{
    height:3rem;
    width: 5rem;
}
.wrap{
    position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: rgba(32,33,37,.8);
z-index: 103;   
}
.search{
    margin-right: 1rem;;
    padding: 0.5rem;
}
#i{
    color:white;
    font-size: 1.5rem;
    cursor: pointer;
    /* transform: translate(-40px); */
    margin: 1rem;
    margin-top: 1.4rem;
margin-bottom: 0rem;
}
p{
    margin-top: 0.2rem;
}
#jod{
    color:#c8e763;
    font-size: 1.5rem;
    cursor: pointer;
    margin:1rem;
    margin-top: 1.4rem;
margin-bottom: 0rem;
}
.searches{
    background-color: #2a2c31;
    display: flex;
}
.searches input{
    width: 100%;
    padding:0.8rem;
    margin-left:2rem;
    border-radius: 0.5rem;
    outline: none;
    padding-right: 40px;
    color: #111;
    font-size: 14px;
    font-weight: 400;
    box-shadow: 0 3px 3px rgba(0,0,0,.05);
    margin-bottom: 0.5rem;
}
.searches i{
    /* margin:0.3rem 1rem ; */
    transform:translate(-30px , 12px);
    cursor: pointer;
    color: black;
}
.img img{
    border-radius: 50%;
    height: 2.5rem;
    width: 2.5rem;
}
.img{
    display: flex;
    margin:0.7rem ;
    margin-right: 1rem;
    cursor: pointer;
}
.right{
    display: flex;
}
.profile{
    position: absolute;
    margin-top:3.3rem ;
    background-color: #6c757d;
    overflow: hidden;
    width: 12rem;
    right: 2rem;
    border-radius: 0.5rem;
    z-index: 10;
}
  .profile ul{
        position: relative;
        left: 0%;
        display: block;
        padding: 0.5rem;
    }
.profile ul li{
cursor: pointer;
margin-top: 0.5rem;
background: #2a2c31;
padding: 0.5rem;
border-radius: 0.5rem;
width: 100%;
font-size: 0.6rem;
display: -webkit-box;
overflow: hidden;
line-clamp: 1;
/* color: #c8e763; */

    }
.profile ul li:hover{
        background: #4f515b;
        color: #c8e763;
    }
.component{
        background: #6c757d;
        position: relative;
    }
    .name{
        margin: 0.3rem;
    }
    .name h1{
        color: #c8e763;
    }
    .name p{
        font-size: 0.7rem;
        color: white;
    }
    .profile button{
        font-size: 0.5rem;
        padding: 0.5rem;
        background: transparent;
        color: white;
        margin: 0rem;
        position: relative;
        right: 0rem;
    }
    .logout a{
font-size: 0.8rem;
color: white;
margin: 0.5rem;
cursor: pointer;
    }
    .logout a:hover{
        color: #c8e763;
    }
    .logout{
        display: flex;
        justify-content: end;
    }
    i{
        margin-right:0.5rem ;
    }
    .search-box{
        background: #2a2c31;
        display:flex;
        flex-direction: column;
    }
    .card {
        margin:2.3rem;
        cursor: pointer;
        display:flex;
        color: white;
    }
    .card h3{
        margin-left:2rem;
        font-size: 0.9rem;
        display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  color: white;
    }
    .card p{
        margin-left:2rem;
        font-size:0.7rem;
        color:gray;
        display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
    }
    @media (max-width:469px){
        p{
            display: none;
        }
        .none{
display: none;
        }
    }
`