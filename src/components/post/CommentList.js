import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostComments } from "../../redux/actions/postActions";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import moment from "moment";

const CommentList = ({ postId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostComments(postId));
  }, [dispatch, postId]);

  const convertRelativeTime = (date) => {
    return moment(date).fromNow();
  };

  const comments = useSelector((state) => state.posts.currentPost?.comments);
  console.log(comments);

  if (!Array.isArray(comments)) {
    return <div>Loading comments...</div>;
  }

  return (
    <div className="comments">
      {comments
        .filter((comment) => comment.postId === postId)
        .map((comment) => (
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
      {comments.length === 0 && <div>No comments yet.</div>}
    </div>
  );
};

export default CommentList;
