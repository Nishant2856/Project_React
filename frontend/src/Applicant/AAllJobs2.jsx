import React, { useState } from "react";

const AAllJobs2 = () => {
  const [applicationStatus, setApplicationStatus] = useState("not_applied");

  const job = {
    title: "Senior AR Caller - Experienced",
    company: "Firstsource",
    rating: "3.7",
    reviews: "4.5k+",
    experience: "1-4 Yrs",
    salary: "Not disclosed",
    location: "Chennai",
    time: "Monday to Friday, 1:00 PM - 4:00 PM",
    venue: "RMZ Millenia business park, Phase 2, 2nd floor, Campus 4A, MGR main road, Perungudi, Chennai, 600096.",
    contact: "Abhilash CB (9994685103)",
    email: "abhilash.cbb@firstsource.com",
    posted: "Just now",
    logo: "/firstsource.gif",
    banner: "/firstsource_banner2.jpg",
  };

  const toggleApplicationStatus = () => {
    setApplicationStatus(prevStatus => 
      prevStatus === "not_applied" ? "applied" : "not_applied"
    );
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

          {/* Job Description Section */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Job Description</h3>
            <div className="space-y-4 text-gray-700">
              <p><span className="font-semibold">Greetings from Firstsource Solutions LTD!</span></p>
              
              <div>
                <h4 className="font-semibold">ABOUT US:</h4>
                <p>Firstsource Solutions Limited, an RP-Sanjiv Goenka Group company (NSE: FSL, BSE: 532809, Reuters: FISO.BO, Bloomberg: FSOL:IN), is a leading provider of transformational solutions and services spanning the customer lifecycle across Healthcare, Banking and Financial Services, Communications, Media and Technology, and other industries.</p>
                <p className="mt-2">The Company's Digital First, Digital Now approach helps organizations reinvent operations and reimagine business models, enabling them to deliver moments that matter and build competitive advantage.</p>
                <p className="mt-2">With an established presence in the US including over a dozen offices, and multiple sites in the UK, India, the Philippines and Mexico, we act as a trusted growth partner for over 150 leading global brands, including several Fortune 500 and FTSE 100 companies.</p>
                <p className="mt-2">Website: <a href="http://www.firstsource.com" className="text-blue-600">http://www.firstsource.com</a></p>
              </div>

              <div>
                <h4 className="font-semibold">Position: Senior AR Caller</h4>
                <h5 className="font-semibold mt-2">Responsibilities:</h5>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Understand Revenue Cycle Management (RCM) of US Healthcare Providers</li>
                  <li>Good knowledge on Denials and Immediate action to resolve them</li>
                  <li>Reviews the work order</li>
                  <li>Follow-up with insurance carriers for claim status</li>
                  <li>Follow-up with insurance carriers to check status of outstanding claims</li>
                  <li>Receive payment information if the claims has been processed</li>
                  <li>Analyze claims in case of rejections</li>
                  <li>Ensure deliverables adhere to quality standards</li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold">Eligibility Criteria:</h5>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Candidates should have experience in AR Calling, Denials Management, Web Portals Denial Claims</li>
                  <li>Minimum 1.5 years experience in Physician Billing or Hospital Billing</li>
                  <li>Work from Office mode</li>
                  <li>Immediate Joiners and candidates those who are in notice period can apply</li>
                  <li>Should have proper documents (Education certificates, offer letter, Pay-slips, Relieving letter etc.)</li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold">Key Skills:</h5>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Good Knowledge in AR Calling</li>
                  <li>Excellent Communication Skill</li>
                  <li>Listening & Comprehension</li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold">Shift:</h5>
                <p>Night shift</p>
                <p className="mt-1">Cab Boundary Limit: We provide cab up to 30 km (One way drop cab | Doorstep only) from the below venue.</p>
              </div>

              <div>
                <h5 className="font-semibold">Walk-In Details:</h5>
                <p>Walk-In Days: Monday to Friday</p>
                <p>Walk-In Time: 1:00 PM - 4:00 PM</p>
                <p className="mt-1 font-semibold">Note: Mention reference name (ABHILASH) on top of your resume.</p>
              </div>

              <div>
                <h5 className="font-semibold">Contact:</h5>
                <p>{job.contact}</p>
                <p>Email: <a href={`mailto:${job.email}`} className="text-blue-600">{job.email}</a></p>
                <p className="mt-1">Kindly refer your friends as well!!!</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h5 className="font-semibold">Role:</h5>
                  <p>Customer Success, Service & Operations - Other</p>
                </div>
                <div>
                  <h5 className="font-semibold">Industry Type:</h5>
                  <p>BPM / BPO</p>
                </div>
                <div>
                  <h5 className="font-semibold">Department:</h5>
                  <p>Customer Success, Service & Operations</p>
                </div>
                <div>
                  <h5 className="font-semibold">Employment Type:</h5>
                  <p>Full Time, Permanent</p>
                </div>
                <div>
                  <h5 className="font-semibold">Role Category:</h5>
                  <p>Customer Success, Service & Operations - Other</p>
                </div>
                <div>
                  <h5 className="font-semibold">Education:</h5>
                  <p>UG: Any Graduate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Time and Venue */}
          <div className="mt-8 bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold">Time and Venue</h3>
            <p className="mt-2">🕒 {job.time}</p>
            <p className="mt-1">📍 {job.venue}</p>
            <p className="mt-1">📞 Contact: {job.contact}</p>
            <p className="mt-1">📧 Email: <a href={`mailto:${job.email}`} className="text-blue-600">{job.email}</a></p>
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-between items-center">
            <p className="text-sm text-gray-500">Posted: {job.posted}</p>
            <button 
              className={`px-6 py-2 rounded-full shadow-md text-white ${
                applicationStatus === "applied" 
                  ? "bg-green-600 hover:bg-green-700" 
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              onClick={toggleApplicationStatus}
            >
              {applicationStatus === "applied" ? "Applied" : "I am interested"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AAllJobs2;