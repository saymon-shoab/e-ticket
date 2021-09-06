import React, { useContext } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import {  useForm } from "react-hook-form";
import { UserContext } from '../../../App';
import  toast, { Toaster } from 'react-hot-toast';
const Search = () => {
    const { register, handleSubmit } = useForm();
    const {search, setSearch } = useContext(UserContext);

   const onSubmit = data => {
    const loading = toast.loading('Please wait...');
    toast.dismiss(loading);
       console.log(data)
        data.isSearched = true;
        setSearch(data)
        // toast('search result');
    }
    
    // const notify = () => toast('Here is your toast.');
    return (
        <>
      
           <Card className="mt-5" style={{ background: "#ecf0f159", borderRadius: "10px" }}>
                <Card.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group>
                            <Form.Label>Pick From</Form.Label>
                            <Form.Control className="shadow-none"  {...register("pickFrom")} defaultValue={search.pickFrom}    type="text" placeholder="From" required  />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Pick To</Form.Label>
                            <Form.Control className="shadow-none"  {...register("pickTo")} defaultValue={search.pickTo}  type="text" placeholder="To" required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Date</Form.Label>
                            <Form.Control className="shadow-none"  {...register("date")} defaultValue={search.date} type="date" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>time</Form.Label>
                            <Form.Control className="shadow-none"  {...register("time")} defaultValue={search.time} type="time" />
                        </Form.Group>
                        <Button variant="primary"  className="shadow-none" type="submit" block>
                            Search
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
         
            <div><Toaster  position="top-center" reverseOrder={false} /></div>
    </>
    );
};

export default Search;