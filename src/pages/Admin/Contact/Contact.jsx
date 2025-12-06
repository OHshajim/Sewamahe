import axios from 'axios';
import { useEffect, useState } from 'react';
import { useGlobal } from 'reactn';
import './contact.sass';
import Config from '../../../config';
import TopBar from '../components/TopBar';

function AdminContact() {
  const [contactList, setContactList] = useState([]);
  const [user] = useGlobal('user');
  const setOver = useGlobal('over')[1];
  const back = () => setOver(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(`${Config.url}/api/admin/contact/all/${user.id}/${user.email}`);
        setContactList(data?.data || []);
      } catch (err) {
        console.error('Error fetching contact info:', err);
      }
    };
    fetch();
  }, []);

  return (
    <div className="admin-content-wrapper">
      <TopBar back={back} />
      <div className="admin-contact-page">
        <h2 className="admin-contact-title">All Contact Submissions</h2>
        <div className="contact-scroll-container">
          <div className="contact-card-container">
            {contactList.length === 0 ? (
              <p>No contact data available.</p>
            ) : (
              contactList.map((item, index) => (
                <div key={index} className="contact-card">
                  <h3>{item.name}</h3>
                  <p>
                    <strong>Email:</strong>
                    {item.email}
                  </p>
                  <p>
                    <strong>Message:</strong>
                    {item.message}
                  </p>
                  <p className="contact-time">{new Date(item.createdAt).toLocaleString()}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminContact;
