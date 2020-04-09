import React from 'react';
import Nav   from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';



const Navigation = () => {
    return (
        <Nav className="nav nav-pills nav-justified" variant="pills">
            <Nav.Item>
                <Nav.Link as ={NavLink} exact={true} to="/">Accueil</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as ={NavLink} to="/articles/create">Create an article</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as ={NavLink} to="/articles/delete">Delete an article</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as ={NavLink} to="/comments/create">Create a comment</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as ={NavLink} to="/comments/delete">Delete a comment</Nav.Link>
            </Nav.Item>
      </Nav>
    );
}

export default Navigation;
