import React from 'react';
import { FaUserTie, FaFileAlt, FaLaptopCode, FaChartLine, FaHandshake, FaComments } from 'react-icons/fa';

const Services2 = () => {
  // Common interview questions and answers
  const interviewQuestions = [
    {
      question: "Tell me about yourself",
      answer: "Focus on your professional background, key skills, and achievements relevant to the position. Keep it concise (2-3 minutes). Example: 'I'm a software engineer with 5 years of experience specializing in React and Node.js. At my current company, I led a team that improved application performance by 40%.'"
    },
    {
      question: "What is your greatest weakness?",
      answer: "Choose a real weakness you're improving, and show how you're addressing it. Example: 'I used to struggle with public speaking, so I joined Toastmasters and now lead monthly team presentations.'"
    },
    {
      question: "Explain amplitude to a non-technical person",
      answer: "Amplitude is a product analytics tool that helps companies understand how people use their digital products. Imagine it like a dashboard showing which features users love, where they get stuck, and what makes them come back - helping businesses improve their apps and websites."
    },
    {
      question: "Why do you want to work here?",
      answer: "Show you've researched the company. Mention specific products, values, or projects that align with your skills. Example: 'I admire your commitment to sustainable energy solutions, and my background in solar panel tech would let me contribute meaningfully to your current projects.'"
    }
  ];

  // Resume tips
  const resumeTips = [
    "Keep it to 1 page (2 pages max for senior roles)",
    "Use strong action verbs: 'Led', 'Developed', 'Increased'",
    "Quantify achievements: 'Boosted sales by 27% in Q3'",
    "Tailor your resume for each job application",
    "Include relevant keywords from the job description",
    "Clean, professional format with consistent formatting"
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Career Success Services
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
          Everything you need to land your dream job and grow your career
        </p>
      </div>

      {/* Main Services Grid */}
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-3 mb-20">
        {/* Interview Prep Card */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <FaUserTie className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Interview Preparation</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Master your next interview with our comprehensive preparation resources and mock interviews.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>100+ common questions with sample answers</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Behavioral interview strategies</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Technical interview practice</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Resume Help Card */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <FaFileAlt className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Resume & Cover Letter</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Get your application materials polished and ready to impress recruiters.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Pro Tips:</h4>
              <ul className="space-y-2 text-sm">
                {resumeTips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Tech Interview Card */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FaLaptopCode className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Technical Coaching</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Specialized preparation for technical roles in software engineering, data science, and more.
            </p>
            <div className="space-y-2">
              <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#DSA</span>
              <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#SystemDesign</span>
              <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#SQL</span>
              <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Python</span>
            </div>
          </div>
        </div>

        {/* Career Growth Card */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <FaChartLine className="text-yellow-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Career Growth</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Strategies to advance your career and negotiate better compensation.
            </p>
            <ul className="space-y-2">
              <li>Promotion roadmaps</li>
              <li>Salary negotiation techniques</li>
              <li>Building leadership skills</li>
              <li>Transitioning to management</li>
            </ul>
          </div>
        </div>

        {/* Networking Card */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <FaHandshake className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Networking</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Build valuable professional connections that can accelerate your career.
            </p>
            <ul className="space-y-2">
              <li>LinkedIn optimization</li>
              <li>Effective outreach strategies</li>
              <li>Industry event participation</li>
              <li>Informational interviews</li>
            </ul>
          </div>
        </div>

        {/* Mock Interviews Card */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 p-3 rounded-full mr-4">
                <FaComments className="text-indigo-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Mock Interviews</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Practice with industry professionals and get detailed feedback.
            </p>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h4 className="font-semibold text-indigo-800 mb-2">Available Tracks:</h4>
              <ul className="grid grid-cols-2 gap-2 text-sm">
                <li>Tech (Software)</li>
                <li>Product Management</li>
                <li>Data Science</li>
                <li>Finance</li>
                <li>Consulting</li>
                <li>Marketing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Interview Q&A Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-20">
        <div className="p-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Common Interview Questions</h2>
            <p className="mt-2 text-lg text-gray-600">Prepare answers to these frequently asked questions</p>
          </div>
          
          <div className="space-y-8">
            {interviewQuestions.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">{item.question}</h3>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-10 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to accelerate your career?</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Join thousands of professionals who've landed their dream jobs with our help
        </p>
        <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg text-lg hover:bg-gray-100 transition duration-300">
          Get Started Today
        </button>
      </div>
    </div>
  );
};

export default Services2;