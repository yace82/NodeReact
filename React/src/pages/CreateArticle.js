import React, { useState } from 'react';
import { toast } from 'react-toastify';

import Container from 'react-bootstrap/Container';
import Form      from 'react-bootstrap/Form';
import Button    from 'react-bootstrap/Button';

const CreateArticle = () => {
    const [ title,   setTitle   ] = useState("");
    const [ content, setContent ] = useState("");
    const [ author,  setAuthor  ] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:3001/api/articles/create', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                title,
                content,
                author,
            }),
        })
        .then((result) => {
            return result.json();
        })
        .then(({ status, extra }) => {
            if (status === "OK") {
                setTitle("");
                setContent("");
                setAuthor("");
                toast.success("L'article à bien été ajouté");
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
    };

    const handleChange = (event) => {
        switch(event.target.name) {
            case "title":
                setTitle(event.target.value);
                break;
            case "content":
                setContent(event.target.value);
                break;
            case "author":
                setAuthor(event.target.value);
                break;
            // no default
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="article.title">
                    <Form.Label>Titre de l'Article</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        onChange={handleChange}
                        value={title}
                    />
                </Form.Group>
                <Form.Group controlId="article.content">
                    <Form.Label>Contenu de l'Article</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="content"
                        onChange={handleChange}
                        value={content}
                    />
                </Form.Group>
                <Form.Group controlId="article.author">
                    <Form.Label>id de l'auteur</Form.Label>
                    <Form.Control
                        type="number"
                        name="author"
                        onChange={handleChange}
                        value={author}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Créer l'article</Button>
            </Form>
        </Container>
    );
};

export default CreateArticle;
