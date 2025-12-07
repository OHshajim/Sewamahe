import { useState, useEffect } from "react";

const SimpleWelcomePage = () => {
  const [currentTime, setCurrentTime] = useState("");

  // Update time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      setCurrentTime(now.toLocaleDateString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Stats data
  const stats = [
    { label: "Projects Completed", value: "48" },
    { label: "Happy Clients", value: "32" },
    { label: "Active Users", value: "1,254" },
    { label: "Team Members", value: "12" },
  ];

  // Quick actions
  const quickActions = [
    { title: "Create Project", description: "Start a new project" },
    { title: "View Reports", description: "Check analytics" },
    { title: "Add Team Member", description: "Invite new member" },
    { title: "Settings", description: "Configure preferences" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto">
      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Welcome Header */}
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Welcome Back, <span className="text-gray-700">Admin</span>
          </h1>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            Manage your dashboard, monitor activities, and track performance from one place
          </p>
          <div className="mt-4 text-sm sm:text-base text-gray-500">
            {currentTime}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 md:mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-5 sm:p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm sm:text-base">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-10 md:mb-16">
          <div className="p-6 sm:p-8 md:p-10">
            
            {/* Welcome Message */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Dashboard Overview
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Everything you need to manage your platform is right here. Monitor key metrics, 
                track user activities, and make data-driven decisions with our comprehensive 
                dashboard tools.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="mb-8 md:mb-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className="bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-xl p-5 text-left transition-all duration-300 hover:border-gray-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    <div className="text-gray-900 font-semibold text-lg mb-2">
                      {action.title}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {action.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Updates */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Recent Updates
              </h3>
              <div className="space-y-4">
                {[
                  { title: "System Update", desc: "Version 2.1 deployed successfully", time: "2 hours ago" },
                  { title: "New Feature", desc: "Added advanced analytics module", time: "Yesterday" },
                  { title: "Security Patch", desc: "Applied latest security updates", time: "3 days ago" },
                ].map((update, index) => (
                  <div 
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div>
                      <div className="font-medium text-gray-900">{update.title}</div>
                      <div className="text-gray-600 text-sm mt-1">{update.desc}</div>
                    </div>
                    <div className="text-gray-500 text-sm mt-2 sm:mt-0">
                      {update.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="bg-gray-50 border-t border-gray-200 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="mb-4 sm:mb-0">
                <div className="text-gray-900 font-semibold mb-1">
                  Need Help?
                </div>
                <div className="text-gray-600 text-sm">
                  Check our documentation or contact support
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-700">
                  Documentation
                </button>
                <button className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-300">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center pb-8 md:pb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to get started?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Explore all features and make the most out of your dashboard experience.
          </p>
          <button className="px-8 py-3.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2">
            Explore Dashboard
          </button>
        </div>

        {/* Additional space for scrolling */}
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default SimpleWelcomePage;