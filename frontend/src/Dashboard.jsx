import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    fetch("http://localhost:4000/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then(setUser);
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome {user.nameID}</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
