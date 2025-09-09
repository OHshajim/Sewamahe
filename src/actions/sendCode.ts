import configuration from '@/config/configuration';
import axios from 'axios';

const sendCode = (email) => {
  return axios({
    method: 'post',
    url: `${configuration.url || ''}/api/auth/code`,
    data: { email },
  });
};

export default sendCode;
