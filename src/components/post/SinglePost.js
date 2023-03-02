import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams,} from "react-router-dom";
import { fetchSinglePost, removePost } from "../../redux/actions/postActions";
import EditPostForm from "../forms/EditPostForm";
import moment from "moment";
import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Button,
  CardImg,
  Badge,
} from "reactstrap";
import noImage from "../../images/download.png";

const SinglePost = () => {
  const { id } = useParams();
  const [openEdit, setOpenEdit] = useState(false);
  const dispatch = useDispatch();
  const currentPost = useSelector((state) => state.posts.currentPost);

  useEffect(() => {
    dispatch(fetchSinglePost(id));
  }, [dispatch, id]);
  const convertRelativeTime = (date) => {
    return moment(date).fromNow(); // tarihi "x zaman önce" formatında döndürür
  };
  const handleDelete = () => {
    if (window.confirm("Bu gönderiyi silmek istediğinize emin misiniz?")) {
      dispatch(removePost(currentPost._id));
      window.location.href="/";
    }
  };

  const handleEditOpen = () => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
    window.location.replace("/");
  };

  if (!currentPost) {
    return <div>Loading...</div>;
  }
  return (
    <div className="Container-fluid mt-5" style={{ display: "flex", justifyContent: "center" }}>
      {openEdit ? (
        <EditPostForm post={currentPost} close={handleEditClose} />
      ) : (
        <Card style={{ width: "90%", marginTop: "7%" }}>
        
          <CardHeader tag={"h1"}>{currentPost.title}</CardHeader>
          <CardImg alt="Card image cap"src={currentPost.image || noImage} style={{height:"60%",width:"70%" }}/>
          <CardBody style={{ display: openEdit ? "none" : "block" }}>
            <Badge color="primary">
              {convertRelativeTime(currentPost.date)}
            </Badge>
            <CardTitle tag="h6">{currentPost.subtitle}</CardTitle>
            <CardText>{currentPost.content}</CardText>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Button
                color="primary"
                style={{ marginRight: "2%" }}
                onClick={handleEditOpen}
              >
                düzenle
              </Button>
              <Button color="danger" onClick={handleDelete}>
                Kaldır
              </Button>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default SinglePost;
