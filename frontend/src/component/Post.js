import React,{useState , useEffect} from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import {useToast} from '@chakra-ui/react'
import axios from 'axios';
const Post = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [userid , setuserid] =useState(""); 
    const [resp , setresp]=useState("");
    const [post , setpost]=useState(true);
    const [Values, setValues] = useState({
      title: "",
      description: "",
      hashtags:"",
    });
    useEffect(()=>{
const data = ()=>{
  const info = JSON.parse(localStorage.getItem("video-user")); 
  setinfo(info);
  setuserid( info._id);
  if(!info){
    navigate("/");
  }
}
const load = async()=>{
  // fetch("http://localhost:5000/post").then(
  //     resp=>resp.json
  //     ).then(
  //         e=>{
  //             setresp(e);
  //         }
  // )
  setpost(false);
  const info = JSON.parse(localStorage.getItem("video-user")); 
  let result = await fetch(`http://localhost:5000/post/${info._id}` ,{
  method:"get",
  headers:{'Content-Type':"application/json"}
})
result = await result.json();
setresp(result);
console.log(result , userid);
if(result){
setpost(true);
}
}
load();
data();
console.log(info);
    },[])
    const [info , setinfo]=useState("");
    const [loading,setLoading]=useState(false);
    const [onclick , setonclick]=useState(false);
    const toaster = {
      position: "bottom-right",
      autoClose: 8000,
      pauseonHover: true,
      dragable: true,
      theme: "dark",
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (handleValidation()) {
        setLoading(true);
        const { hashtags, description, title } = Values;
        const {images,username ,_id ,}=info;
        const { data } = await axios.post("http://localhost:5000/post", {
          title,
          description,
          hashtags,
          username,
          images,
          userid,
        });
        if (data.status === false) {
          toast({
            title:"Wrong info Bro",
      status:"warning",
      duration:5000,
      isClosable:true,
      position:"bottom",
        })
        }
        console.log(data.result);
        if (data.status === true) {
          toast({
            title:"Done Bro",
      status:"success",
      duration:5000,
      isClosable:true,
      position:"bottom",
        })
        }
        setLoading(false);
      }
    }
    console.log(Values)
    const handleValidation = () => {
      const { description, title } = Values;
       if ( title=== "") {
        toast({
    title:"Please title bro don't make me fool",
    status:"warning",
    duration:5000,
    isClosable:true,
    position:"bottom",
      })
        return false;
      }
      else if(description===""){
        toast({
          title:"Please describe bro don't make me fool",
    status:"warning",
    duration:5000,
    isClosable:true,
    position:"bottom",
      })
      return false;
      }
      return true;
    };
    const handleChange = async (e) => {
        setValues({ ...Values, [e.target.name]: e.target.value })
      }
      const deleteUser = async(id)=>{
        alert("record deleted");
    console.warn(id);
    const result = await fetch(`http://localhost:5000/plot/${id}`,{
      method:"Delete"
    });
    result = await result.json();
    if(result.status){
      alert("record is deleted");
    }   
      }

      const load = async()=>{
        // fetch("http://localhost:5000/post").then(
        //     resp=>resp.json
        //     ).then(
        //         e=>{
        //             setresp(e);
        //         }
        // )
        setpost(false);
        const info = JSON.parse(localStorage.getItem("video-user")); 
        let result = await fetch(`http://localhost:5000/post/${info._id}` ,{
        method:"get",
        headers:{'Content-Type':"application/json"}
      })
      result = await result.json();
      setresp(result);
      console.log(result , userid);
      if(result){
      setpost(true);
      }
      }  
  return (
    <>
    <ClickBox>
      <a onClick={()=>onclick?setonclick(false):setonclick(true)}>
    <div class="switch-button">
    <input class="switch-button-checkbox" type="checkbox"></input>
    <label class="switch-button-label" for=""><span class="switch-button-label-span">My post</span></label>
  </div>
  </a>
    </ClickBox>
    {onclick?<Container>
  <form action="" onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src="/Image/logo.png" />
            <h1>NEW UCHIHA Post </h1>
          </div>
          <span>Title</span>
          <input type='text' name='title' placeholder="Title" onChange={(e) => handleChange(e)} />
          <span>Description</span>
          <textarea type='text' name='description' placeholder="Description" onChange={(e) => handleChange(e)}/>
          <span>Hashtags</span>
          <input type='text' name='hashtags' placeholder="Hashtags" onChange={(e) => handleChange(e)} />
          <button type="submit">{loading?"loading" :"Post Ghost Gang"}</button>
          <span>
            Aleready Joined a uchiha gang? <a to="/">Home</a>
          </span>
        </form>
      </Container>:
      <SiteInfo>
        {post?
                    <div className='trend'>
                    <div className='main-info'><h2>Your Post</h2> <a onClick={load}><i class="fa-solid fa-rotate-left" style={
                        {
                            marginLeft:"1rem",
                            cursor:"pointer",               
                        }}></i></a></div>
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
                                    <div onClick={()=>deleteUser(key._id)} className='trash'>
                                    X 
                                    </div>
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
            
            
                    </div>:<div className='postbro'><p>404 Error Bro</p>
                    <img src={"/Image/error.png"}></img>
                    <button onClick={()=>setonclick(true)}>Backend on karle Post Bro </button>
                    </div>}
                </SiteInfo>}
    </>
  )
}

export default Post
const PostContainer=styled.div`
color: white;
min-height: 60vh;
background: #202125 ;
display: flex;
justify-content: center;
`
const Container = styled.div`
.pas{
  display:flex;
  width:100%;
}
i{
  transform: translate(-30px,20px);
  cursor:pointer;
  color:white;
}
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color:  #202125;
  padding: 1rem 0rem;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 2rem 3rem 2rem 3rem;
  }
  input {
    background-color: transparent;
    padding: 0.5rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    outline: none;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  /* @media (max-width: ;) {
    
  } */
  textarea{
    background-color: transparent;
    padding: 0.5rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    height: 5rem;
    outline: none;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 0.5rem ;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }

  .switch-button {
  background: rgba(0, 0, 0, 0.463);
  border-radius: 30px;
  overflow: hidden;
  width: 240px;
  text-align: center;
  font-size: 18px;
  letter-spacing: 1px;
  color: #155FFF;
  position: relative;
  padding-right: 120px;
  position: relative;

  &:before {
    content: "Add Post";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
    pointer-events: none;
  }

  &-checkbox {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 2;

    &:checked + .switch-button-label:before {
      transform: translateX(120px);
      transition: transform 300ms linear;
    }

    & + .switch-button-label {
      position: relative;
      padding: 15px 0;
      display: block;
      user-select: none;
      pointer-events: none;

      &:before {
        content: "";
        background: rgba(255, 255, 255, 0.05);;
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 30px;
        transform: translateX(0);
        transition: transform 300ms;
      }

      .switch-button-label-span {
        position: relative;
      }
    }
  }
}

    `
const SiteInfo = styled.div`
display: flex;
color:white;
background: #202125;
.info{
    display: flex;
    padding:0.5rem;
}
.heading h1{
    font-size: 1.5rem;
    font-weight: 600;
}
h2{
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  color: rgb(202, 233, 98);;
}
.heading p{
    font-size: 0.9rem;
    color:#ccc;
    margin-top: 1rem;
}
.trash{
  transform: translate(71px ,-43px);
  font-weight: 600;
}
.trash:hover{
  color:red;
  cursor: pointer;
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
    margin-right:1rem;
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

.postbro{
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  width: 100%;
  margin:3rem;
}
.postbro img{
  height: 20rem;
  width: 20rem;
}
.postbro button{
  width:50%
}
`

const ClickBox = styled.div`
background-color: rgb(32, 33, 37);;
display: flex;
justify-content: center;
padding-top: 1rem;
.switch-button {
  background: rgba(0, 0, 0, 0.463);
  border-radius: 30px;
  overflow: hidden;
  width: 240px;
  text-align: center;
  font-size: 18px;
  letter-spacing: 1px;
  color: #155FFF;
  position: relative;
  padding-right: 120px;
  position: relative;

  &:before {
    content: "Add Post";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
    pointer-events: none;
  }

  &-checkbox {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 2;

    &:checked + .switch-button-label:before {
      transform: translateX(120px);
      transition: transform 300ms linear;
    }

    & + .switch-button-label {
      position: relative;
      padding: 15px 0;
      display: block;
      user-select: none;
      pointer-events: none;

      &:before {
        content: "";
        background: rgba(255, 255, 255, 0.05);;
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 30px;
        transform: translateX(0);
        transition: transform 300ms;
      }

      .switch-button-label-span {
        position: relative;
      }
    }
  }
}

`