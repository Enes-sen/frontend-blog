import React from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import moment from "moment";

const CommentList = ({ postId }) => {

 useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId ]);

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
