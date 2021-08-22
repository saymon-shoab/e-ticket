import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { UserContext } from '../../../App';
import Map from '../../Map/Map';
import Search from '../Search/Search';
import SearchResult from '../SearchResult/SearchResult';

const Destination = () => {
    const { search } = useContext(UserContext);

    return (
        <Container>
        <Row>
            <Col xs={12} md={4}>
                {search.isSearched ? <SearchResult/> : <Search />}
               
            </Col>
            <Col xs={12} md={8}>
               <Map />
            </Col>
        </Row>
  </Container>
   ) 
};

export default Destination;