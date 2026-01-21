import { useEffect, useState } from "react";

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/users").then(res => setUsers(res.data));
  }, []);

  return (
    <div>
      <h1>BeatStars Dashboard</h1>
      <ul>
        {users.map(u => (
          <li key={u._id}>{u.fullName} ({u.role})</li>
        ))}
      </ul>
    </div>
  );
}
