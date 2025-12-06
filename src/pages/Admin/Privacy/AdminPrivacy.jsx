import axios from 'axios';
import { useEffect, useState } from 'react';
import { useGlobal } from 'reactn';
import { useToasts } from 'react-toast-notifications';
import Config from '../../../config';
import getWebsiteInfo from '../../../actions/getWebisteInfo';
import '../AboutAs/about.sass';
import TopBar from '../components/TopBar';

function AdminPrivacy() {
  const [aboutInfo, setAboutInfo] = useState(null);
  const [user] = useGlobal('user');
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();
  const setOver = useGlobal('over')[1];
  const back = () => setOver(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedContent = e.target.about.value;
    try {
      setLoading(true);
      const { data } = await axios.put(`${Config.url}/api/admin/website/set/${user.id}/${user.email}`, {
        privacy: updatedContent,
      });
      console.log(data);
      if (data.success) {
        setRefetch(!refetch);
        addToast('Updated', {
          appearance: 'success',
          autoDismiss: true,
        });
      }
    } catch (error) {
      console.error('Error updating about content:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getWebsiteInfo();
        setAboutInfo(data?.data?.privacy || '');
      } catch (err) {
        console.error('Error fetching about info:', err);
      }
    };
    fetch();
  }, [refetch]);

  return (
    <div>
      <TopBar back={back} />
      <div className="admin-about-page">
        <h2 className="admin-about-title">Edit Privacy Policy Page Content</h2>

        <form onSubmit={handleUpdate} className="admin-about-form">
          <label htmlFor="about" className="admin-about-label">
            HTML Content for Privacy Policy Page:
          </label>
          <textarea
            id="about"
            name="about"
            defaultValue={aboutInfo}
            required
            className="admin-about-textarea"
            placeholder="<h1>Welcome</h1><p>Write something here...</p>"
          />
          <button type="submit" className="admin-about-button" disabled={loading}>
            {loading ? 'Updating...' : 'Update Content'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminPrivacy;
