import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FileBase64 from "react-file-base64";
import { Navigate } from "react-router-dom";
import { addPost } from "../../redux/actions/postActions";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import alertify from "alertifyjs";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (title === "" || content === "") {
        alertify.error("Post kaydetme eksik bilgi nedeni ile başarısız!", 3);
      } else {
        const post = {
          title: title,
          content: content,
          image: file,
        };
        dispatch(addPost(post));
        setTitle("");
        setContent("");
        alertify.success("Post kaydedildi", 3);
        setRedirectToHome(true);
      }
    } catch (error) {
      alertify.error(`Kayıt esnasında oluşan hata: ${error}`, 3);
    }
  };

  const clearAll = () => {
    setTitle("");
    setContent("");
    setFile(null);
    alertify.success("Girdi temizleme başarılı", 2);
  };

  return (
    <div style={{ width: "80%", marginLeft: "10%", marginTop: "15%" }}>
      <h2 className="text-center">Yeni Yazı Yayınla</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="title">İsim</Label>
          <Input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="content">Yazı</Label>
          <Input
            type="textarea"
            name="content"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="file">Görsel</Label>
          <FileBase64 multiple={false} onDone={({ base64 }) => setFile(base64)} />
        </FormGroup>
        <Button color="danger" onClick={() => clearAll()}>
          Vazgeç
        </Button>{" "}
        <Button type="submit" color="primary" variant="outlined">
          Yayınla
        </Button>
      </Form>
    </div>
  );
};

export default AddPostForm;
