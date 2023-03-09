import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostComments } from "../../redux/actions/postActions";
import { Card, CardBody, CardSubtitle, CardTitle, Badge, CardText, Button } from "reactstrap";
import moment from "moment";

const CommentList = ({ postId }) => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.posts.currentPost);

  useEffect(() => {
    dispatch(fetchPostComments(postId));
  }, [dispatch, postId]);
 

  const convertRelativeTime = (date) => {
    moment.locale('tr');
    return moment(date).format('lll');
  };

  if (!comments?.length) {
    return <div>Loading comments...</div>;
  }

  return (
    <div className="comments">
      {comments
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((comment) => (
          <Card key={comment?._id} className="mt-3">
            <CardBody>
              <CardTitle tag="h6">{comment?.name}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                <Badge className="ml-2" color="secondary">{convertRelativeTime(comment?.date)}</Badge>
              </CardSubtitle>
              <CardText>{comment?.comment}</CardText>
              <Button color="danger">
                yorum'u sil
              </Button>
            </CardBody>
          </Card>
        ))}
      <div>No comments yet.</div>
    </div>
  );
};

CommentList.propTypes = {
  postId: PropTypes.string.isRequired,
};

export default CommentList;
