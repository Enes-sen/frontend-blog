import React from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import moment from "moment";

const CommentList = ({ currentPost }) => {
  const comments = currentPost ? currentPost.comments : [];

  // check if comments is defined before filtering
  const filteredComments = comments.filter(comment => comment.postId === currentPost._id);

  const convertRelativeTime = (date) => {
    return moment(date).fromNow();
  };

  return (
    <div className="comments">
      {filteredComments.map((comment) => (
        <Card key={comment._id} className="mt-3">
          <CardBody>
            <CardTitle tag="h6">{comment.name}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              {convertRelativeTime(comment.date)}
            </CardSubtitle>
            <p>{comment.comment}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default CommentList;
