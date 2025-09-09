import configuration from '@/config/configuration';
import axios from 'axios';

const changePassword = (email, authCode, password) => {
  return axios({
    method: 'post',
    url: `${configuration.url || ''}/api/auth/change`,
    data: { email, code: authCode, password },
  });
};

export default changePassword;
