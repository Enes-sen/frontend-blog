import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/actions/postActions";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardText,
  CardImg,
  Badge,
} from "reactstrap";
import noImage from ="../../image/download.png";

const PostsList = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const convertRelativeTime = (date) => {
    return moment(date).fromNow(); // tarihi "x zaman önce" formatında döndürür
  };

  useEffect(() => {
    dispatch(fetchPosts())
      .then(() => setLoading(false))
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (!Array.isArray(posts)) {
    return <div>Gösterilecek gönderi yok</div>;
  }
  return (
    <div
      className="Container"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginLeft: "5px",
        marginTop: "%10",
        height: "fit-content",
        width: "fit-content",
      }}
    >
      {posts
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((post) => (
          <Card
            className="Container-fluid mt-5"
            key={post._id}
            style={{
              margin: "5px",
              padding: "10px",
              minWidth: "250px",
              minHeight: "250px",
            }}
          >
             <CardImg alt="Card image cap"src={post.image || noImage}topwidth="100%"/>
            <CardBody>
              <Badge color="primary">{convertRelativeTime(post.date)}</Badge>
              <CardTitle tag="h1">{post.title}</CardTitle>
              <CardSubtitle tag="h6">{post.subtitle}</CardSubtitle>
              <CardText>{post.content?.substring(0, 500) + "..."}</CardText>
              <Link className="btn btn-primary" to={`/posts/${post._id}`}>
                devamını oku...
              </Link>
            </CardBody>
          </Card>
        ))}
    </div>
  );
};

export default PostsList;
