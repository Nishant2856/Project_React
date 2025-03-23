import { useNavigate } from "react-router-dom";

const AllJobs2 = () => {
  const navigate = useNavigate();

  const job = {
    title: "Senior AR Caller - Experienced",
    company: "Firstsource",
    rating: "3.7",
    reviews: "4.5k+",
    experience: "1-4 Yrs",
    salary: "Not disclosed",
    location: "Chennai",
    time: "24 February - 5th March, 1:00 PM - 5:00 PM",
    venue: "RMZ Millenia business park, Phase 2, 2nd floor, Campus 4A, MGR main road, Perungudi, Chennai, 600096.",
    contact: "Abhilash (9994685103)",
    posted: "Just now",
    logo: "/firstsource.gif",
    banner: "/firstsource_banner2.jpg",
  };

  // ✅ Handle button click - Redirect to AllJobs page
  const handleInterestClick = () => {
    navigate("/login"); 
  };

  return (
    <div className="bg-blue-50 min-h-screen w-full flex justify-center">
      <div className="p-6 w-full max-w-7xl"> 
        {/* Banner Section */}
        <div className="relative w-full h-72 rounded-xl overflow-hidden shadow-lg">
          <img
            src={job.banner}
            alt="Company Banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Job Card */}
        <div className="mt-6 bg-white shadow-lg rounded-xl p-10 w-full">
          {/* Job Header */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">{job.title}</h2>
              <p className="text-gray-600 flex items-center">
                {job.company} ⭐ {job.rating} ({job.reviews} reviews)
              </p>
            </div>
            <img src={job.logo} alt="Company Logo" className="w-14 h-14" />
          </div>

          {/* Job Details */}
          <div className="mt-4 text-gray-600 text-lg">
            <p>📅 {job.experience} | 💰 {job.salary}</p>
            <p>📍 {job.location}</p>
          </div>

          {/* Time and Venue */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Time and Venue</h3>
            <p>🕒 {job.time}</p>
            <p>📍 {job.venue}</p>
            <p>📞 Contact: {job.contact}</p>
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-between items-center">
            <p className="text-sm text-gray-500">Posted: {job.posted}</p>
            <button 
              className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700"
              onClick={handleInterestClick} // Redirect to AllJobs
            >
              I am interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllJobs2;
