// import logo from './logo.svg';
import './App.css';
import Registration from './seperatepages/Registration';
import Nav from './component/Nav';
import { useState } from 'react';
import Footer from './component/footer';
import HomeVideos from './seperatepages/HomeVideos';
import Uploads from './seperatepages/Upload';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import VideoInfo from './seperatepages/VideoInfo';
import PlayVideo from './seperatepages/playVideo';
import BacktoTop from './component/BacktoTop';
import Profile from './seperatepages/Profile';
import FirstPage from './seperatepages/FirstPage';
import Search from './component/Search';
import styled from 'styled-components';
import Post from './component/Post';
import ReadMore from './component/ReadMore';
import Error from './component/Error';
import Dubbed from './seperatepages/Dubbed';
import JustPage from './seperatepages/justPage';
import Discord from './component/Discord';
import { useParams } from 'react-router-dom';
function App() {
  return (
    <div>
      <Class>      <Nav />
      {/* <JustPage/> */}
      {/* <BrowserRouter> */}
        <ChakraProvider>
          <Routes>
            <Route path='/upload' element={<Uploads />} />
            <Route path='/Home' element={<HomeVideos />} />
            <Route path='/playvideo' element={<PlayVideo />} />
            <Route path='/videos/:id' element={<VideoInfo/>} />
            <Route path='/profile/:id' element={<Profile/>} />
            <Route path='/' element={<FirstPage/>} />
            <Route path='/Search/:id' element={<Search/>} />
            <Route path='/post' element={<Post/>} />
            <Route path='/Readmore' element={<ReadMore/>} />
            <Route path="*" element={<Error/>} />
            <Route path='/Dubbed' element={<Dubbed/>}/>  
            <Route path="/discord/:id" element={<Discord/>}/>
          </Routes>
        </ChakraProvider>
      {/* </BrowserRouter> */}
      <BacktoTop/>
      <Footer />
      </Class>

    </div>
  );
}

export default App;
const Class =styled.div`
/* background: #202125; */
overflow: hidden;
font-family: Montserrat, Arial;
`
