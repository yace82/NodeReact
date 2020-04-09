import React, { useState } from 'react';
import { toast } from 'react-toastify';

import Container from 'react-bootstrap/Container'
import Form      from 'react-bootstrap/Form';
import Button    from 'react-bootstrap/Button';


const CreateComment = () => {
    const [ articleId, setArticleId ] = useState("");
    const [ content, setContent ] = useState("");
    const [ author, setAuthor ] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:3001/api/comments/create', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                articleId,
                content,
                author,
            }),
        })
        .then((result) => {
            return result.json();
        })
        .then(({ status, extra }) => {
            if (status === "OK") {
                setArticleId("");
                setContent("");
                setAuthor("");
                toast.success("Le commentaire à bien été posté");
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
            case "articleId":
                setArticleId(event.target.value);
                break;
            case "content":
                setContent(event.target.value);
                break;
            case "author":
                setAuthor(event.target.value);
                break;
            // no default            
        }
    }

    return (
        <Container>            
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="article.id">
                    <Form.Label>articleId</Form.Label>
                    <Form.Control
                        type="number"
                        name="articleId"
                        onChange={handleChange}
                        value={articleId}
                    />
                </Form.Group>
                <Form.Group controlId="comment.content">              
                    <Form.Label>comment content</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="content"
                        onChange={handleChange}
                        value={content}
                    /> 
                </Form.Group>
                <Form.Group controlId="comment.author">             
                    <Form.Label>author id</Form.Label>
                    <Form.Control
                        type="number"
                        name="author"
                        onChange={handleChange}
                        value={author}
                    />
                </Form.Group> 
                <Button variant="outline-success" type="submit" value="submit">Create comment</Button>
            </Form>
        </Container>    
    );
};

export default CreateComment