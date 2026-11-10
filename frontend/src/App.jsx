import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:5000/api/users";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
  });

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(API_URL, {
        ...form,
        age: Number(form.age),
      });

      setForm({
        name: "",
        email: "",
        age: "",
        phone: "",
      });

      fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>User Registration</h1>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="age"
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Register User
          </button>
        </form>
      </div>

      <div className="users">
        <h2>Registered Users</h2>

        {users.length === 0 ? (
          <p>No users registered yet.</p>
        ) : (
          users.map((user) => (
            <div className="user-card" key={user._id}>
              <div>
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <p>Age: {user.age}</p>
                <p>Phone: {user.phone}</p>
              </div>

              <button
                className="delete"
                onClick={() => deleteUser(user._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;