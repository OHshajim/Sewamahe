import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useGlobal } from 'reactn';
import { useToasts } from 'react-toast-notifications';
import { FiSearch } from 'react-icons/fi';
import DataTable from 'react-data-table-component';
import getWebsiteInfo from '../../../actions/getWebisteInfo';
import './com.sass';
import TopBar from '../components/TopBar';
import search from '../../../actions/search';
import CreditModal from './Modal';
import Config from '../../../config';
import getRazorpayInfo from '../../../actions/getRazorpay';
import getPayGicInfo from '../../../actions/getPayGicInfo';

function Commission() {
  const [charge, setCharge] = useState(null);
  const [recharge, setRecharge] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const setOver = useGlobal('over')[1];
  const { addToast } = useToasts();
  const [users, setUsers] = useState([]);
  const searchInput = useRef();
  const setSearchResults = useGlobal('searchResults')[1];
  const [searchText, setSearch] = useGlobal('search');
  const [popup, setPopup] = useState(null);
  const [creditUser, setCreditUser] = useState(null);
  const [userRefetch, setUserRefetch] = useState(false);
  const [user] = useGlobal('user');
  const [secret, setSecret] = useState('');
  const [key, setKey] = useState('');
  const [razorpayId, setRazorpayId] = useState('');
  const [reUpdate, setReUpdate] = useState(true);
  const [paygicMid, setPaygicMid] = useState('');
  const [paygicpassword, setPaygicPassword] = useState('');
  const [paygicStatus, setPaygicStatus] = useState();
  const [razorPayStatus, setRazorPayStatus] = useState();

  const onChange = (e) => {
    setSearch(e.target.value);
    search(e.target.value)
      .then((res) => setSearchResults(res.data.users))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    search(searchText || null, 10000).then((res) => {
      setUsers(res.data.users);
    });
  }, [searchText, userRefetch]);

  const back = () => setOver(false);

  const columns = [
    {
      name: 'Name',
      selector: (row) => `${row.firstName} ${row.lastName}`,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Balance',
      selector: (row) => `₹ ${row?.balance?.amount.toFixed(2)}`,
      sortable: true,
    },
    {
      name: 'Actions',
      sortable: false,
      cell: (row) => (
        <div className="data-actions">
          <a
            className="edit"
            onClick={() => {
              setCreditUser(row);
              setPopup(true);
            }}
          >
            Credit
          </a>
        </div>
      ),
    },
  ];

  const data = users.map((user) => ({
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    balance: user.balance,
  }));

  const handleUpdate = async (e) => {
    e.preventDefault();
    const com = e.target.com.value;
    try {
      const { data } = await axios.put(`${Config.url}/api/admin/website/set/${user.id}/${user.email}`, {
        withdrawalCharge: com,
      });
      if (data.success) {
        setRefetch(!refetch);
        addToast('Updated', {
          appearance: 'success',
          autoDismiss: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateRecharge = async (e) => {
    e.preventDefault();
    const rec = e.target.rechargex.value;
    try {
      const { data } = await axios.put(`${Config.url}/api/admin/website/set/${user.id}/${user.email}`, {
        rechargeAmount: rec,
      });
      if (data.success) {
        setRefetch(!refetch);
        addToast('Updated', {
          appearance: 'success',
          autoDismiss: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateCredential = async (e) => {
    e.preventDefault();
    const key = e.target.key.value;
    const secret = e.target.secret.value;
    const razorpayId = e.target.razorpayId.value;
    try {
      const { data } = await axios.put(`${Config.url}/api/admin/razorpay/set/${user.id}/${user.email}`, {
        key,
        secret,
        razorpayId,
      });
      if (data.success) {
        setReUpdate(!reUpdate);
        addToast('Updated', {
          appearance: 'success',
          autoDismiss: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatePayGicCredential = async (e) => {
    e.preventDefault();
    const mid = e.target.mid.value;
    const password = e.target.password.value;
    try {
      const { data } = await axios.put(`${Config.url}/api/admin/paygic/set/${user.id}/${user.email}`, {
        mid,
        password,
      });
      if (data.success) {
        setReUpdate(!reUpdate);
        addToast('Updated', {
          appearance: 'success',
          autoDismiss: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatePaymentSystem = async (e) => {
    e.preventDefault();
    const paygic = e.target.paygicEnabled.checked;
    const razorPay = e.target.razorpayEnabled.checked;
    try {
      const { data } = await axios.put(`${Config.url}/api/admin/website/set/${user.id}/${user.email}`, {
        paymentMethod: {
          paygic,
          razorPay,
        },
      });
      if (data.success) {
        setRefetch(!refetch);
        addToast('Updated', {
          appearance: 'success',
          autoDismiss: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const { data } = await getWebsiteInfo();
      setCharge(data.data.withdrawalCharge);
      setRecharge(data.data.rechargeAmount);
      setPaygicStatus(data.data.paymentMethod.paygic);
      setRazorPayStatus(data.data.paymentMethod.razorPay);
    };
    fetch();
  }, [refetch]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await getRazorpayInfo({ userId: user?.id, email: user?.email });
      if (data?.success) {
        setKey(data?.data.key);
        setSecret(data?.data.secret);
        setRazorpayId(data?.data.razorpayId);
      }

      const { data: res } = await getPayGicInfo({ userId: user?.id, email: user?.email });
      if (res?.success) {
        setPaygicMid(res?.data.mid);
        setPaygicPassword(res?.data.password);
      }
    };
    if (user) {
      fetch();
    }
  }, [user, reUpdate]);

  return (
    <>
      <TopBar back={back} />
      <div className="commission-wrapper">
        <div>
          <form onSubmit={handleUpdatePaymentSystem} className="container-com">
            <h2 className="heading-com">Payment Types</h2>
            <p className="subheading-com">Enable or disable</p>

            <div className="card-com-s">
              <label className="switch-label">
                Paygic
                <span className="switch">
                  <input type="checkbox" name="paygicEnabled" defaultChecked={paygicStatus} />
                  <span className="slider"> </span>
                </span>
              </label>
            </div>

            <div className="card-com-s">
              <label className="switch-label">
                Razorpay
                <span className="switch">
                  <input type="checkbox" name="razorpayEnabled" defaultChecked={razorPayStatus} />
                  <span className="slider"> </span>
                </span>
              </label>
            </div>

            <button type="submit" className="button-com">
              Update
            </button>
          </form>
          <form onSubmit={handleUpdatePayGicCredential} className="container-com">
            <h2 className="heading-com">Set Paygic Keys</h2>
            <p className="subheading-com">Account Information</p>
            <div className="card-com-s">
              <div>
                <h2>Mid</h2>
                <input defaultValue={paygicMid} name="mid" required className="input-com-s" placeholder="Key" />
              </div>
              <div>
                <h2>Password</h2>
                <input
                  defaultValue={paygicpassword}
                  name="password"
                  required
                  className="input-com-s"
                  placeholder="Secret"
                />
              </div>
              <button type="submit" className="button-com">
                Update
              </button>
            </div>
          </form>
          <form onSubmit={handleUpdateCredential} className="container-com">
            <h2 className="heading-com">Set Razorpay Keys</h2>
            <p className="subheading-com">Account Information</p>
            <div className="card-com-s">
              <div>
                <h2>Key</h2>
                <input defaultValue={key} name="key" required className="input-com-s" placeholder="Key" />
              </div>
              <div>
                <h2>Secret</h2>
                <input defaultValue={secret} name="secret" required className="input-com-s" placeholder="Secret" />
              </div>
              <div>
                <h2>RazorpayX Id</h2>
                <input defaultValue={razorpayId} name="razorpayId" required className="input-com-s" placeholder="id" />
              </div>
              <button type="submit" className="button-com">
                Update
              </button>
            </div>
          </form>
          <form onSubmit={handleUpdate} className="container-com">
            <h2 className="heading-com">Commission Set</h2>
            <p className="subheading-com">Per withdrawal commission</p>
            <div className="card-com">
              <input defaultValue={charge} name="com" required className="input-com" placeholder="Enter commission %" />
              <button type="submit" className="button-com">
                Update
              </button>
            </div>
          </form>
          <form onSubmit={handleUpdateRecharge} className="container-com">
            <h2 className="heading-com">Recharge Amount Set</h2>
            <div className="card-com">
              <input
                defaultValue={recharge}
                name="rechargex"
                required
                className="input-com"
                placeholder="Enter recharge amount"
              />
              <button type="submit" className="button-com">
                Update
              </button>
            </div>
          </form>
        </div>
        <div className="container-com">
          <h2 className="heading-com">User Management</h2>
          <p className="subheading-com">Manage user access & balances</p>

          <div className="search-bar uk-flex uk-flex-center uk-flex-middle">
            <div className="icon" onClick={() => searchInput.current.focus()}>
              <FiSearch />
            </div>
            <div className="uk-inline search">
              <input className="uk-input uk-border-pill" placeholder="Search" ref={searchInput} onChange={onChange} />
            </div>
          </div>

          <div className="uk-flex uk-flex-center uk-flex-middle uk-flex-column">
            <div className="data-table" style={{ background: '#fff' }}>
              <DataTable
                title="Admin - Users"
                columns={columns}
                data={data}
                defaultSortField="title"
                pagination
                paginationPerPage={20}
              />
            </div>
          </div>
        </div>
        {popup && (
          <CreditModal
            onClose={() => setPopup(false)}
            userData={creditUser}
            setUserRefetch={setUserRefetch}
            userRefetch={userRefetch}
          />
        )}
      </div>
    </>
  );
}

export default Commission;
