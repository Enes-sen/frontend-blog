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
   moment.locale('tr');
   return moment(date).format('lll');
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
    className="Container-fluid mt-5"
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative", // set position to relative
      marginTop: "45%",
      marginBottom: "160px",
      height: "600px",
      width: "80%", // set width
      margin: "0 auto",
    }}
  >
    {/* map over the posts */}
    {posts
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map((post, index) => (
        <React.Fragment key={index}>
          <Card className="mt-5" style={{ width: "100%",  margin: "0 auto", marginTop:"200px",marginBottom:"200px", padding: "10px" }}>
            <CardImg
              alt="Card image cap"
              src={post.image || noImage}
              style={{
                height: "600px",
              }}
              top
              width="100%"
            />
            <CardBody>
              <CardTitle tag="h5">{post.title}</CardTitle>
              <Badge color="primary">{convertRelativeTime(post.date)}</Badge>
              <CardText>{post.content}</CardText>
              <Link className="btn btn-primary" to={`/posts/${post._id}`}>
                daha fazla
              </Link>
            </CardBody>
          </Card>
          {index < posts.length - 1 && <div style={{ height: "50px" }}></div>}
          {/* add space between posts */}
        </React.Fragment>
      ))}
  </div>
 );
};

export default PostsList;
