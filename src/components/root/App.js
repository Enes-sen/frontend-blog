import React from "react";
import {Routes, Route} from "react-router-dom";
import Navi from "../navi/navi";
import PostsList from "../post/postsList";
import AddPostForm from "../forms/AddpostForm";
import SinglePost from "../post/SinglePost";

function App() {
return (
<div>
<Navi />
<Routes>
<Route exact path="posts/" element={<PostsList />} />
<Route exact path="posts/:id" element={<SinglePost/>} />
<Route exact path="posts/newpost" element={<AddPostForm/>} />
</Routes>
</div>
);
}

export default App;