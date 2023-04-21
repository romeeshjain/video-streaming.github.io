import { Box, Container,Text,TabList, Tab, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'
import styled from 'styled-components';
import Upload from '../component/upload/Upload';


const Uploads = () => { 
  return (

   <Containers>
      <Upload/>
    </Containers>
    
  )
}

export default Uploads;

const Containers = styled.div`
background-color: red;
`
