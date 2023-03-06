import React from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import moment from "moment";

const CommentList = ({ currentPost }) => {
  const comments = useSelector((state) =>
    state.posts.find((post) => post._id === currentPost._id).comments
  );
  console.log(comments); 
  const convertRelativeTime = (date) => {
    return moment(date).fromNow();
  };

  return (
    <div className="comments">
      {comments.map((comment) => (
        <Card key={comment._id} className="mt-3">
          <CardBody>
            <CardTitle tag="h6">{comment.name}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              {convertRelativeTime(comment.date)}
            </CardSubtitle>
            <p>{comment.content}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default CommentList;
