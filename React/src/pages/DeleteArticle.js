import React, { useState } from 'react';
import { toast } from 'react-toastify';

import Container from 'react-bootstrap/Container';
import Form      from 'react-bootstrap/Form';
import Button    from 'react-bootstrap/Button';

const DeleteArticle = () => {
    const [ id, setId ] = useState(""); // let id = "";

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:3001/api/articles/delete', {
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

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="article.id">
                    <Form.Label>Id de l'Article à supprimer</Form.Label>
                    <Form.Control
                        type="number"
                        name="id"
                        onChange={handleChange}
                        value={id}
                    />
                </Form.Group>
                <Button type="submit" >Supprimer l'Article</Button>
            </Form>
        </Container>
    );
}

export default DeleteArticle;
