import { useEffect, useRef, useState } from 'react';
import { useGlobal } from 'reactn';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import TopBar from '../components/TopBar';
import '../Admin.sass';
import getAllWithdrawalInfo from '../../../actions/getAllWithdrawalInfo';
import '../Withdrawal-request/withdrawal.sass';

function AdminTransaction() {
  const setOver = useGlobal('over')[1];
  const back = () => setOver(false);
  const [user] = useGlobal('user');
  const [withdrawal, setWithdrawal] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const navigate = useNavigate();
  const searchInput = useRef();
  const [searchText, setSearchText] = useState('');
  const [filterData, setFIlterData] = useState([]);

  const onChange = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
  };

  useEffect(() => {
    getAllWithdrawalInfo({ id: user.id, email: user.email }).then((res) => {
      const filterWith = res.data.data.filter((i) => i.historyType === 'withdrawal');
      setWithdrawal(filterWith);
    });
  }, [user]);

  useEffect(() => {
    if (withdrawal.length > 0) {
      if (!searchText || searchText.trim().length === 0) {
        setFIlterData([...withdrawal]);
      } else {
        const lowerSearch = searchText.toLowerCase();
        const filtered = withdrawal.filter((item) => Object.values(item).some((val) => String(val).toLowerCase().includes(lowerSearch)));
        setFIlterData(filtered);
      }
    }
  }, [searchText, withdrawal]);

  const columns = [
    {
      name: 'Id',
      selector: (row) => `${row._id.slice(0, 4)}...${row._id.slice(-4)}`,
      sortable: true,
    },
    {
      name: 'Method',
      selector: (row) => row.paymentMethod,
      sortable: true,
    },
    {
      name: 'Account',
      selector: (row) => row.account.slice(0, 5),
      sortable: true,
    },
    {
      name: 'Amount',
      selector: (row) => `₹${row.amount}`,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="data-actions">
          <a
            className="edit"
            onClick={() => {
              navigate(`/admin/transaction/view/${row._id}`);
            }}
          >
            View
          </a>
        </div>
      ),
    },
  ];

  const filteredData = filterData
    ?.slice()
    ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .filter((item) => {
      if (filterStatus === 'All') return true;
      return item.status.toLowerCase() === filterStatus.toLowerCase();
    });

  return (
    <div>
      <div className="admin content uk-flex uk-flex-column">
        <TopBar back={back} />
        <div className="search-bar uk-flex uk-flex-center uk-flex-middle">
          <div className="icon" onClick={() => searchInput.current.focus()}>
            <FiSearch />
          </div>
          <div className="uk-inline search">
            <input className="uk-input uk-border-pill" placeholder="Search" ref={searchInput} onChange={onChange} />
          </div>
        </div>
        <div className="uk-flex uk-flex-center uk-flex-middle uk-flex-column">
          <div className="data-table">
            <div className="data-create">
              <select
                id="statusFilter"
                className="uk-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="reject">Reject</option>
              </select>
            </div>

            <DataTable
              title="Admin - Transaction"
              columns={columns}
              data={filteredData}
              defaultSortField="title"
              pagination
              paginationPerPage={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminTransaction;
