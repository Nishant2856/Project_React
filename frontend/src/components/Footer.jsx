import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-10 mt-10 border-t">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Logo Section */}
        <div className="flex flex-col items-center md:items-start">
          <img src="/logo2.png" alt="Job Vault Logo" className="w-20 mb-2" />
          <h1 className="text-xl font-bold">JOB VAULT</h1>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 gap-6 text-sm">
          <ul className="space-y-2">
            <li>
              <Link to="#" className="hover:underline">
                About us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">
                Careers
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">
                Employer home
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">
                Help center
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">
                Report issues
              </Link>
            </li>
          </ul>

          <ul className="space-y-2">
            <li>
              <Link to="#" className="hover:underline">
                Report fraud
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">
                Trust & safety
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Logos */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          <img
            src="/airtel.gif"
            alt="Airtel"
            className="w-12 h-12 object-contain"
          />
          <img
            src="/firstsource.gif"
            alt="Firstsource"
            className="w-12 h-12 object-contain"
          />
          <img
            src="/reliance.gif"
            alt="Reliance"
            className="w-12 h-12 object-contain"
          />
          <img
            src="/amazon.gif"
            alt="Amazon"
            className="w-12 h-12 object-contain"
          />
          <img
            src="/apple.gif"
            alt="Apple"
            className="w-12 h-12 object-contain"
          />
          <img src="/jio.gif" alt="Jio" className="w-12 h-12 object-contain" />
          <img
            src="/hitachi.gif"
            alt="Hitachi Energy"
            className="w-12 h-12 object-contain"
          />
          <img src="/tcs.gif" alt="TCS" className="w-12 h-12 object-contain" />
        </div>
      </div>

      {/* Privacy Policy & Copyright Section */}
      <div className="text-center text-sm mt-6 border-t pt-4">
        <p>© {new Date().getFullYear()} Job Vault. All Rights Reserved.</p>
        <Link to="#" className="hover:underline font-semibold">
          Privacy Policy
        </Link>{" "}
        &nbsp; | &nbsp;
        <Link to="#" className="hover:underline font-semibold">
          Terms & Conditions
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
