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
import noImage from "../../images/download.png";

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
      className="Container-fluid"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {posts
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((post) => (
          <Card className="my-2" style={{ width: "100%", margin: "10px", padding: "10px" }}>
            <CardImg
              alt="Card image cap"
              src={post.image||noImage}
              style={{
                height: "10%"
              }}
              top
              width="100%"
            />
            <CardBody>
              <CardTitle tag="h5">{post.title}</CardTitle>
              <CardText>
                {post.content}
              </CardText>
              <CardText>
                <Badge color="primmary">{convertRelativeTime(post.date)}</Badge>
              </CardText>
               <Link className="btn btn-primary"  to={`/posts/${post._id}`}>
               daha fazla
               </Link>
            </CardBody>
          </Card>
        ))}
    </div>
  );
};

export default PostsList;
