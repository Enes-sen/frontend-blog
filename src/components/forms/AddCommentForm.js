import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../redux/actions/postActions";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import alertify from "alertifyjs";

const AddCommentForm = ({ postId }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (name === "" || comment === "") {
        alertify.error("Yorum kaydetme eksik bilgi nedeni ile başarısız!", 3);
      } else {
        const newComment = {
          name: name,
          comment: comment,
          postId:postId
        };
        dispatch(addComment(newComment,postId));
        setName("");
        setComment("");
        alertify.success("Yorum kaydedildi", 3);
        window.location.reload();
      }
    } catch (error) {
      alertify.error(`Kayıt esnasında oluşan hata: ${error}`, 3);
    }
  };

  return (
    <div style={{ width: "80%", marginLeft: "10%", marginTop: "5%" }}>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">İsim</Label>
          <Input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="comment">Yorum</Label>
          <Input
            type="textarea"
            name="comment"
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </FormGroup>
        <Button type="submit" color="primary" variant="outlined">
          Gönder
        </Button>
      </Form>
    </div>
  );
};

export default AddCommentForm;
