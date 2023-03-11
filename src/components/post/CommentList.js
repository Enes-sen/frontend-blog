import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { fetchPostComments } from "../../redux/actions/postActions";
import { Card, CardBody, CardTitle, CardText, Badge } from "reactstrap";
import moment from "moment";
import "moment/locale/tr";

const CommentList = ({ postId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostComments(postId))
      .then((response) => {
        setComments(response);
        setIsLoading(false);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [dispatch, postId]);

  const convertRelativeTime = (date) => {
    return moment(date).locale("tr").format("lll");
  };

  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

  if (comments.length === 0) {
    return <div>Bu gönderiye ait yorum yok</div>;
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
          {index < comments.length - 1 && (
            <div style={{ height: "50px" }}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

CommentList.propTypes = {
  postId: PropTypes.string.isRequired,
};

export default CommentList;
