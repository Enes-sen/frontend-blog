import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostComments } from "../../redux/actions/postActions";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import moment from "moment";

const CommentList = ({ postId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostComments(postId));
  }, [dispatch, postId]);

  const { currentPost } = useSelector((state) => state.posts);

  const convertRelativeTime = (date) => {
    return moment(date).fromNow();
  };

  if (!currentPost?.comments?.length) {
    return <div>Loading comments...</div>;
  }

  return (
    <div className="comments">
      {currentPost.comments
        .sort((a, b) => new Date(b.date) - new Date(a.date))
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
      {currentPost.comments.length === 0 && <div>No comments yet.</div>}
    </div>
  );
};


export default CommentList;
