import { useEffect, useRef, useState } from 'react';
import { useGlobal } from 'reactn';
import DataTable from 'react-data-table-component';
import { useToasts } from 'react-toast-notifications';
import axios from 'axios';
import { FiSearch } from 'react-icons/fi';
import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';
import '../Admin.sass';
import search from '../../../actions/search';
import Config from '../../../config';
import { postDelete } from '../../../actions/admin';

function AdminConsultant() {
  const setOver = useGlobal('over')[1];
  const [user] = useGlobal('user');
  const [users, setUsers] = useState([]);
  const searchInput = useRef();
  const setSearchResults = useGlobal('searchResults')[1];
  const [searchText, setSearch] = useGlobal('search');
  const [refetch, setRefetch] = useState(false);
  const { addToast } = useToasts();
  const onChange = (e) => {
    setSearch(e.target.value);
    search(e.target.value)
      .then((res) => {
        const consultant = res.data.users.filter((user) => user.type === 'Consultant');
        setSearchResults([...consultant]);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateStatus = async ({ status, id }) => {
    try {
      const { data } = await axios.post(`${Config.url}/api/consultant/update/${user.id}/${user.email}`, {
        consultantId: id,
        consultantStatus: status,
      });
      if (data.success) {
        setRefetch(!refetch);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const okToast = (content) => {
    addToast(content, {
      appearance: 'success',
      autoDismiss: true,
    });
  };

  const errorToast = (content) => {
    addToast(content, {
      appearance: 'error',
      autoDismiss: true,
    });
  };

  const deleteUser = async (email, username) => {
    try {
      await postDelete({ email, username });
      okToast(`User ${username} has been deleted`);
      setRefetch(!refetch);
    } catch (e) {
      errorToast(`Failed to delete user ${username}`);
    }
  };

  useEffect(() => {
    search(searchText || null, 10000).then((res) => {
      const consultant = res.data.users.filter((user) => user.type === 'Consultant');
      setUsers([...consultant]);
    });
  }, [searchText, refetch]);

  const back = () => setOver(false);

  const columns = [
    {
      name: 'Name',
      selector: (row) => `${row.firstName} ${' '} ${row.lastName}`,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Consultant Status',
      selector: (row) => row.consultantStatus || 'Pending',
      sortable: true,
    },
    {
      name: 'Actions',
      sortable: false,
      cell: (row) => (
        <div className="data-actions">
          {row.consultantStatus === 'Approved' ? (
            <a className="edit">Approved</a>
          ) : (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <>
              <a
                className="edit"
                onClick={() => {
                  handleUpdateStatus({ id: row.id, status: 'Approved' });
                }}
              >
                Approve
              </a>
              <span className="separator">&nbsp;&nbsp;-&nbsp;&nbsp;</span>
              <a className="delete" onClick={() => deleteUser(row.email, row.username)}>
                Disapprove
              </a>
            </>
          )}
        </div>
      ),
    },
  ];

  const data = [];

  users.forEach((user) => data.push({
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    balance: user.balance,
    consultantStatus: user.consultantStatus,
  }));

  return (
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
      <div className=" uk-flex uk-flex-center uk-flex-middle uk-flex-column">
        <div className="data-table" style={{ background: '#fff' }}>
          <DataTable
            title="Admin - Consultant"
            columns={columns}
            data={data}
            defaultSortField="title"
            pagination
            paginationPerPage={20}
          />
        </div>
      </div>
      <BottomBar />
    </div>
  );
}

export default AdminConsultant;
