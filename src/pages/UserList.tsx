import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    city: string;
  };
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchName, setSearchName] = useState<string>("");
  const [searchCity, setSearchCity] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch(() => {
        setError("Loading users Error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchName.toLowerCase()) &&
        user.address.city.toLowerCase().includes(searchCity.toLowerCase())
    );
  }, [users, searchName, searchCity]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Users List</h1>
      <div>
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by city"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
        />
      </div>
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            {user.name} ({user.address.city})
            <Link to={`/user/${user.id}`}>
              <button> Posts</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
