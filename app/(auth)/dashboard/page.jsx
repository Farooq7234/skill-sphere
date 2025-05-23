"use client";

import { useState ,useEffect} from "react";
import { LogOut, Menu, X, Calendar, Edit, User, Plus, Tag, Trash2,Link2 } from 'lucide-react';
import { SignOutButton, useUser } from "@clerk/nextjs";
import { databases, ID, storage } from "../../../utils/appwrite";
import Link from "next/link";

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

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
  const collectionId = process.env.NEXT_PUBLIC_APPWRITE_SESSION_FORM_ID;
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;
  const [sessions, setSessions] = useState([]);
  const [editTagInput, setEditTagInput] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [editingSession, setEditingSession] = useState(null);
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
  const { user } = useUser();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  // Fetch sessions from Appwrite
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await databases.listDocuments(databaseId, collectionId);
        setUpcomingSessions(res.documents);
        setSessions(res.documents);
      } catch (err) {
        console.error("Error fetching sessions:", err);
      }
    };
    fetchSessions();
  }, []);

  // Enhanced Delete Method
  const handleDelete = async (sessionId, thumbnailId) => {
    if (!confirm("Are you sure you want to delete this session?")) {
      return;
    }

    try {
      // Delete the document from database
      await databases.deleteDocument(databaseId, collectionId, sessionId);
      
      // Delete the thumbnail from storage if it exists
      if (thumbnailId) {
        try {
          await storage.deleteFile(bucketId, thumbnailId);
        } catch (storageError) {
          console.warn("Could not delete thumbnail file:", storageError);
        }
      }

      // Update local state
      setUpcomingSessions((prev) => prev.filter((s) => s.$id !== sessionId));
      setSessions((prev) => prev.filter((s) => s.$id !== sessionId));
      
      alert("Session deleted successfully!");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Error deleting session. Please try again.");
    }
  };

  // Upload thumbnail helper function
  const uploadThumbnail = async (file) => {
    try {
      const uploadedFile = await storage.createFile(bucketId, ID.unique(), file);
      return uploadedFile.$id;
    } catch (error) {
      console.error("Error uploading thumbnail:", error);
      throw error;
    }
  };

  // Start editing a session
  const handleEditSession = (session) => {
    setEditingSession({
      id: session.$id,
      title: session.title || "",
      date: session.date || "",
      timeFrom: session.timeFrom || "",
      timeFromPeriod: session.timeFromPeriod || "AM",
      timeTo: session.timeTo || "",
      timeToPeriod: session.timeToPeriod || "AM",
      description: session.description || "",
      meetLink: session.meetLink || "",
      tags: session.tags || [],
      thumbnailId: session.thumbnailId || "",
      thumbnail: null // For new file upload
    });
    setActiveTab("sessions");
  };

  // Save edited session
  const handleSaveEditedSession = async () => {
    if (!editingSession) {
      console.error("No session to edit");
      return;
    }

    try {
      let thumbnailFileId = editingSession.thumbnailId; // Keep existing thumbnail by default

      // If user uploaded a new thumbnail, upload it and get the new ID
      if (editingSession.thumbnail) {
        thumbnailFileId = await uploadThumbnail(editingSession.thumbnail);
        
        // Delete old thumbnail if it exists
        if (editingSession.thumbnailId) {
          try {
            await storage.deleteFile(bucketId, editingSession.thumbnailId);
          } catch (storageError) {
            console.warn("Could not delete old thumbnail:", storageError);
          }
        }
      }

      const updatedSession = {
        title: editingSession.title,
        date: editingSession.date,
        timeFrom: editingSession.timeFrom,
        timeFromPeriod: editingSession.timeFromPeriod,
        timeTo: editingSession.timeTo,
        timeToPeriod: editingSession.timeToPeriod,
        description: editingSession.description || "",
        meetLink: editingSession.meetLink || "",
        tags: editingSession.tags || [],
        thumbnailId: thumbnailFileId || "",
      };

      const result = await databases.updateDocument(
        databaseId,
        collectionId,
        editingSession.id,
        updatedSession
      );

      // Update local state
      setUpcomingSessions((prev) =>
        prev.map((session) =>
          session.$id === editingSession.id ? result : session
        )
      );
      setSessions((prev) =>
        prev.map((session) =>
          session.$id === editingSession.id ? result : session
        )
      );

      alert("Session updated successfully!");
      setEditingSession(null);
      setActiveTab("dashboard");
    } catch (error) {
      console.error("Error updating session:", error);
      alert("Error updating session. Please try again.");
    }
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingSession(null);
    setActiveTab("dashboard");
  };

  const handleCreateSession = async () => {
    try {
      let thumbnailFileId = "";

      // Upload file to Appwrite bucket if thumbnail is present
      if (newSession.thumbnail) {
        const uploadedFile = await storage.createFile(
          process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
          ID.unique(),
          newSession.thumbnail
        );
        thumbnailFileId = uploadedFile.$id;
      }

      // Store session data in Appwrite Database
      const createdSession = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_SESSION_FORM_ID,
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
          thumbnailId: thumbnailFileId,
          userId: user.id,
          instructor: user.fullName
        }
      );

      // Update local state
      setUpcomingSessions((prev) => [...prev, createdSession]);
      setSessions((prev) => [...prev, createdSession]);

      alert("Session created successfully!");
      
      // Reset form
      setNewSession({
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
    } catch (error) {
      console.error("Error creating session:", error);
      alert("Error creating session. Check console for details.");
    }
  };

  // Get thumbnail URL
  const getThumbnailUrl = (thumbnailId) => {
    if (!thumbnailId) return "/api/placeholder/300/200";
    return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${bucketId}/files/${thumbnailId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
  };

  return (
    <div className="flex h-screen bg-slate-900 text-white overflow-y-auto">
      {/* Mobile Hamburger Button */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 text-white rounded-md border border-slate-700 hover:bg-slate-700 transition-colors"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`fixed md:relative md:block md:w-80 z-40 h-screen  py-10 bg-slate-800 border-r border-slate-700 flex flex-col transition-all duration-300 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      } overflow-y-auto`}>
        {/* Top section with navigation */}
        <div className="px-4 pt-16 md:pt-8 flex-grow">
          <h2 className="text-xl font-bold text-white mb-6 px-2">Dashboard</h2>
          {["dashboard", "sessions"].map((key) => (
            <button
              key={key}
              onClick={() => handleTabChange(key)}
              className={`w-full text-left mb-2 px-4 py-3 rounded-lg flex items-center transition-all duration-300 ${
                activeTab === key 
                  ? "bg-blue-900/30 text-blue-400 font-medium" 
                  : "text-gray-300 hover:bg-slate-700/50"
              }`}
            >
              {key === "dashboard" && <User className="mr-3 h-5 w-5" />}
              {key === "sessions" && <Calendar className="mr-3 h-5 w-5" />}
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Bottom section with logout button */}
        <div className="p-4 border-t border-slate-700">
       
            <div className="flex items-center justify-between mb-4  text-red-400 hover:bg-red-900/20 p-2 rounded-lg"> 
<LogOut className=" h-5 w-5" />
            <SignOutButton className="w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors">Logout</SignOutButton>
       
            </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 pt-16 md:pt-8  overflow-y-auto">
        {activeTab === "dashboard" && (
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">Community Hero Dashboard</h1>
            
            {/* Profile Info */}
            <div className="bg-slate-800 rounded-xl p-8 shadow-sm mb-8 border border-slate-700">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                <div className="relative">
                  <img
                    src={user?.imageUrl || "/api/placeholder/120/120"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-slate-600 shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-slate-800"></div>
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <div className="mb-6">
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {user?.firstName} {user?.lastName || ""}
                    </h3>
                    <p className="text-lg text-blue-400 font-medium mb-1">Community Hero</p>
                    <p className="text-gray-400 flex items-center justify-center lg:justify-start gap-2">
                      <User className="h-4 w-4" />
                      {user?.primaryEmailAddress?.emailAddress || "email@example.com"}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Skills & Expertise</h4>
                      <p className="text-white font-medium">{teacherData.skills}</p>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Member Since</h4>
                      <p className="text-white font-medium">
                        {user?.createdAt 
                          ? new Date(user.createdAt).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long' 
                            })
                          : "January 2025"
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Sessions */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
                <h3 className="text-2xl font-bold text-white">Upcoming Sessions</h3>
                <div className="flex justify-center items-center">
                  <Link href="/sessions" className="text-gray-300 hover:text-white px-4 py-2  mr-10 text-sm font-medium border border-purple-500 rounded-md hover:bg-purple-500/20 transition-all duration-300">
                   Go to Sessions
              </Link>
                <button
                  onClick={() => setActiveTab("sessions")}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  <Plus className="h-5 w-5" />
                  Create New Session
                </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sessions.map((session) => (
                  <div
                    key={session.$id}
                    className="bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-slate-700 group"
                  >
                    <img
                      src={getThumbnailUrl(session.thumbnailId)}
                      alt={session.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="p-5">
                      <h4 className="text-lg font-semibold text-white mb-2">{session.title}</h4>
                      <div className="flex items-center text-sm text-gray-400 mb-4">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditSession(session)}
                          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors"
                        >
                          <Edit size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(session.$id, session.thumbnailId)}
                          className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center justify-center gap-2 transition-colors"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Create Session */}
        {activeTab === "sessions" && !editingSession && (
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">Create New Session</h1>

            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 shadow-sm h-full">
              {/* Title */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Session Title</label>
                <input
                  type="text"
                  placeholder="Enter session title"
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={newSession.title}
                  onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
                />
              </div>

              {/* Date */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                <input
                  type="date"
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={newSession.date}
                  onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
                />
              </div>

              {/* Time From */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Start Time</label>
                <div className="flex gap-3">
                  <input
                    type="time"
                    className="flex-1 p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={newSession.timeFrom || ""}
                    onChange={(e) => setNewSession({ ...newSession, timeFrom: e.target.value })}
                  />
                  <select
                    className="p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={newSession.timeFromPeriod || "AM"}
                    onChange={(e) => setNewSession({ ...newSession, timeFromPeriod: e.target.value })}
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>

              {/* Time To */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">End Time</label>
                <div className="flex gap-3">
                  <input
                    type="time"
                    className="flex-1 p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={newSession.timeTo || ""}
                    onChange={(e) => setNewSession({ ...newSession, timeTo: e.target.value })}
                  />
                  <select
                    className="p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={newSession.timeToPeriod || "AM"}
                    onChange={(e) => setNewSession({ ...newSession, timeToPeriod: e.target.value })}
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>

              {/* Thumbnail Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Session Thumbnail</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-colors"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setNewSession({ ...newSession, thumbnail: file });
                    }
                  }}
                />
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  placeholder="Describe your session"
                  rows={4}
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  value={newSession.description || ""}
                  onChange={(e) => setNewSession({ ...newSession, description: e.target.value })}
                />
              </div>

              {/* Google Meet Link */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Link2 className="inline h-4 w-4 mr-1" />
                  Google Meet Link
                </label>
                <input
                  type="url"
                  placeholder="https://meet.google.com/..."
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={newSession.meetLink || ""}
                  onChange={(e) => setNewSession({ ...newSession, meetLink: e.target.value })}
                />
              </div>

              {/* Tags Input */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Tag className="inline h-4 w-4 mr-1" />
                  Tags
                </label>
                <div className="bg-slate-700 border border-slate-600 rounded-lg p-3">
                  <input
                    type="text"
                    placeholder="Add a tag and press Enter"
                    className="w-full bg-transparent text-white placeholder-gray-400 outline-none mb-3"
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
                        className="bg-blue-500/60 text-white px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        #{tag}
                        <button
                          onClick={() =>
                            setNewSession({
                              ...newSession,
                              tags: newSession.tags.filter((_, i) => i !== index),
                            })
                          }
                          className="ml-2 text-blue-400 hover:text-red-400 transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              
              <button
                onClick={handleCreateSession}
                className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="h-5 w-5" />
                Create Session
              </button>
            </div>
          </div>
        )}

        {/* Edit Session */}
        {activeTab === "sessions" && editingSession && (
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-white">Edit Session</h1>
              { <button
                onClick={cancelEditing}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Cancel
              </button> }
            </div>

            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 shadow-sm">
              {/* Title */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Session Title</label>
                <input
                  type="text"
                  placeholder="Enter session title"
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={editingSession.title || ""}
                  onChange={(e) => setEditingSession({ ...editingSession, title: e.target.value })}
                />
              </div>

              {/* Date */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                <input
                  type="date"
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={editingSession.date || ""}
                  onChange={(e) => setEditingSession({ ...editingSession, date: e.target.value })}
                />
              </div>

              {/* Time From */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Start Time</label>
                <div className="flex gap-3">
                  <input
                    type="time"
                    className="flex-1 p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={editingSession.timeFrom || ""}
                    onChange={(e) => setEditingSession({ ...editingSession, timeFrom: e.target.value })}
                  />
                  <select
                    className="p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={editingSession.timeFromPeriod || "AM"}
                    onChange={(e) => setEditingSession({ ...editingSession, timeFromPeriod: e.target.value })}
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>

              {/* Time To */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">End Time</label>
                <div className="flex gap-3">
                  <input
                    type="time"
                    className="flex-1 p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={editingSession.timeTo || ""}
                    onChange={(e) => setEditingSession({ ...editingSession, timeTo: e.target.value })}
                  />
                  <select
                    className="p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={editingSession.timeToPeriod || "AM"}
                    onChange={(e) => setEditingSession({ ...editingSession, timeToPeriod: e.target.value })}
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>

              {/* Current Thumbnail Preview */}
              {editingSession.thumbnailId && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Current Thumbnail</label>
                  <img
                    src={getThumbnailUrl(editingSession.thumbnailId)}
                    alt="Current thumbnail"
                    className="w-32 h-24 object-cover rounded-lg border border-slate-600"
                  />
                </div>
              )}

              {/* Thumbnail Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {editingSession.thumbnailId ? "Replace Thumbnail" : "Session Thumbnail"}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-colors"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setEditingSession({ ...editingSession, thumbnail: file });
                    }
                  }}
                />
              </div>

                 {/* Optional: Description */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">Description (optional)</label>
        <textarea
          rows="4"
          placeholder="Enter a brief description"
          className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          value={editingSession.description || ""}
          onChange={(e) => setEditingSession({ ...editingSession, description: e.target.value })}
        />
      </div>

      {/* Google Meet Link for Edit Session */}
<div className="mb-6">
  <label className="block text-sm font-medium text-gray-300 mb-2">
    <Link2 className="inline h-4 w-4 mr-1" />
    Google Meet Link
  </label>
  <input
    type="url"
    placeholder="https://meet.google.com/..."
    className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
    value={editingSession.meetLink || ""}
    onChange={(e) => setEditingSession({ ...editingSession, meetLink: e.target.value })}
  />
</div>
      {/* Tags Input for Edit Session */}
<div className="mb-6">
  <label className="block text-sm font-medium text-gray-300 mb-2">
    <Tag className="inline h-4 w-4 mr-1" />
    Tags
  </label>
  <div className="bg-slate-700 border border-slate-600 rounded-lg p-3">
    <input
      type="text"
      placeholder="Add a tag and press Enter"
      className="w-full bg-transparent text-white placeholder-gray-400 outline-none mb-3"
      value={editTagInput}
      onChange={(e) => setEditTagInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && editTagInput.trim() !== "") {
          e.preventDefault();
          const newTag = editTagInput.trim();
          // Check if tag already exists
          if (!editingSession.tags.includes(newTag)) {
            setEditingSession({
              ...editingSession,
              tags: [...(editingSession.tags || []), newTag],
            });
          }
          setEditTagInput("");
        }
      }}
    />
    <div className="flex flex-wrap gap-2">
      {(editingSession.tags || []).map((tag, index) => (
        <span
          key={index}
          className="bg-blue-500/60 text-white px-3 py-1 rounded-full text-sm flex items-center"
        >
          #{tag}
          <button
            onClick={() =>
              setEditingSession({
                ...editingSession,
                tags: editingSession.tags.filter((_, i) => i !== index),
              })
            }
            className="ml-2 text-blue-400 hover:text-red-400 transition-colors"
          >
            ×
          </button>
        </span>
      ))}
    </div>
  </div>
</div>


       {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveEditedSession}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
        )}</div>
  </div>
)}