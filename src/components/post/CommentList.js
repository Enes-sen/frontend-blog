import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../../redux/actions/postActions";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import moment from "moment";

const CommentList = ({ postId }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.posts.currentPost?.comments);
  console.log("comments-array:", comments);
  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  const convertRelativeTime = (date) => {
    return moment(date).fromNow();
  };

  const filteredComments = comments && comments.filter((comment) => comment.postId === postId);

  if (!filteredComments || filteredComments.length === 0) {
    return <div>Bu yazıya henüz yorum yapılmamış.</div>;
  }

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
