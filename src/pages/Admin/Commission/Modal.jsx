import { useState } from 'react';
import { useGlobal } from 'reactn';
import './Credit.sass';
import { FiX } from 'react-icons/fi';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import Config from '../../../config';

function Input({
  placeholder, type, onChange, required, value,
}) {
  return (
    <div className="uk-margin-small-top">
      <div className="uk-inline uk-width-1-1">
        <input
          className="uk-input uk-margin-remove"
          required={required}
          placeholder={placeholder}
          value={value}
          type={type}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

function CreditModal({
  onClose, userData, setUserRefetch, userRefetch,
}) {
  const { addToast } = useToasts();
  const [amount, setAmount] = useState('');
  const [user] = useGlobal('user');

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

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${Config.url}/api/admin/credit/${user.id}/${user.email}`, {
        userId: userData.id,
        userEmail: userData.email,
        credit: parseFloat(amount),
      });
      if (data.success) {
        onClose(true);
        okToast(`User ${userData.username} has been credited with ${amount}₹`);
        setUserRefetch(!userRefetch);
      }
    } catch (e) {
      errorToast(`Failed to edit user ${user.username}`);
    }
  };

  return (
    <div className="admin-overlay">
      <div className="box">
        <div className="top-controls">
          <div className="close" onClick={onClose}>
            <FiX />
          </div>
        </div>

        <div className="data-editor">
          <div className="uk-flex uk-flex-column uk-flex-center uk-flex-middle admin-delete">
            <form className="uk-flex uk-flex-column uk-flex-center uk-flex-middle" onSubmit={(e) => updateUser(e)}>
              <Input
                placeholder="amount"
                type="number"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button type="submit" style={{ marginBottom: 4 }} className="uk-button uk-button-honey uk-margin-top">
                Recharge
              </button>
              <button className="uk-button uk-button-secondary" onClick={onClose}>
                Cancel
              </button>
            </form>
            <div className="padding" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreditModal;
