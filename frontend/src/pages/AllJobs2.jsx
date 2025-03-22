import React from "react";

const AllJobs2 = () => {
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
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700">
              I am interested
            </button>
          </div>
        </div>

        {/* Job Description Card */}
        <div className="mt-8 bg-white shadow-lg rounded-xl p-10 text-lg text-gray-700">
          <h2 className="text-2xl font-bold mb-4">Job Description</h2>
          <p><strong>Greetings from Firstsource solutions LTD !!</strong></p>
          <p><strong>ABOUT US:</strong> Firstsource Solutions Limited, an RP-Sanjiv Goenka Group company, is a leading provider of transformational solutions across Healthcare, Banking and Financial Services, Communications, Media, and Technology.</p>
          <p>With an established presence in the US, UK, India, the Philippines, and Mexico, we act as a trusted growth partner for over 150 leading global brands.</p>
          <p><strong>Website:</strong> <a href="http://www.firstsource.com" className="text-blue-500">http://www.firstsource.com</a></p>
          
          <h3 className="text-xl font-semibold mt-4">Position: Senior AR Caller</h3>
          <ul className="list-disc ml-5">
            <li>Understand Revenue Cycle Management (RCM) of US Healthcare Providers.</li>
            <li>Good knowledge of Denials and Immediate action to resolve them.</li>
            <li>Follow-up with insurance carriers for claim status.</li>
            <li>Analyze claims in case of rejections.</li>
            <li>Ensure deliverables adhere to quality standards.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-4">Eligibility Criteria:</h3>
          <ul className="list-disc ml-5">
            <li>Minimum 1.5 years experience in Physician or Hospital Billing.</li>
            <li>Work from Office mode.</li>
            <li>Immediate Joiners preferred.</li>
            <li>Should have proper documents (Education certificates, Pay-slips, etc.).</li>
          </ul>

          <h3 className="text-xl font-semibold mt-4">Key Skills:</h3>
          <ul className="list-disc ml-5">
            <li>Good Knowledge in AR Calling.</li>
            <li>Excellent Communication Skill.</li>
            <li>Listening & Comprehension.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-4">Shift:</h3>
          <p>Night shift</p>
          <p><strong>Cab Boundary Limit:</strong> We provide cab up to 30 km (One way drop cab | Doorstep only).</p>
          <p><strong>Venue:</strong> {job.venue}</p>
          <p><strong>Walk-In Details:</strong> Monday to Friday, 1:00 PM - 4:00 PM</p>
          <p><strong>Contact:</strong> {job.contact} | <a href="mailto:abhilash.cbb@firstsource.com" className="text-blue-500">abhilash.cbb@firstsource.com</a></p>
        </div>
      </div>
    </div>
  );
};

export default AllJobs2;
