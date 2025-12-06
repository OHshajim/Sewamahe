import { useEffect, useState } from 'react';
import { useGlobal } from 'reactn';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './view.sass';
import getSingleWithdrawalInfo from '../../../actions/getSIngleWithdrawal';
import Config from '../../../config';
import getWebsiteInfo from '../../../actions/getWebisteInfo';
import TopBar from '../components/TopBar';
import PaymentSystem from '../../../components/PaymentSystem';

function WithdrawalDetailView() {
  const { id } = useParams();
  const [withdrawal, setWithdrawal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user] = useGlobal('user');
  const [refetch, setRefetch] = useState(false);
  const [adminCharge, setAdminCharge] = useState(0 || import.meta.env.VITE_Admin_CHARGE);
  const [sendingPayment, setSendingPayment] = useState(0);
  const setOver = useGlobal('over')[1];

  const back = () => setOver(false);
  useEffect(() => {
    if (id && user) {
      setLoading(true);
      getSingleWithdrawalInfo({ email: user.email, id: user.id, withdrawalId: id }).then((res) => {
        setWithdrawal(res.data.data);
        setLoading(false);
      });
    }
  }, [id, user, refetch]);

  const handleReject = async () => {
    try {
      const { data } = await axios.post(`${Config.url}/api/admin/withdrawal/update/${user.id}/${user.email}/${id}`, {
        status: 'Reject',
      });
      if (data.success) setRefetch(!refetch);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApproved = async () => {
    try {
      const { data } = await axios.post(`${Config.url}/api/admin/withdrawal/update/${user.id}/${user.email}/${id}`, {
        status: 'Approved',
      });
      if (data.success) setRefetch(!refetch);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getWebsiteInfo();
        setAdminCharge(data.data.withdrawalCharge);
      } catch (err) {
        console.log('Failed to load About Us information.', err);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    if (withdrawal?.withdrawal?.amount) {
      const mainReturn = withdrawal.withdrawal.amount - (withdrawal.withdrawal.amount * adminCharge) / 100;
      setSendingPayment(mainReturn);
    }
  }, [withdrawal]);

  return (
    <div className="admin content">
      <TopBar back={back} />
      <div className="admin-s">
        <div className="content-s">
          <h2 className="uk-text-center">Withdrawal Request Detail</h2>
          <div className="uk-card uk-card-default uk-card-body uk-margin-top">
            {loading || !withdrawal ? (
              <p>Loading...</p>
            ) : (
              <>
                <p>
                  <strong>User:</strong>
                  {' '}
                  {withdrawal?.user?.name}
                  (
                  {withdrawal?.user?.email}
                  )
                </p>
                <p>
                  <strong>Amount:</strong>
                  {' '}
                  <span>₹</span>
                  {' '}
                  <span>{withdrawal?.withdrawal?.amount}</span>
                </p>
                <p>
                  <strong>Admin Charge:</strong>
                  {' '}
                  <span>{adminCharge}</span>
                  {' '}
                  <span>%</span>
                </p>
                <p>
                  <strong>User Receives:</strong>
                  {' '}
                  <span>₹</span>
                  {' '}
                  <span>{sendingPayment}</span>
                </p>
                <p>
                  <strong>Method:</strong>
                  {' '}
                  {withdrawal?.withdrawal?.paymentMethod}
                </p>
                <p>
                  <strong>Account Info:</strong>
                  {' '}
                  {withdrawal?.withdrawal?.account}
                </p>
                {withdrawal?.withdrawal?.paymentMethod === 'bank' && (
                  <div>
                    <p>
                      <strong>IFSC Info:</strong>
                      {' '}
                      {withdrawal?.withdrawal?.ifsc}
                    </p>
                    <p>
                      <strong>Holder Name Info:</strong>
                      {' '}
                      {withdrawal?.withdrawal?.holderName}
                    </p>
                  </div>
                )}
                <p>
                  <strong>Status:</strong>
                  {' '}
                  {withdrawal?.withdrawal?.status}
                </p>
                <p>
                  <strong>Requested At:</strong>
                  {' '}
                  {new Date(withdrawal?.withdrawal?.createdAt)?.toLocaleString()}
                </p>

                {withdrawal?.withdrawal?.status === 'pending' || withdrawal?.withdrawal?.status === 'Processing' ? (
                  <div>
                    <PaymentSystem
                      refetch={refetch}
                      setRefetch={setRefetch}
                      withdrawalId={withdrawal?.withdrawal._id}
                      withdrawalStatus={withdrawal?.withdrawal.status}
                    />
                    <div className="uk-flex-s uk-margin-top">
                      <div className="uk-flex-s uk-margin-top">
                        <button className="approve-button" onClick={handleApproved}>
                          Approved Withdrawal Status
                        </button>
                        <button className="cancel-button" onClick={handleReject}>
                          Cancel Withdrawal Status
                        </button>
                      </div>
                    </div>
                  </div>
                ) : <> </>}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WithdrawalDetailView;
