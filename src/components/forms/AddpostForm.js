import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../../redux/actions/postActions";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import alertify from "alertifyjs";
const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if(title===""||subtitle===""||content===""){
        alertify.error("post kaydetme eksik bilgi nedeni ile başarısız!",3);
      }else{
        const post = {
          title: title,
          subtitle: subtitle,
          content: content
        };
        dispatch(addPost(post));
        setTitle("");
        setSubtitle("");
        setContent("");
        alertify.success("post kaydedildi",3);
        window.location.href = "/posts";
      }
    } catch (error) {
      alertify.error(`kayıt Esnasında oluşan hata:${error}`,3);
    }
  };
   const clearAll = ()=>{
    setTitle("");
    setSubtitle("");
    setContent("");
    alertify.success("girdi temizleme başarılı",2);
  }
  return (
    <div style={{width:"80%",marginLeft:"10%",marginTop:"15%"}}>
      <h2 className="text-center" >Yeni Yazı Yayınla</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="title">Başlık</Label>
          <Input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="subtitle">Alt Başlık</Label>
          <Input
            type="text"
            name="subtitle"
            id="subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="content">İçerik</Label>
          <Input
            type="textarea"
            name="content"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </FormGroup>
        <Button color="danger" onClick={()=>clearAll()}>Vazgeç</Button>{"   "}
        <Button type="submit" color="primary" variant="outlined">
          yayınla
        </Button>
      </Form>
    </div>
  );
};

export default AddPostForm;
