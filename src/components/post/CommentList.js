import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostComments } from "../../redux/actions/postActions";
import { Card, CardBody, CardTitle, CardText, Badge } from "reactstrap";
import moment from "moment";
import "moment/locale/tr";

const CommentList = ({ postId }) => {
  const [loading, setLoading] = useState(true);
  const comments = useSelector((state) => state.posts.comments);
  console.log("postId:", postId, ",comments:", comments);
  const dispatch = useDispatch();

  const convertRelativeTime = (date) => {
    return moment(date).locale('tr').format('lll');
  };

  useEffect(() => {
    dispatch(fetchPostComments(postId))
      .then((data) => setLoading(false))
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [dispatch, postId]);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

return (
      <div
        className="Container-fluid mt-5"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          marginTop: "45%",
          marginBottom: "160px",
          height: "600px",
          width: "80%",
          margin: "0 auto",
        }}
      >
        {comments.map((comment, index) => (
          <React.Fragment key={index}>
            <Card
              className="mt-5"
              style={{ width: "100%", margin: "0 auto", padding: "10px" }}
            >
              <CardBody>
                <CardTitle tag="h5">{comment.name}</CardTitle>
                <Badge color="primary">
                  {convertRelativeTime(comment.date)}
                </Badge>
                <CardText>{comment.comment}</CardText>
              </CardBody>
            </Card>
            {index < comments.length - 1 && <div style={{ height: "50px" }}></div>}
          </React.Fragment>
        ))}
      </div>
    );
};

export default CommentList;
