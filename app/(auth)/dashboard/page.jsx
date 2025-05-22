"use client";

import { useState } from "react";
import { LogOut, Menu, X } from 'lucide-react';
import {  useUser } from "@clerk/nextjs";
import { databases, ID, storage } from "@/utils/appwrite";

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
  const [tagInput, setTagInput] = useState("");
 const [newSession, setNewSession] = useState({
  title: "",
  date: "",
  timeFrom: "",
  timeFromPeriod: "AM",
  timeTo: "",
  timeToPeriod: "AM",
  thumbnail: "",
  description: "",
  meetLink: "",
  tags: [],
});


  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {user} = useUser()

 const handleCreateSession = async () => {
  try {
    let thumbnailFileId = "";

    // Upload file to Appwrite bucket if thumbnail is present
    if (newSession.thumbnail) {
      const uploadedFile = await storage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,             // ✅ replace with your bucket ID
        ID.unique(),
        newSession.thumbnail           // ✅ this must be a File object
      );
      thumbnailFileId = uploadedFile.$id;
    }

    // Store session data in Appwrite Database
    await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,             // ✅ replace with your DB ID
      process.env.NEXT_PUBLIC_APPWRITE_SESSION_FORM_ID,           // ✅ replace with your Collection ID
      ID.unique(),
      {
        title: newSession.title,
        date: newSession.date,
        timeFrom: newSession.timeFrom,
        timeFromPeriod: newSession.timeFromPeriod,
        timeTo: newSession.timeTo,
        timeToPeriod: newSession.timeToPeriod,
        description: newSession.description,
        meetLink: newSession.meetLink,
        tags: newSession.tags || [],
        thumbnailId: thumbnailFileId     // ✅ store file ID
      }
    );

    alert("Session created successfully!");
  } catch (error) {
    console.error("Error creating session:", error);
    alert("Error creating session. Check console for details.");
  }
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
          {["dashboard", "sessions"].map((key) => (
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
            <h2 className="text-2xl font-bold mb-6 text-indigo-300">Community Hero Dashboard</h2>
            {/* Profile Info */}
            <div className="rounded-lg p-4 md:p-6 shadow-md mb-8 border border-purple-500">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <img
                  src={user?.imageUrl}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border border-purple-500"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-indigo-300">{user?.firstName}</h3>
                  <p className="text-indigo-400 mb-2">{user?.primaryEmailAddress?.emailAddress}</p>
                  <p className="text-indigo-300"><span className="text-indigo-400">Skills:</span> {teacherData.skills}</p>
                  <p className="text-indigo-300"><span className="text-indigo-400">Member since:</span> {user?.createdAt?.getFullYear()}</p>

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
  <div className="max-w-lg mx-auto my-auto  h-full md:h-screen">
    <h2 className="text-2xl font-bold mb-6 text-indigo-300">Create New Session</h2>

    {/* Title */}
   
    <input
      type="text"
      placeholder="Session Title"
      className="w-full p-2 mb-4 border border-purple-500 rounded-md"
      value={newSession.title}
      onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
    />

    {/* Date */}
  
    <input
      type="date"
      className="w-full p-2 mb-4 border border-purple-500 rounded-md"
      value={newSession.date}
      onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
    />

   
{/* Time From */}

<div className="flex gap-2 mb-4">
  <input
    type="time"
    className="w-full border border-purple-500 rounded-md p-2"
    value={newSession.timeFrom || ""}
    onChange={(e) => setNewSession({ ...newSession, timeFrom: e.target.value })}
  />
  <select
    className="border border-purple-500 rounded-md p-2"
    value={newSession.timeFromPeriod || "AM"}
    onChange={(e) => setNewSession({ ...newSession, timeFromPeriod: e.target.value })}
  >
    <option value="AM">AM</option>
    <option value="PM">PM</option>
  </select>
</div>

{/* Time To */}

<div className="flex gap-2 mb-4">
  <input
    type="time"
    className="w-full border border-purple-500 rounded-md p-2"
    value={newSession.timeTo || ""}
    onChange={(e) => setNewSession({ ...newSession, timeTo: e.target.value })}
  />
  <select
    className="border border-purple-500 rounded-md p-2"
    value={newSession.timeToPeriod || "AM"}
    onChange={(e) => setNewSession({ ...newSession, timeToPeriod: e.target.value })}
  >
    <option value="AM">AM</option>
    <option value="PM">PM</option>
  </select>
</div>

  

     {/* Thumbnail Upload */}
    <input
      type="file"
      accept="image/*"
      className="w-full p-2 mb-4 border border-purple-500 rounded-md"
      onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setNewSession({ ...newSession, thumbnail: file });
          };
          reader.readAsDataURL(file);
        }
      }}
    />

    {/* Description */}
    <textarea
      placeholder="Session Description"
      className="w-full p-2 mb-4 border border-purple-500 rounded-md"
      value={newSession.description || ""}
      onChange={(e) => setNewSession({ ...newSession, description: e.target.value })}
    />

    {/* Google Meet Link */}
    <input
      type="url"
      placeholder="Google Meet Link"
      className="w-full p-2 mb-4 border border-purple-500 rounded-md"
      value={newSession.meetLink || ""}
      onChange={(e) => setNewSession({ ...newSession, meetLink: e.target.value })}
    />

    {/* Tags Input */}
    <div className="w-full p-2 mb-4 border border-purple-500 rounded-md">
      <input
        type="text"
        placeholder="Add a tag and press Enter"
        className="w-full mb-2 outline-none"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && tagInput.trim() !== "") {
            e.preventDefault();
            setNewSession({
              ...newSession,    
              tags: [...(newSession.tags || []), tagInput.trim()],
            });
            setTagInput("");
          }
        }}
      />
      <div className="flex flex-wrap gap-2">
        {(newSession.tags || []).map((tag, index) => (
          <span
            key={index}
            className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm flex items-center"
          >
            {tag}
            <button
              onClick={() =>
                setNewSession({
                  ...newSession,
                  tags: newSession.tags.filter((_, i) => i !== index),
                })
              }
              className="ml-2 text-white hover:text-red-300"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>

    {/* Submit Button */}
    <button
      onClick={handleCreateSession}
      className="w-full p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md"
    >
      Add Session
    </button>
  </div>
)}


        {/* Leaderboard */}
        {/* {activeTab === "leaderboard" && (
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
        )} */}
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