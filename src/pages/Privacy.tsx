import getWebsiteInfo from '@/actions/getWebsiteInfo';
import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';

const Privacy = () => {
      const [privacyData, setPrivacyData] = useState(null);

      useEffect(() => {
          const fetchAbout = async () => {
              try {
                  const { data } = await getWebsiteInfo();
                  if (data?.data?.about) {
                      setPrivacyData(data.data.privacy);
                  }
              } catch (err) {
                  console.error("Failed to load About Us information.", err);
              }
          };
          fetchAbout();
      }, []);
  return (
      <div className="flex flex-col h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
          <Navbar />
          <div className="flex-1 overflow-y-auto py-12 px-6 md:px-8 lg:px-12">
              <div
                  className="bg-white p-8 md:p-10 rounded-xl shadow-lg animate-fadeIn max-w-3xl mx-auto"
                  dangerouslySetInnerHTML={{ __html: privacyData }}
              />
          </div>
      </div>
  );
};

export default Privacy;