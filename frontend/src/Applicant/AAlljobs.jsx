import React from "react";
import { useNavigate } from "react-router-dom";

const AAllJobs = () => {
  const navigate = useNavigate();

  const jobs = [
    {
      title: "Senior AR Caller - Experienced",
      company: "Firstsource",
      rating: "3.7",
      reviews: "4.5k+",
      experience: "1-4 Yrs",
      salary: "Not disclosed",
      location: "Chennai",
      description:
        "Minimum 1.5 years experience in Physician or Hospital Billing, knowledge in AR Calling and Denial Management.",
      tags: [
        "Revenue cycle management",
        "AR Calling",
        "US Healthcare",
        "Denial Management",
        "Medical Billing",
      ],
      logo: "/firstsource.gif",
      isNew: true,
    },
    {
      title: "International Chat Process - Non Voice",
      company: "Firstsource",
      rating: "3.7",
      reviews: "4.5k+",
      experience: "0 Yrs",
      salary: "2-3.5 Lacs PA",
      location: "Mumbai, Mumbai Suburban, Malad west",
      description:
        "Graduate or HSC with customer service skills. Provide customer service via chat, update accounts, and handle queries.",
      tags: ["Non Voice", "Email Process", "Chat Support", "Web Chat"],
      logo: "/firstsource.gif",
      isNew: false,
    },
    {
      title: "Back Office Executive",
      company: "Firstsource",
      rating: "3.7",
      reviews: "4.5k+",
      experience: "0 Yrs",
      salary: "1.2-2.5 Lacs PA",
      location: "Mumbai, Mumbai Suburban",
      description:
        "HSC with 1 year experience or graduate freshers (excluding B.Tech/B.E.). Back office support including data entry and email process.",
      tags: ["Back Office", "Non Voice", "Data Entry", "Email Process"],
      logo: "/firstsource.gif",
      isNew: true,
    },
  ];

  return (
    <div className="bg-blue-50 min-h-screen p-6">
      <div className="relative w-full h-full bg-gray-900 text-white overflow-hidden rounded-xl">
        <img
          src="/firstsource_banner.jpg"
          alt="Company Banner"
          className="w-full h-full object-cover opacity-80 rounded-xl"
        />
      </div>

      <div className="relative bg-white shadow-lg rounded-lg -mt-16 p-6 max-w-6xl mx-auto flex items-center">
        <img
          src="/firstsource.gif"
          alt="Firstsource"
          className="w-20 h-20 rounded-full shadow-md border-2 border-gray-200 mr-4"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Firstsource</h2>
          <p className="text-yellow-600 text-sm">
            ⭐ 3.7 ({jobs[0].reviews} reviews)
          </p>
          <p className="text-gray-600 text-sm">Digital first, digital now</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-6 grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <h3 className="text-xl font-bold mb-4">Jobs</h3>
          {jobs.map((job, index) => (
            <div
              key={index}
              className="relative bg-white p-4 rounded-lg shadow-md mb-4 hover:shadow-lg transition"
            >
              <h4 className="text-lg font-semibold">{job.title}</h4>
              <p className="text-gray-600">
                {job.company} ⭐ {job.rating} ({job.reviews} reviews)
              </p>
              <p className="text-sm text-gray-500">📍 {job.location}</p>
              <p className="text-sm text-gray-500">
                💼 {job.experience} | 💰 {job.salary}
              </p>
              <p className="text-sm text-gray-700 mt-2">{job.description}</p>
              <div className="flex flex-wrap mt-2">
                {job.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-200 text-xs px-2 py-1 rounded-full mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {job.isNew && (
                <span className="text-red-500 text-xs font-semibold">New</span>
              )}
              
              <div className="absolute bottom-3 right-3">
                <button
                  onClick={() => navigate(`/aall-jobs-2`)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs hover:bg-blue-700 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">About Us</h3>
          <p className="text-sm text-gray-600">
            Firstsource is purpose-led and people-first. We create value for our
            global clients by elevating their customers’ experience at every
            interaction, be it a call, click, tap, message, or chat. Delivering
            a great experience to clients starts on the inside – by connecting
            every Firstsourcer to the role’s purpose. We upskill our people in
            new-age technologies and focus on supporting their physical,
            financial, and mental well-being. The result? Everyone aligned to
            our ‘Digital First, Digital Now’ strategy, our north star, where we
            pair technology and human touch.
          </p>
          <h3 className="text-lg font-semibold mt-4">More Information</h3>
          <ul className="text-sm text-gray-600">
            <li>
              <strong>Type:</strong> Public
            </li>
            <li>
              <strong>Company Size:</strong> 10000-50000
            </li>
            <li>
              <strong>Founded:</strong> 2001
            </li>
            <li>
              <strong>Headquarters:</strong> Mumbai, Maharashtra
            </li>
            <li>
              <strong>Website:</strong> 
              <a href="https://www.firstsource.com/" className="text-blue-500">
                Visit
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AAllJobs;