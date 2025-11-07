import React from 'react';
import { Link } from 'react-router-dom';

const companies = [
  { Phone: '#123456789', vendor: 'TechnoSoft LLC', Role: 'Developer', User: '$52000', Currency: '$ Dollar', Company: 'Paid', name: 'Acme Technologies' },
  { Phone: '#56787654', vendor: 'GreenLeaf Enterprises', Role: 'Manager', User: '$41000', Currency: '€ Euro', Company: 'Unpaid', name: 'BlueSky Solutions' },
  { Phone: '#9101544', vendor: 'CyberVision Ltd.', Role: 'Designer', User: '$35000', Currency: '$ Dollar', Company: 'Paid', name: 'NovaCore Systems' },
  { Phone: '#11214554', vendor: 'Alpha Innovations', Role: 'Support', User: '$27500', Currency: 'Yen JPY', Company: 'Pending', name: 'Quantum Dynamics' },
  { Phone: '#31414545', vendor: 'Innovative Systems', Role: 'QA Specialist', User: '$47000', Currency: '$ Dollar', Company: 'Unpaid', name: 'FusionWorks' },
  { Phone: '#516123255', vendor: 'FutureTech Solutions', Role: 'Project Manager', User: '$60000', Currency: 'Yen JPY', Company: 'Paid', name: 'PixelTech Innovations' },
  { Phone: '#71813288', vendor: 'Visionary Partners', Role: 'Marketing Specialist', User: '$32000', Currency: '$ Dollar', Company: 'Paid', name: 'EcoWave Enterprises' },
  { Phone: '#92029723', vendor: 'TechBridge', Role: 'Business Analyst', User: '$46000', Currency: '$ Dollar', Company: 'Unpaid', name: 'Skyline Analytics' },
  { Phone: '#22333443', vendor: 'RedTech Inc.', Role: 'Sales Representative', User: '$39000', Currency: '$ Dollar', Company: 'Paid', name: 'StarBridge Solutions' },
  { Phone: '#44555688', vendor: 'SolarFlare Energy', Role: 'HR Coordinator', User: '$54000', Currency: 'RS PKR', Company: 'Pending', name: 'SolarX Energy' },
];




// Calculate total companies, active companies, and pending payments
const totalCompanies = companies.length;
const activeCompanies = companies.filter(company => company.Company !== 'Unpaid').length;
const pendingPayments = companies.filter(company => company.Company === 'Unpaid')
  .reduce((acc, company) => acc + parseFloat(company.User.replace('$', '').replace(',', '')), 0).toFixed(2);

const CompanyListing = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex justify-between gap-12">
        {/* Total Companies */}
        <div className="bg-gray-50 rounded-xl p-6 w-full flex items-center justify-between border border-gray-200">
          <div>
            <p className="text-sm font-medium text-gray-700">Total Companies</p>
            <p className="text-3xl font-bold text-black mt-1">{totalCompanies}</p>
          </div>
          <div className="text-gray-500">
            <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        </div>

        {/* Active Companies */}
        <div className="bg-gray-50 rounded-xl p-6 w-full flex items-center justify-between border border-gray-200">
          <div>
            <p className="text-sm font-medium text-gray-700">Active Companies</p>
            <p className="text-3xl font-bold text-black mt-1">{activeCompanies}</p>
          </div>
          <div className="text-gray-500">
            <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Pending Payments */}
        <div className="bg-gray-50 rounded-xl p-6 w-full flex items-center justify-between border border-gray-200">
          <div>
            <p className="text-sm font-medium text-gray-700">Pending Payments</p>
            <p className="text-3xl font-bold text-black mt-1">${pendingPayments}</p>
          </div>
          <div className="text-gray-500">
            <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-3 mb-6">
        <h2 className="text-xl font-bold text-gray-800">Companies</h2>
        <div className="flex justify-center gap-3">
          {/* Link to CreateVendorForm */}
          <Link to="/CreateCompanyForm">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-300">
              + Create Company
            </button>
          </Link>

          
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white table-auto">
          <thead>
            <tr className="border-b bg-gray-100">
                            <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Comany</th>

              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Vendor</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Phone</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                                <td className="py-3 px-6 text-sm text-gray-700">{company.name}</td>

                <td className={`py-3 px-6 text-sm ${company.Company === 'Paid' ? 'text-green-600' : company.Company === 'Unpaid' ? 'text-red-600' : 'text-yellow-600'}`}>
                  <span className={`px-3 py-1 rounded-lg ${company.Company === 'Paid' ? 'bg-green-100' : company.Company === 'Unpaid' ? 'bg-red-100' : 'bg-yellow-100'}`}>
                    {company.Company}
                  </span>
                </td>

                <td className="py-3 px-6 text-sm text-gray-700">{company.vendor}</td>
                <td className="py-3 px-6 text-sm text-gray-700">{company.Phone}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CompanyListing;
