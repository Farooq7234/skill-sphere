"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  ChevronDown, 
  Clock, 
  Radio, 
  CheckCircle,
  X,
  Calendar,
  MapPin,
  User,
  Tag
} from "lucide-react";
import { databases, storage } from "../../../utils/appwrite";
import SessionNavbar from '../../../components/SessionsNavbar'
import Link from "next/link";

// Session Detail Modal Component
const SessionDetailModal = ({ session, isOpen, onClose }) => {
  if (!isOpen || !session) return null;

  // Generate Google Calendar URL
  const generateCalendarUrl = () => {
    const startDate = new Date(`${session.date}T${convertTo24Hour(session.timeFrom, session.timeFromPeriod)}`);
    const endDate = new Date(`${session.date}T${convertTo24Hour(session.timeTo, session.timeToPeriod)}`);
    
    const formatDate = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: session.title,
      dates: `${formatDate(startDate)}/${formatDate(endDate)}`,
      details: `${session.description}\n\nJoin the meeting: ${session.meetLink}`,
      location: session.meetLink,
      sf: true,
      output: 'xml'
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  // Convert 12-hour to 24-hour format
  const convertTo24Hour = (time, period) => {
    const [hours, minutes] = time.split(':');
    let hour24 = parseInt(hours);
    
    if (period === 'PM' && hour24 !== 12) {
      hour24 += 12;
    } else if (period === 'AM' && hour24 === 12) {
      hour24 = 0;
    }
    
    return `${hour24.toString().padStart(2, '0')}:${minutes}`;
  };

  const handleAddToCalendar = () => {
    const calendarUrl = generateCalendarUrl();
    window.open(calendarUrl, '_blank');
  };

  const statusColors = {
    live: "bg-green-500",
    upcoming: "bg-blue-500",
    finished: "bg-gray-500"
  };

  const statusLabels = {
    live: "Live Now",
    upcoming: "Coming Soon",
    finished: "Finished"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    
      {/* Background overlay */}
      <div 
        className="absolute inset-0 "
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
        {/* Header with image */}
        <div className="relative">
          <img 
            src={session.thumbnailUrl || "/api/placeholder/600/300"} 
            alt={session.title}
            className="w-full h-40 object-cover rounded-t-2xl"
          />
          {session.status && (
            <span className={`absolute top-4 left-4 text-sm font-semibold text-white px-3 py-1 rounded-full ${statusColors[session.status]}`}>
              {statusLabels[session.status]}
            </span>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            {session.title}
          </h2>

          {/* Tags */}
          {session.tags && session.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {session.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center text-sm px-3 py-1 text-white bg-green-500 rounded-full"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Session Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start text-gray-300">
              <Clock className="h-5 w-5 mr-3 text-blue-400 mt-0.5" />
              <div>
                <p className="font-medium text-white">Time</p>
                <p className="text-sm">{session.timeFrom} {session.timeFromPeriod} - {session.timeTo} {session.timeToPeriod}</p>
              </div>
            </div>

            <div className="flex items-start text-gray-300">
              <User className="h-5 w-5 mr-3 text-amber-400 mt-0.5" />
              <div>
                <p className="font-medium text-white">Instructor</p>
                <p className="text-sm">{session.instructor || "TBA"}</p>
              </div>
            </div>

            <div className="flex items-start text-gray-300">
              <Calendar className="h-5 w-5 mr-3 text-purple-400 mt-0.5" />
              <div>
                <p className="font-medium text-white">Date</p>
                <p className="text-sm">{new Date(session.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
            </div>

            {session.meetLink && (
              <div className="flex items-start text-gray-300">
                <MapPin className="h-5 w-5 mr-3 text-red-400 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Meeting Link</p>
                  <a 
                    href={session.meetLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:underline break-all"
                  >
                    Join Meeting
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
            <div className="text-gray-300 leading-relaxed bg-slate-700 p-4 rounded-lg">
              {session.description || "No description available for this session."}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCalendar}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Calendar className="h-5 w-5" />
              Add to Google Calendar
            </button>
            
            {session.meetLink && (
              <a
                href={session.meetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
              >
                <MapPin className="h-5 w-5" />
                Join Meeting
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// SessionCard Component
const SessionCard = ({ session, onClick }) => {
  const statusColors = {
    live: "bg-green-500",
    upcoming: "bg-blue-500",
    finished: "bg-gray-500"
  };

  const statusLabels = {
    live: "Live Now",
    upcoming: "Coming Soon",
    finished: "Finished"
  };

  return (
    <div 
      className="group flex flex-col bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full border border-slate-700 cursor-pointer"
      onClick={() => onClick(session)}
    >
      <div className="relative">
        <img 
          src={session.thumbnailUrl} 
          alt={session.title}
          className="w-full h-48 object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        {session.status && (
          <span className={`absolute top-3 left-3 text-xs font-semibold text-white px-3 py-1 rounded-full ${statusColors[session.status]}`}>
            {statusLabels[session.status]}
          </span>
        )}
      </div>
      <div className="flex flex-col p-5 flex-grow">
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
          {session.title}
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {session.tags.map((tag, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 text-white bg-green-500 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-400">
            <Clock className="h-4 w-4 mr-1" />
            <span>{session.timeFrom} - {session.timeTo}</span>
          </div>
          <div className="text-xs font-medium text-white px-2 py-1 bg-amber-400 rounded-lg">
            {session?.instructor || "Instructor Name"}
          </div>
        </div>
      </div>
    </div>
  );
};

// Sessions Loading Skeleton
const SessionCardSkeleton = () => (
  <div className="bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-slate-700 h-full">
    <div className="w-full h-48 bg-slate-700 animate-pulse"></div>
    <div className="p-5">
      <div className="h-6 bg-slate-700 animate-pulse rounded mb-4"></div>
      <div className="flex gap-2 mb-4">
        <div className="h-6 w-16 bg-slate-700 animate-pulse rounded"></div>
        <div className="h-6 w-20 bg-slate-700 animate-pulse rounded"></div>
        <div className="h-6 w-14 bg-slate-700 animate-pulse rounded"></div>
      </div>
      <div className="flex justify-between mt-4">
        <div className="h-4 w-24 bg-slate-700 animate-pulse rounded"></div>
        <div className="h-4 w-20 bg-slate-700 animate-pulse rounded"></div>
      </div>
    </div>
  </div>
);

// Tab Button Component
const TabButton = ({ active, icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 ${
      active 
        ? "bg-blue-900/30 text-blue-400 font-medium" 
        : "text-gray-300 hover:bg-slate-700/50"
    }`}
  >
    {icon}
    <span className="ml-2">{label}</span>
  </button>
);

// Main Sessions Page Component
const SessionsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    duration: null,
  });

  const handleSessionClick = (session) => {
    setSelectedSession(session);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedSession(null);
  };

useEffect(() => {
  const fetchSessions = async () => {
    // Simulate API fetch delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_SESSION_FORM_ID
      );

      // Fetch thumbnails for each document
      const fetchedSessions = await Promise.all(
        response.documents.map(async (doc) => {
          let thumbnailUrl = '';

          try {
            // Generate thumbnail preview URL
            if (doc.thumbnailId) {
              thumbnailUrl = storage.getFileView(
                process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
                doc.thumbnailId
              ).toString();
            }
          } catch (error) {
            console.error(`Error fetching thumbnail for ${doc.$id}:`, error);
          }

          return {
            id: doc.$id,
            title: doc.title,
            date: doc.date,
            timeFrom: doc.timeFrom,
            timeFromPeriod: doc.timeFromPeriod,
            timeTo: doc.timeTo,
            timeToPeriod: doc.timeToPeriod,
            description: doc.description,
            meetLink: doc.meetLink,
            tags: doc.tags,
            thumbnailId: doc.thumbnailId,
            thumbnailUrl: thumbnailUrl,
            instructor: doc.instructor,
          };
        })
      );

      setSessions(fetchedSessions);
      setFilteredSessions(fetchedSessions);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }

    setIsLoading(false);
  };

  fetchSessions();
}, []);

  // Filter sessions based on active tab, search query, and filters
  useEffect(() => {
    let filtered = [...sessions];
    
    // Filter by tab
    if (activeTab !== "all") {
      filtered = filtered.filter(session => session.status === activeTab);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        session => 
          session.title.toLowerCase().includes(query) || 
          session.tags.some(tag => tag.toLowerCase().includes(query)) ||
          (session.instructor && session.instructor.toLowerCase().includes(query))
      );
    }
    
    // Apply category filters
    if (selectedFilters.categories.length > 0) {
      filtered = filtered.filter(
        session => session.tags.some(tag => selectedFilters.categories.includes(tag))
      );
    }
    
    // Apply duration filter
    if (selectedFilters.duration) {
      // This would be implemented based on your duration filtering logic
      // Example: filtered = filtered.filter(session => ...);
    }
    
    setFilteredSessions(filtered);
  }, [activeTab, searchQuery, selectedFilters, sessions]);

  // Tab configuration
  const tabs = [
    { 
      id: "all", 
      label: "All Sessions", 
      icon: <Radio className="h-5 w-5" />
    },
    { 
      id: "live", 
      label: "Live Now", 
      icon: <Radio className="h-5 w-5 text-green-500" />
    },
    { 
      id: "upcoming", 
      label: "Upcoming", 
      icon: <Clock className="h-5 w-5 text-blue-500" />
    },
    { 
      id: "finished", 
      label: "Finished", 
      icon: <CheckCircle className="h-5 w-5 text-gray-500" />
    }
  ];

  // Filter options
  const filterCategories = ["AI", "Design", "Frontend", "Backend", "Career", "DataScience", "Marketing", "UX"];

  // Toggle filter category
  const toggleCategory = (category) => {
    setSelectedFilters(prev => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
        
      return { ...prev, categories };
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 py-8 px-4 sm:px-6 lg:px-8">
        <SessionNavbar/>
      <div className="max-w-7xl mx-auto ">
         <h1 className="text-3xl font-bold text-white mb-8 mt-10">Sessions</h1>
         <Link href="/register-ch" className="text-sm text-white px-2 py-3 rounded-xl font-semibold bg-green-500 ">Become a Community Hero</Link>
         <Link href="/dashboard" className="text-sm text-white px-2 py-3 rounded-xl font-semibold bg-blue-500 ">Go to Dashboard</Link>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mt-5 mb-8">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search sessions, topics, or instructors..."
              className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-lg bg-slate-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-gray-200 hover:bg-slate-700 transition-colors"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${filterOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {filterOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-slate-800 rounded-lg shadow-lg border border-slate-700 z-20 p-4">
                <h3 className="font-medium text-white mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {filterCategories.map(category => (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedFilters.categories.includes(category)
                          ? "bg-blue-900/30 text-blue-400"
                          : "bg-slate-700 text-gray-300"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                
                <div className="border-t border-slate-700 pt-3 flex justify-end">
                  <button
                    onClick={() => setSelectedFilters({ categories: [], duration: null })}
                    className="text-sm text-blue-400 hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-slate-800 p-2 rounded-lg shadow-sm border border-slate-700">
          {tabs.map(tab => (
            <TabButton
              key={tab.id}
              active={activeTab === tab.id}
              icon={tab.icon}
              label={tab.label}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </div>
        
        {/* Sessions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Show skeletons while loading
            Array(6).fill(0).map((_, index) => <SessionCardSkeleton key={index} />)
          ) : filteredSessions.length > 0 ? (
            // Show sessions
            filteredSessions.map(session => (
              <SessionCard 
                key={session.id} 
                session={session} 
                onClick={handleSessionClick}
              />
            ))
          ) : (
            // No results
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-slate-700 rounded-full p-6 mb-4">
                <Search className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">No sessions found</h3>
              <p className="text-gray-400 max-w-md">
                We couldn't find any sessions matching your criteria. Try adjusting your filters or search query.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Session Detail Modal */}
      <SessionDetailModal 
        session={selectedSession}
        isOpen={modalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default SessionsPage;