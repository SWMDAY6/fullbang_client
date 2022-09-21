import axios from "axios";

type params = {
  placeType: string;
  inputDate: string;
  latitudeStart: number;
  latitudeEnd: number;
  longitudeStart: number;
  longitudeEnd: number;
};

const axiosGetplace = (url: string, params: params) => {
  return axios.get(url, { params });
};

export default axiosGetplace;
