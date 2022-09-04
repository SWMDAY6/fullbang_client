import axios from "axios";

type params = {
  capacity: number;
  date: string;
  parkingAvailability: string;
  placeType: string;
};

const axiosGetAverageValue = (url: string, params: params) => {
  return axios.get(url, { params });
};

export default axiosGetAverageValue;
