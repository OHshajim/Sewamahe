import { useEffect, useState } from 'react';
import getWebsiteInfo from '@/actions/getWebsiteInfo';
import Navbar from '@/components/Navbar';

const Terms = () => {
  const [termsData, setTermsData] = useState(null);
  useEffect(() => {
      const fetch = async () => {
          try {
              const { data } = await getWebsiteInfo();
              setTermsData(data.data.termsAndCondition); // Ensure it matches your schema field
          } catch (err) {
              console.log("Failed to load About Us information.", err);
          }
      };

      fetch();
  }, []);

  return (
      <div className="flex flex-col h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
          <Navbar />
          <div className="flex-1 overflow-y-auto py-12 px-6 md:px-8 lg:px-12">
              <div
                  className="bg-white p-8 md:p-10 rounded-xl shadow-lg animate-fadeIn max-w-3xl mx-auto"
                  dangerouslySetInnerHTML={{ __html: termsData }}
              />
          </div>
      </div>
  );
};

export default Terms;