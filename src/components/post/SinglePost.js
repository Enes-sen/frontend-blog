import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSinglePost, removePost } from "../../redux/actions/postActions";
import moment from "moment";
import {
Card,
CardBody,
CardHeader,
CardText,
Button,
CardImg,
Badge,
} from "reactstrap";
import noImage from "../../images/download.png";
import CommentList from "./CommentList";

const SinglePost = () => {
const { id } = useParams();
const dispatch = useDispatch();
const currentPost = useSelector((state) => state.posts.currentPost);
const postId = id;

useEffect(() => {
dispatch(fetchSinglePost(id));
}, [dispatch, id]);

const convertRelativeTime = (date) => {
return moment(date).fromNow();
};

const handleDelete = () => {
if (window.confirm("Bu gönderiyi silmek istediğinize emin misiniz?")) {
dispatch(removePost(currentPost._id));
window.location.href="/";
}
};

if (!currentPost) {
return <div>Loading...</div>;
}

return (
<div style={{
display: "flex",
flexDirection: "column",
alignItems: "center",
width: "100%",
maxWidth: "1200px", /* istediğiniz genişliği belirleyebilirsiniz */
margin: "0 auto",
padding: "0 15px",
}}>
<Card style={{ width: "90%", marginTop: "7%" }}>
<CardHeader tag={"h1"}>{currentPost.title}</CardHeader>
<CardImg alt="Card image cap" src={currentPost.image || noImage} style={{height:"60%",width:"70%" }}/>
<CardBody>
<Badge color="primary">
{convertRelativeTime(currentPost.date)}
</Badge>
<CardText>{currentPost.content}</CardText>
<div
style={{
display: "flex",
justifyContent: "center",
marginTop: "20px",
}}
>
<Button color="danger" onClick={handleDelete}>
Kaldır
</Button>
</div>
</CardBody>
</Card>
<CommentList postId={postId} />
</div>
);
};

export default SinglePost;
