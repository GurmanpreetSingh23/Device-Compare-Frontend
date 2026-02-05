import React, { useEffect, useState } from "react";
import axios from "axios";

function UsersSection() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState(""); // SEARCH STATE

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/device-compare/user/all-users",
          { withCredentials: true }
        );
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/device-compare/user/delete-user/${id}`,
        { withCredentials: true }
      );

      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 FILTERED USERS BASED ON SEARCH
  const filteredUsers = users.filter((u) => {
    const name = u.name?.toLowerCase() || "";
    const email = u.email?.toLowerCase() || "";
    const searchVal = search.toLowerCase();

    return name.includes(searchVal) || email.includes(searchVal);
  });

  return (
    <main className="h-auto w-full flex flex-col bg-white/40 backdrop-blur-3xl my-[1vh] px-4 py-2 rounded-2xl">
      <div className="flex justify-between">
        <h1 className="md:text-xl font-bold text-black mb-6 tracking-wide">
          Users Management
        </h1>

        <input
          type="text"
          className="h-8 px-2 text-xs text-black outline-none border border-black/70 rounded-2xl"
          placeholder="Search user"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredUsers.length === 0 ? (
        <p className="text-black/70 text-lg mt-10">No users found.</p>
      ) : (
        <div className="flex flex-wrap gap-4 w-full">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white/10 backdrop-blur-xl p-4 rounded-xl shadow-md border border-white/10
              w-[48%] sm:w-[30%] lg:w-[22%]"
            >
              <h2 className="text-base font-semibold text-black/80 truncate">
                {user.name || "Unnamed User"}
              </h2>

              <p className="text-black/80 text-xs truncate mt-1">
                {user.email}
              </p>

              <p className="text-black/80 text-[10px] mt-2">
                Joined: {new Date(user.createdAt).toLocaleDateString()}
              </p>

              <button
                onClick={() => handleDelete(user._id)}
                className="mt-3 w-full py-1.5 rounded-lg cursor-pointer text-xs font-semibold bg-red-500 hover:bg-red-600 text-white transition"
              >
                Delete User
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default UsersSection;
