import { useEffect, useState } from 'react';
import { useGlobal } from 'reactn';
import axios from 'axios';
import TopBar from '../components/TopBar';
import '../Admin.sass';
import './dashboard.sass';
import Config from '../../../config';

function AdminDashboard() {
  const setOver = useGlobal('over')[1];
  const [user] = useGlobal('user');

  const [stats, setStats] = useState({
    totalUsers: 0,
    todayWithdrawal: 0,
    todayTopup: 0,
    allWithdrawal: 0,
    allTopup: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(`${Config.url}/api/admin/users/all/${user.id}/${user.email}`);
        const { users } = data;

        const today = new Date().toISOString().slice(0, 10);

        const totalUsers = users.length;
        let todayWithdrawal = 0;
        let todayTopup = 0;
        let allWithdrawal = 0;
        let allTopup = 0;

        users.forEach((user) => {
          if (Array.isArray(user.history)) {
            user.history.forEach((entry) => {
              const entryDate = new Date(entry.createdAt).toISOString().slice(0, 10);

              if (entry.historyType === 'withdrawal') {
                allWithdrawal++;
                if (entryDate === today) todayWithdrawal++;
              }

              if (entry.historyType === 'top-up') {
                allTopup++;
                if (entryDate === today) todayTopup++;
              }
            });
          }
        });

        setStats({
          totalUsers,
          todayWithdrawal,
          todayTopup,
          allWithdrawal,
          allTopup,
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchStats();
  }, [user]);

  const back = () => setOver(false);

  return (
    <div>
      <TopBar back={back} />
      <div className="admin content uk-flex uk-flex-column">
        <div className="dashboard-scroll-container">
          <h2 className="dashboard-title">Admin - Dashboard</h2>
          <div className="dashboard-grid">
            <div className="column">
              <div className="dashboard-card">
                <h3>Today&apos;s Top-ups</h3>
                <p>{stats.todayTopup}</p>
              </div>
              <div className="dashboard-card">
                <h3>Today&apos;s Withdrawals</h3>
                <p>{stats.todayWithdrawal}</p>
              </div>
              <div className="dashboard-card">
                <h3>Total Users</h3>
                <p>{stats.totalUsers}</p>
              </div>
            </div>
            <div className="column">
              <div className="dashboard-card">
                <h3>All Top-ups</h3>
                <p>{stats.allTopup}</p>
              </div>
              <div className="dashboard-card">
                <h3>All Withdrawals</h3>
                <p>{stats.allWithdrawal}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
