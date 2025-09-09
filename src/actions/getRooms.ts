import configuration from '@/config/configuration';
import axios from 'axios';

const getRooms = () => {
  return axios({
    method: 'post',
    url: `${configuration.url || ''}/api/rooms/list`,
    data: { limit: 30 },
  });
};

export default getRooms;
