import { useMutation, gql } from "@apollo/client";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!) {
    postCreate(post: { title: $title, content: $content }) {
      userErrors {
        message
      }
      post {
        id
        title
        createdAt
        content
        user {
          name
        }
      }
    }
  }
`;

export default function AddPostModal({ onAdd }) {
  const [show, setShow] = useState(false);

  const handleVisible = () => {
    setShow((prev) => !prev);
  };

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const [addPost, { data, loading }] = useMutation(CREATE_POST);

  const handleAdd = () => {
    addPost({
      variables: {
        title,
        content,
      },
    }).then((res) => {
      onAdd(res.data.postCreate.post);
      setTimeout(() => {
        handleVisible();
        setContent("");
        setTitle("");
      }, 500);
    });
  };

  return (
    <>
      <Button variant="primary" onClick={handleVisible}>
        Add Post
      </Button>

      <Modal
        show={show}
        onHide={handleVisible}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleVisible}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
