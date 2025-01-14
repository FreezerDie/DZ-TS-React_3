import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
  };
}

const UserDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          setError("Loading user data Error");
        });

      axios
        .get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
        .then((response) => {
          setPosts(response.data);
        })
        .catch(() => {
          setError("loading user posts Error");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!user) return <p>User not found</p>;

  return (
    <div>
      <button onClick={() => navigate("/")}>Back</button>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>City: {user.address.city}</p>
      <h2>User Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetails;
