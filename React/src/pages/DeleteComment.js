import React, { useState } from 'react';
import { toast } from 'react-toastify';

import Container from 'react-bootstrap/Container'
import Form      from 'react-bootstrap/Form';
import Button    from 'react-bootstrap/Button';

const DeleteComment = () => {
    const [ id, setId ] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:3001/api/comments/delete', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                id,
            }),
        })
        .then((result) => {
            return result.json();
        })
        .then(({ status, extra }) => {
            if (status === "OK") {
                setId("");
                toast.success("L'article à bien été supprimé");
            } else {
                toast.error(
                    <div>
                        Oups... Nous avons eu une erreur !<br />
                        {extra}
                    </div>
                );
            }
        })
        .catch((error) => {
            toast.error("Oups... Nous avons eu une erreur !");
            console.log(error);
        });
    }

    const handleChange = (event) => {
        switch (event.target.name) {
            case "id":
                setId(event.target.value);
                break;
            // no default
        }
    }
    return(
        <Container>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="comment.id">
                <Form.Label>Comment id</Form.Label>
                <Form.Control
                    type= "number"
                    name= "id"
                    onChange={handleChange}
                    value={id}
                />
            </Form.Group>
            <Button variant="outline-danger" type="submit" value="submit">Delete Comment</Button>
        </Form>
        </Container>
    );
}

export default DeleteComment;