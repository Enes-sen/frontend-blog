import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import FileBase64 from "react-file-base64";
import { updatePost } from "../../redux/actions/postActions";
import {useParams} from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import alertify from "alertifyjs";

const EditPostForm = ({ post: initialPost, close }) => {
  const  {id}  = useParams();
  const postId = id; // correct variable name
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  

  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(initialPost.title);
    setContent(initialPost.content);
  }, [initialPost]);
  
  const [file, setFile] = useState(initialPost?.image);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (title === "" || subtitle === "" || content === "") {
        alertify.error(
          "Post kaydetme eksik bilgi nedeni ile başarısız!",
          3
        );
      } else {
        const updatedPost = {
          id: postId, // use the correct variable name
          title: title,
          content: content,
          image: file,
        };
        if(JSON.stringify(updatedPost)===JSON.stringify({})){ // check if the object is empty correctly
          alertify.error("error occurred",2);
          close(); 
        } else {
          dispatch(updatePost(id,updatedPost));
          alertify.success("Post güncellendi", 3);
          window.location.href="/";
          close();
        }
      }
    } catch (error) {
      alertify.error(`Güncelleme esnasında oluşan hata: ${error}`, 3);
    }
  };

  const clearAll = () => {
    setTitle("");
    setSubtitle("");
    setContent("");
    close();
    window.location.href="/";
    alertify.success("Girdi temizleme başarılı", 2);
  };
   
  return (
    <div className="container-fluid mt-3" style={{width:"80%",marginLeft:"10%"}}>
      <h2 className="text-center">Yazıyı Düzenle</h2>
      <Form onSubmit={handleSubmit} >
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
        <FileBase64 multiple={false} onDone={({ base64 }) => setFile(base64)} />
        <Button color="danger" onClick={() => clearAll()}>
          Kapat
        </Button>{"   "}
        <Button type="submit" color="primary">
          Güncelle
        </Button>
      </Form>
    </div>
  );
};

export default EditPostForm;
