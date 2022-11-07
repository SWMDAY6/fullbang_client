import axios from "axios";

type params = {
  checkInDate: string;
};

const axiosGetRoomDetail = (url: string, params: params) => {
  return axios.get(url, { params });
};

export default axiosGetRoomDetail;
