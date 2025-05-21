"use client";

import { useState } from "react";
import { LogOut, Menu, X } from 'lucide-react';

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleCreateSession = () => {
    if (!newSession.title || !newSession.date || !newSession.thumbnail) return;
    const newId = sessions.length + 1;
    setSessions([...sessions, { id: newId, ...newSession }]);
    setNewSession({ title: "", date: "", thumbnail: "" });
    setActiveTab("dashboard");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false); // Close sidebar when tab is changed on mobile
  };

  return (
    <div className="flex h-screen text-indigo-100 overflow-hidden">
      {/* Mobile Hamburger Button */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 text-indigo-100 rounded-md border border-purple-500"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar - Hidden on mobile by default, shown when sidebarOpen is true */}
      <div className={`fixed md:relative md:block md:w-82 z-40 h-screen border border-purple-500 flex flex-col transition-all duration-300 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }  overflow-y-auto`}>
        {/* Top section with navigation */}
        <div className="px-3 pt-16 md:pt-20 flex-grow">
          {["dashboard", "sessions", "leaderboard"].map((key) => (
            <button
              key={key}
              onClick={() => handleTabChange(key)}
              className={`w-full text-left mb-2 px-4 py-3 rounded-md flex items-center transition ${
                activeTab === key ? "bg-gradient-to-r from-blue-500 to-purple-600 text-indigo-200" : "hover:bg-indigo-800/50"
              }`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Bottom section with logout button - positioned absolutely */}
        <div className="p-4 border-t border-purple-500 absolute bottom-0 left-0 right-0 ">
          <button className="w-full text-left px-8 py-3 rounded-md flex items-center text-red-500 hover:bg-red-600/30 transition">
            <LogOut className="mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content - Take full width on mobile */}
      <div className="flex-1 p-4 md:p-8 pt-16 md:py-20">
        {activeTab === "dashboard" && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-indigo-300">Teacher Dashboard</h2>
            {/* Profile Info */}
            <div className="rounded-lg p-4 md:p-6 shadow-md mb-8 border border-purple-500">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <img
                  src={teacherData.profileImg}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border border-purple-500"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-indigo-300">{teacherData.name}</h3>
                  <p className="text-indigo-400 mb-2">{teacherData.email}</p>
                  <p className="text-indigo-300"><span className="text-indigo-400">Skills:</span> {teacherData.skills}</p>
                  <p className="text-indigo-300"><span className="text-indigo-400">Member since:</span> {teacherData.joinedDate}</p>

                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["Rating", "Students", "Total Sessions", "Coins Earned"].map((label, i) => (
                      <div key={label} className="p-3 rounded-md text-center border border-purple-500">
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
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                <h3 className="text-xl font-bold text-indigo-300">Upcoming Sessions</h3>
                <button
                  onClick={() => setActiveTab("sessions")}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:bg-indigo-500 transition"
                >
                  Create New Session
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className="rounded-lg overflow-hidden border border-purple-500 shadow-md"
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
              className="w-full p-2 mb-4 border border-purple-500 rounded-md"
              value={newSession.title}
              onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
            />
            <input
              type="date"
              className="w-full p-2 mb-4 border border-purple-500 rounded-md"
              value={newSession.date}
              onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
            />
            <input
              type="text"
              placeholder="Thumbnail URL"
              className="w-full p-2 mb-4 border border-purple-500 rounded-md"
              value={newSession.thumbnail}
              onChange={(e) => setNewSession({ ...newSession, thumbnail: e.target.value })}
            />
            <button
              onClick={handleCreateSession}
              className="w-full p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md"
            >
              Add Session
            </button>
          </div>
        )}

        {/* Leaderboard */}
        {activeTab === "leaderboard" && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-indigo-300">Leaderboard</h2>
            <div className="border border-purple-500 rounded-lg p-4 overflow-x-auto">
              <table className="w-full text-center">
                <thead>
                  <tr className="text-indigo-400">
                    <th className="py-2">Rank</th>
                    <th className="py-2">Name</th>
                    <th className="py-2">Points</th>
                  </tr>
                  <tr>
                    <td colSpan="3">
                      <div className="h-0.5 bg-purple-500 w-full"></div>
                    </td>
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
      
      {/* Overlay to close sidebar when clicking outside */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}