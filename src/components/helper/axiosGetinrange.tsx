import axios from "axios";

type params = {
  placeType: string;
  date: string;
  capacity: number;
  parkingAvailability: number;
  latitudeStart: number;
  latitudeEnd: number;
  longitudeStart: number;
  longitudeEnd: number;
};

const axiosGetinrange = (url: string, params: params) => {
  return axios.get(url, { params });
};

export default axiosGetinrange;
