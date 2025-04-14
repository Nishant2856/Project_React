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

        {/* Job Description Card */}
        <div className="mt-8 bg-white shadow-lg rounded-xl p-10 text-lg text-gray-700">
          <h2 className="text-2xl font-bold mb-4">Job Description</h2>
          <p><strong>Greetings from Firstsource Solutions LTD !!</strong></p>
          <p><strong>ABOUT US:</strong> Firstsource Solutions Limited, an RP-Sanjiv Goenka Group company (NSE: FSL, BSE: 532809, Reuters: FISO.BO, Bloomberg: FSOL:IN), is a leading provider of transformational solutions and services spanning the customer lifecycle across Healthcare, Banking and Financial Services, Communications, Media and Technology, and other industries.</p>
          <p>The Company's Digital First, Digital Now approach helps organizations reinvent operations and reimagine business models, enabling them to deliver moments that matter and build competitive advantage.</p>
          <p>With an established presence in the US including over a dozen offices, and multiple sites in the UK, India, the Philippines, and Mexico, we act as a trusted growth partner for over 150 leading global brands, including several Fortune 500 and FTSE 100 companies.</p>
          <p><strong>Website:</strong> <a href="http://www.firstsource.com" className="text-blue-500">http://www.firstsource.com</a></p>
          
          <h3 className="text-xl font-semibold mt-4">Position: Senior AR Caller</h3>
          <ul className="list-disc ml-5">
            <li>Understand Revenue Cycle Management (RCM) of US Healthcare Providers.</li>
            <li>Good knowledge of Denials and Immediate action to resolve them.</li>
            <li>Reviews the work order.</li>
            <li>Follow-up with insurance carriers for claim status.</li>
            <li>Receive payment information if the claims have been processed.</li>
            <li>Analyze claims in case of rejections.</li>
            <li>Ensure deliverables adhere to quality standards.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-4">Eligibility Criteria:</h3>
          <ul className="list-disc ml-5">
            <li>Candidates should have experience in AR Calling, Denials Management, Web Portals Denial Claims.</li>
            <li>Minimum 1.5 years experience in Physician Billing or Hospital Billing.</li>
            <li>Work from Office mode.</li>
            <li>Immediate Joiners and candidates in notice period can apply.</li>
            <li>Should have proper documents (Education certificates, offer letter, Pay-slips, Relieving letter, etc.).</li>
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
