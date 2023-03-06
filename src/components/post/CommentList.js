import React from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import moment from "moment";

const CommentList = ({ postId }) => {
const comments = useSelector((state) =>
 console.log(state);
state.posts.comments.filter((comment) => comment.post === postId)
);

const convertRelativeTime = (date) => {
return moment(date).fromNow(); // tarihi "x zaman önce" formatında döndürür
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
