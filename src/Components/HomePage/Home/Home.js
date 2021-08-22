import React from 'react';
import { Container } from 'react-bootstrap';
import TicketsData from '../TicketsData/TicketsData';
import './Home.css'
const Home = () => {
    return (
        <div className="">
            <Container>
            <TicketsData></TicketsData>
            </Container>
           
         </div>
    );
};

export default Home;