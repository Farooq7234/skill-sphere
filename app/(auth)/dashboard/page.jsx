"use client";

import { useState } from "react";

const teacherData = {
  name: "John Doe",
  email: "john.doe@example.com",
  skills: "JavaScript, React, Node.js",
  joinedDate: "Jan 2022",
  rating: 4.8,
  totalStudents: 124,
  totalSessions: 35,
  earnings: 540,
  profileImg: "/profile.jpg",
};

const upcomingSessions = [
  {
    id: 1,
    title: "Intro to React",
    date: "2025-06-01",
    thumbnail: "/session1.jpg",
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    date: "2025-06-05",
    thumbnail: "/session2.jpg",
  },
  {
    id: 3,
    title: "Node.js API Building",
    date: "2025-06-10",
    thumbnail: "/session3.jpg",
  },
];

const mockLeaderboard = [
  { id: 1, name: "Alice", points: 150 },
  { id: 2, name: "Bob", points: 140 },
  { id: 3, name: "Charlie", points: 135 },
];

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sessions, setSessions] = useState(upcomingSessions);
  const [newSession, setNewSession] = useState({ title: "", date: "", thumbnail: "" });

  const handleCreateSession = () => {
    if (!newSession.title || !newSession.date || !newSession.thumbnail) return;
    const newId = sessions.length + 1;
    setSessions([...sessions, { id: newId, ...newSession }]);
    setNewSession({ title: "", date: "", thumbnail: "" });
    setActiveTab("dashboard");
  };

  return (
    <div className="flex h-screen  text-indigo-100 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64  border-r border-indigo-800 flex flex-col">
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold text-indigo-300">SkillSphere</h1>
          <p className="text-indigo-400 text-sm mt-1">Teacher Portal</p>
        </div>

        <div className="flex-1 px-3 py-4">
          {["dashboard", "sessions", "leaderboard"].map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`w-full text-left mb-2 px-4 py-3 rounded-md flex items-center transition ${
                activeTab === key ? "bg-indigo-800 text-indigo-200" : "hover:bg-indigo-800/50"
              }`}
            >
              <span className="w-5 h-5 mr-3">📌</span>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-indigo-800">
          <button className="w-full text-left px-4 py-3 rounded-md flex items-center text-red-300 hover:bg-red-900/30 transition">
            <span className="w-5 h-5 mr-3">🚪</span>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        {activeTab === "dashboard" && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-indigo-300">Teacher Dashboard</h2>
            {/* Profile Info */}
            <div className=" rounded-lg p-6 shadow-md mb-8 border border-indigo-800">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <img
                  src={teacherData.profileImg}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-2 border-indigo-500"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-indigo-300">{teacherData.name}</h3>
                  <p className="text-indigo-400 mb-2">{teacherData.email}</p>
                  <p className="text-indigo-300"><span className="text-indigo-400">Skills:</span> {teacherData.skills}</p>
                  <p className="text-indigo-300"><span className="text-indigo-400">Member since:</span> {teacherData.joinedDate}</p>

                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["Rating", "Students", "Total Sessions", "Coins Earned"].map((label, i) => (
                      <div key={label} className="b p-3 rounded-md text-center">
                        <p className="text-2xl font-bold text-indigo-300">
                          {[teacherData.rating, teacherData.totalStudents, teacherData.totalSessions, teacherData.earnings][i]}
                        </p>
                        <p className="text-xs text-indigo-400">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Sessions */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-indigo-300">Upcoming Sessions</h3>
                <button
                  onClick={() => setActiveTab("sessions")}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition"
                >
                  Create New Session
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className=" rounded-lg overflow-hidden border border-indigo-800 shadow-md"
                  >
                    <img
                      src={session.thumbnail}
                      alt={session.title}
                      className="w-full h-36 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-indigo-300 mb-2">{session.title}</h4>
                      <p className="text-indigo-400 text-sm">{session.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Create Session */}
        {activeTab === "sessions" && (
          <div className="max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-indigo-300">Create New Session</h2>
            <input
              type="text"
              placeholder="Session Title"
              className="w-full p-2 mb-4  border border-indigo-700 rounded-md"
              value={newSession.title}
              onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
            />
            <input
              type="date"
              className="w-full p-2 mb-4  border border-indigo-700 rounded-md"
              value={newSession.date}
              onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
            />
            <input
              type="text"
              placeholder="Thumbnail URL"
              className="w-full p-2 mb-4  border border-indigo-700 rounded-md"
              value={newSession.thumbnail}
              onChange={(e) => setNewSession({ ...newSession, thumbnail: e.target.value })}
            />
            <button
              onClick={handleCreateSession}
              className="w-full p-2  hover:bg-indigo-500 text-white rounded-md"
            >
              Add Session
            </button>
          </div>
        )}

        {/* Leaderboard */}
        {activeTab === "leaderboard" && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-indigo-300">Leaderboard</h2>
            <div className=" border border-indigo-800 rounded-lg p-4">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-indigo-400 border-b border-indigo-700">
                    <th className="py-2">Rank</th>
                    <th className="py-2">Name</th>
                    <th className="py-2">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {mockLeaderboard.map((student, index) => (
                    <tr key={student.id} className="hover:bg-indigo-800/30">
                      <td className="py-2">#{index + 1}</td>
                      <td className="py-2">{student.name}</td>
                      <td className="py-2">{student.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}