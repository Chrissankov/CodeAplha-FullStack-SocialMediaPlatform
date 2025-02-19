import { useState } from "react";
import "../styles/Posts.css";

function Posts() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: "john_doe",
      userImg: "https://randomuser.me/api/portraits/men/1.jpg",
      postImg: "https://picsum.photos/seed/post1/400/300",
      caption: "Playing!",
      likes: 12,
      comments: ["Nice shot!"],
      newComment: "",
    },
    {
      id: 2,
      username: "jane_smith",
      userImg: "https://randomuser.me/api/portraits/women/2.jpg",
      postImg: "https://picsum.photos/seed/post2/400/300",
      caption: ":)",
      likes: 45,
      comments: ["Looks so relaxing!", "Wow 😍"],
      newComment: "",
    },
  ]);

  const [newPostImg, setNewPostImg] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [imageFile, setImageFile] = useState(null);

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setNewPostImg("");
    }
  }

  function handleAddPost() {
    if (!newPostImg.trim() && !imageFile) return;

    const newPost = {
      id: Date.now(),
      username: "your_username",
      userImg: "https://randomuser.me/api/portraits/men/10.jpg",
      postImg: imageFile ? URL.createObjectURL(imageFile) : newPostImg,
      caption: newCaption,
      likes: 0,
      comments: [],
      newComment: "",
    };

    setPosts((prevPosts) => [newPost, ...prevPosts]); // Prepend new post to the top
    setNewPostImg("");
    setNewCaption("");
    setImageFile(null);
  }

  function handleLike(postId) {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  }

  function handleComment(postId, e) {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, newComment: e.target.value } : post
      )
    );
  }

  function addComment(postId) {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [...post.comments, post.newComment],
              newComment: "",
            }
          : post
      )
    );
  }

  return (
    <div className="posts-container">
      <div className="new-post">
        <input
          type="text"
          placeholder="Image URL..."
          value={newPostImg}
          onChange={(e) => {
            setNewPostImg(e.target.value);
            setImageFile(null);
          }}
          className="new-post-input"
        />
        <span style={{ textAlign: "center" }}>or</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="new-post-input"
        />
        <input
          type="text"
          placeholder="Caption..."
          value={newCaption}
          onChange={(e) => setNewCaption(e.target.value)}
          className="new-post-input"
        />
        <button onClick={handleAddPost} className="new-post-btn">
          Post
        </button>
      </div>

      {posts.map((post) => (
        <div key={post.id} className="post">
          <div className="post-header">
            <img src={post.userImg} alt={post.username} className="user-img" />
            <span className="username">{post.username}</span>
          </div>
          <img src={post.postImg} alt="Post" className="post-img" />
          <div className="post-details">
            <p className="caption">{post.caption}</p>
            <div className="post-actions">
              <span onClick={() => handleLike(post.id)}>❤️ {post.likes}</span>
              <span>💬 {post.comments.length}</span>
            </div>

            <div className="comments-section">
              <div className="comments-list">
                {post.comments.map((comment, index) => (
                  <p key={index} className="comment">
                    {comment}
                  </p>
                ))}
              </div>
              <div className="comment-input-container">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={post.newComment}
                  onChange={(e) => handleComment(post.id, e)}
                  className="comment-input"
                />
                <button
                  onClick={() => addComment(post.id)}
                  className="comment-btn"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;
