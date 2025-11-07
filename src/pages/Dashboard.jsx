import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const quickActions = [
    {
      title: "Add New Tenant User",
      desc: "Create and manage tenant-level users.",
      tag: "ADMIN",
      link: "/TenantUserForm" // Link to the form for adding a new tenant user
    },
    {
      title: "Vendor Overview",
      desc: "High-level overview of vendors.",
      tag: "REPORT",
      link: "/CreateVendorForm" // Link to the form for creating a new vendor
    },
    {
      title: "Company Overview",
      desc: "Snapshot of all companies.",
      tag: "ANALYTICS",
      link: "/CreateCompanyForm" // Link to the form for creating a new company
    },
    {
      title: "Item Overview",
      desc: "Summary of items and SKUs.",
      tag: "INVENTORY",
      link: "/CreateItemForm" // Link to the form for creating a new item
    },
  
  ];

  return (
    <div className="min-h-screen  ">
      <div className="mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Dashboard
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Welcome to your private dashboard. Monitor tenants, vendors, and
              companies at a glance.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-slate-600 shadow-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-1000" />
            System Status: <span className="text-emerald-600">Operational</span>
          </div>
        </header>

        {/* Quick Actions */}
      

        {/* Vendor User Assignments */}
      <section>
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-1000">
            Quick Actions
          </h2>
          <div className="mt-3 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  {quickActions.map((item) => (
    <div key={item.title} className="group rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-1000">
        {item.title}
      </h3>
      <p className="mt-2 text-sm text-slate-700">{item.desc}</p>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-1000">
        <Link to={item.link} className="text-blue-500">
          Open
        </Link>
        <span className="rounded-full bg-gray-50 px-2 py-1 text-[10px] font-medium">
          {item.tag}
        </span>
      </div>
    </div>
  ))}
</div>

        </section>

        {/* Vendor Overview */}
        <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-1000">
              Vendor Overview
            </h2>
            <span className="text-xs text-slate-1000">
              SLA &amp; payment status
            </span>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {/* Total Vendors */}
            <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-5 py-4">
              <div>
                <p className="text-xs font-medium text-slate-1000">
                  Total Vendors
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                  54
                </p>
                <p className="mt-1 text-xs text-slate-1000">
                  Across all tenants
                </p>
              </div>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                {/* Store Icon */}
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 10l1-5h14l1 5" />
                  <path d="M5 10h14v9H5z" />
                  <path d="M9 14h6" />
                </svg>
              </span>
            </div>

            {/* Active Vendors */}
            <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-5 py-4">
              <div>
                <p className="text-xs font-medium text-slate-1000">
                  Active Vendors
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                  37
                </p>
                <p className="mt-1 text-xs text-emerald-600">
                  69% in good standing
                </p>
              </div>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                {/* Check Icon */}
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </span>
            </div>

            {/* Pending Payments */}
            <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-5 py-4">
              <div>
                <p className="text-xs font-medium text-slate-1000">
                  Pending Payments
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                  12
                </p>
                <p className="mt-1 text-xs text-amber-600">
                  Review before month-end
                </p>
              </div>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                {/* Money Icon */}
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="6" width="18" height="12" rx="2" />
                  <circle cx="12" cy="12" r="3" />
                  <path d="M7 10h.01" />
                  <path d="M17 14h.01" />
                </svg>
              </span>
            </div>
          </div>
        </section>

        {/* Tenant Overview */}
        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-1000">
              Tenant Overview
            </h2>
            <span className="text-xs text-slate-1000">
              License utilization &amp; activity
            </span>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {/* Total Tenants */}
            <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-5 py-4">
              <div>
                <p className="text-xs font-medium text-slate-1000">
                  Total Tenants
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                  12
                </p>
                <p className="mt-1 text-xs text-slate-1000">
                  Managed environments
                </p>
              </div>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                {/* Home Icon */}
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 11l8-7 8 7" />
                  <path d="M5 10v9h14v-9" />
                  <path d="M10 19v-5h4v5" />
                </svg>
              </span>
            </div>

            {/* Active Tenants */}
            <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-5 py-4">
              <div>
                <p className="text-xs font-medium text-slate-1000">
                  Active Tenants
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                  9
                </p>
                <p className="mt-1 text-xs text-emerald-600">
                  75% actively using
                </p>
              </div>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                {/* Bolt Icon */}
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M13 2L4 14h7l-1 8 9-12h-7z" />
                </svg>
              </span>
            </div>

            {/* Inactive Tenants */}
            <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-5 py-4">
              <div>
                <p className="text-xs font-medium text-slate-1000">
                  Inactive Tenants
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                  3
                </p>
                <p className="mt-1 text-xs text-amber-600">
                  Monitor for churn risk
                </p>
              </div>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-red-100 text-red-400">
                {/* Pause Icon */}
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="7" y="4" width="3" height="16" rx="1" />
                  <rect x="14" y="4" width="3" height="16" rx="1" />
                </svg>
              </span>
            </div>
          </div>
        </section>

        {/* Company Overview */}
        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-1000">
              Company Overview
            </h2>
            <span className="text-xs text-slate-1000">
              Company health &amp; activity
            </span>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {/* Total Companies */}
            <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-5 py-4">
              <div>
                <p className="text-xs font-medium text-slate-1000">
                  Total Companies
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                  34
                </p>
                <p className="mt-1 text-xs text-slate-1000">
                  Linked to tenants
                </p>
              </div>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                {/* Building Icon */}
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="4" y="3" width="8" height="18" rx="1" />
                  <rect x="14" y="8" width="6" height="13" rx="1" />
                  <path d="M8 7h.01M8 11h.01M8 15h.01M17 12h.01M17 16h.01" />
                </svg>
              </span>
            </div>

            {/* Active Companies */}
            <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-5 py-4">
              <div>
                <p className="text-xs font-medium text-slate-1000">
                  Active Companies
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                  25
                </p>
                <p className="mt-1 text-xs text-emerald-600">
                  +4 in the last quarter
                </p>
              </div>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                {/* Chart Icon */}
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 19V5" />
                  <path d="M9 19v-7" />
                  <path d="M14 19v-4" />
                  <path d="M19 19v-10" />
                </svg>
              </span>
            </div>

            {/* Inactive Companies */}
            <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-5 py-4">
              <div>
                <p className="text-xs font-medium text-slate-1000">
                  Inactive Companies
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                  9
                </p>
                <p className="mt-1 text-xs text-amber-600">
                  Follow-up recommended
                </p>
              </div>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-yellow-100 text-yellow-500">
                {/* Clock Icon */}
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
