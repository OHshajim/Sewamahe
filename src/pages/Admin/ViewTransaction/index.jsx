import { useEffect, useState } from 'react';
import { useGlobal } from 'reactn';
import { useParams } from 'react-router-dom';
import '../WithdrawalView/view.sass';
import getSingleWithdrawalInfo from '../../../actions/getSIngleWithdrawal';
import getWebsiteInfo from '../../../actions/getWebisteInfo';
import TopBar from '../components/TopBar';

function ViewAdminTransaction() {
  const { id } = useParams();
  const [withdrawal, setWithdrawal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user] = useGlobal('user');
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
  }, [id, user]);

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
    <div className="">
      <TopBar back={back} />
      <div className="uk-container uk-margin-top">
        <h2 className="uk-text-center">Transaction History</h2>

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
                ₹
                {withdrawal?.withdrawal?.amount}
              </p>
              <p>
                <strong>Admin Charge:</strong>
                {' '}
                {adminCharge}
                %
              </p>
              <p>
                <strong>User Receives:</strong>
                {' '}
                ₹
                {sendingPayment}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewAdminTransaction;
