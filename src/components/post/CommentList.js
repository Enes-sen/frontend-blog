import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostComments } from "../../redux/actions/postActions";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import moment from "moment";

const CommentList = ({ postId }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.posts.currentPost?.comments);
  console.log(comments);

  useEffect(() => {
    dispatch(fetchPostComments(postId));
  }, [dispatch, postId]);

  const convertRelativeTime = (date) => {
    return moment(date).fromNow();
  };

  if (!Array.isArray(comments)) {
    return <div>Loading comments...</div>;
  }

  if (!comments.length) {
    return <div>No comments yet.</div>;
  }

  return (
    <div className="comments">
      {comments.map((comment) => (
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
