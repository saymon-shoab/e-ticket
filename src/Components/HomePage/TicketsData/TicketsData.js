import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Tickets from '../Tickets/Tickets';
import fakeData from './../../../FakeData/FakeData.json'
const TicketsData = () => {
    const [ticketInfo , setTicketInfo]=useState([])
    useEffect(()=>{
        setTicketInfo(fakeData)
    },[])

    return (
        <Container className="mt-5 d-flex align-items-center" style={{minHeight: "80vh"}}>
                <Row>
                    {
                        ticketInfo.map(tickets => <Tickets key={tickets.id} tickets={tickets} />)
                    }
                </Row>
         </Container>
    );
};

export default TicketsData;