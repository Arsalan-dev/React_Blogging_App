import { useState } from "react";
// hook use to redirect the user
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const blog = { author, title, body };

    fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(blog),
    }).then(() => {
      console.log("New blog added", blog);
      setIsLoading(false);
      // navigate the user back to homepage after adding blog
      navigate("/");
    });
  };

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form className="create-form" onSubmit={handleSubmit}>
        <label>Enter author name: </label>
        <input
          type="text"
          required
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
        />
        <label>Enter title: </label>
        <input
          type="text"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label>Enter blog details:</label>
        <textarea
          type="text"
          required
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />
        {!isLoading && <button>Add Blog</button>}
        {isLoading && <button disabled>Adding Blog...</button>}
      </form>
    </div>
  );
};

export default Create;
