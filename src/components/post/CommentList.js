import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostComments, removeComment } from "../../redux/actions/postActions";
import { Card, CardBody, CardSubtitle, CardTitle, Badge, CardText, Button } from "reactstrap";
import moment from "moment";
import "moment/locale/tr";

const CommentList = ({ postId }) => {
  const dispatch = useDispatch();
  const comments = useSelector(state => state.posts.currentPost.comments);

  useEffect(() => {
    dispatch(fetchPostComments(postId));
  }, [dispatch, postId]);

  const convertRelativeTime = (date) => {
    return moment(date).locale('tr').format('lll');
  };

  const handleDeleteComment = (commentId) => {
    dispatch(removeComment(postId, commentId));
  };

  if (!comments || comments.length === 0) {
    return <div>Loading comments...</div>;
  }
   if (!Array.isArray(comments)) {
    return <div>Gösterilecek yorum yok</div>;
  }

  return (
    <div className="comments">
      {comments
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((comment,index) => (
          <React.Fragment key={index}>
          <Card className="mt-3">
            <CardBody>
              <CardTitle tag="h6">{comment?.name}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                <Badge className="ml-2" color="secondary">{convertRelativeTime(comment?.date)}</Badge>
              </CardSubtitle>
              <CardText>{comment?.comment}</CardText>
              <Button color="danger" onClick={() => handleDeleteComment(comment._id)}>
                Delete Comment
              </Button>
            </CardBody>
          </Card> 
           {index < comments.length - 1 && <div style={{ height: "50px" }}></div>}
          {/* add space between posts */}
          </React.Fragment>
        ))}
      {console.log(comments)} {/* Yorumları Console'da görmek için bu satırı ekledik */}
    </div>
  );
};

CommentList.propTypes = {
  postId: PropTypes.string.isRequired,
};

export default CommentList;
