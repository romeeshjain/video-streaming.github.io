import React, { useState } from 'react';
import styled from "styled-components";
import ReCAPTCHA from 'react-google-recaptcha';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {useToast} from '@chakra-ui/react'
const Registration = ({setvisible , visible}) => {
  // const auth = JSON.parse(localStorage.getItem('video-user')).images;
  // console.log(auth ,"working");
  const navigate = useNavigate;
  function onChanges(value) {
    console.log("Captcha value:", value);
  }
  // console.log(visible);

  const[reg , setreg]=useState(true);
  const[show , setshow]=useState(true);
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toaster = {
    position: "bottom-right",
    autoClose: 8000,
    pauseonHover: true,
    dragable: true,
    theme: "dark",
  }
  const [images , setImages]=useState("");
  const [loading,setLoading]=useState(false);
  const toast = useToast();
  const handleChange = async (e) => {
    setValues({ ...Values, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username, email, password } = Values;
      const { data } = await axios.post("http://localhost:5000/register", {
        username,
        email,
        password,
        images
      });
      if (data.status === false) {
        toast.error("galat information", toaster)
      }
      // console.log(data.result);
      if (data.status === true) {
        localStorage.setItem("video-user", JSON.stringify(data.result));
        navigate("/");
        setvisible(false);
      }
    }
  }
  const newset=()=>{
    setshow(false);
  }

  const postDetails=(pics)=>{
    setLoading(true);
    if(pics===undefined) {
        return;
    }
    //pics.type==="image/jpeg" || pics.type==="image/png"
    if(pics) {
        const data = new FormData();
        // console.log(data);
        data.append("file",pics);
        data.append("upload_preset","UserImage");
        data.append("cloud_name","degkaauzc");
        fetch("https://api.cloudinary.com/v1_1/degkaauzc/image/upload", {
            method:"post", 
            body:data,
        }).then((res) => res.json())
        .then(data => {
          setImages(data.url.toString());
            console.log(data.url.toString(),"working"); 
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        })
    } else {
        setLoading(false);
        return;
    }
  }
// console.log(Values);
  const handleValidation = () => {
    const { password, confirmPassword, username, email } = Values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toaster
      );
      return false;
    }
    if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toaster
      );
      return false;
    } else if (password.length < 3) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toaster
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toaster);
      return false;
    }
    return true;
  };
  return (
    <div> {visible?
       <Signup>
      <div className='regContainer'>
  <div className='cross' onClick={(e) => setvisible(false)}>
  <i className="fa-solid fa-xmark"></i>
  </div>
  <div className='cover'>
 {reg?
 <div>
 <div className='heading'>
  <h5> create your own account</h5>
</div>
<form action="" onSubmit={(e) => handleSubmit(e)}>
<div className='conatainer'>
<label>Your name</label>
  <input name="username" type="text" onChange={(e) => handleChange(e)}/>
  <label>Email</label>
  <input name="email" type="text" onChange={(e) => handleChange(e)}/>
  <label>Password</label>
  <input name="password"  type="password" onChange={(e) => handleChange(e)}/>
  <label>Confirm Password</label>
  <input name="confirmPassword" type="password" onChange={(e) => handleChange(e)}/>
  <label>upload profile pic</label>
  <input type="file"
            p={1.5}
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}/>
</div>
<div className='but'>
  <button type="submit">{loading?"loading" :"Create User"}</button>
  <p>Have an account ? <a onClick={(e)=>setreg(false)}>Login</a></p>
</div>
</form>
</div>
:<div>
  <div className='heading'>
  <h5> Create an account</h5>
</div>
<form>
<div className='conatainer'>
  <label>Email</label>
  <input type="text"/>
  <label>Password</label>
  <input type="Password"/>
  <ReCAPTCHA
    sitekey="Your client site key"
    onChange={onChanges}
  />
</div>
<div className='but'>
  <button onClick={(e)=> setvisible(false)}>
    Submit
  </button >
  <p>Don't have account ?<a onClick={(e)=>setreg(true)}>Register</a></p>
</div>
</form>
   </div>}
</div>
</div>
    </Signup>
    :""}
    </div>

  )
}

export default Registration

const Signup = styled.div`
margin:2rem;
display:flex;
justify-content: center;
align-items: center;
z-index: 1000200;
transition: 1s;
.regContainer{
  color:white;
  display: flex;
  border-radius: 1rem;
  justify-content: center;
  background-image: url("https://www.cartoonbrew.com/wp-content/uploads/2020/10/demon_slayer_mugen.jpg") ;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1000200;
  transition: 1s;
}
label{
  margin-bottom:0.5rem;
  color: grey;
}
/* input{
  margin-bottom: 1rem;
  font-size:13px;
  padding:0.5rem;
  width:20rem;
  outline: none;
  color: black;
} */
a{
  color: #c8e763;
  text-decoration: none;
  cursor: pointer;
}
  .conatainer{
    display: flex;
    flex-direction: column;
  }
  .heading{
    text-align: center;
  }
  h5{
    font-size: 20px;
  }
  .cover{
    height: 100%;
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 1rem;
    padding:0rem 5rem;
    background-color: rgba(19, 19, 36, 0.7);
  }
  .but{
    text-align: center;
  }
  button{
    width:15rem;
    padding:0.5rem;
    background: #c8e763;
    border:none;
    border-radius: 5px;
    margin:0.5rem;
    cursor: pointer;
  }
i{
/* transform: translate(20px 30px); */
font-size: 1.5rem;
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
  transform:translate(0rem , -1rem);
  cursor: pointer;
}
.cross:hover{
background: #c8e763;
}

`