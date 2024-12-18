import axios from 'axios';
import { API_BASE_URL } from '../config';
import { enqueueSnackbar } from 'notistack';

interface UnProcessedError {
  id: number;
  errorMessage: string;
}

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: API_BASE_URL });

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data.unProcessed && response.data.unProcessed.length) {
      response.data.unProcessed.forEach(
        (msg: UnProcessedError) => msg.errorMessage && enqueueSnackbar(msg.errorMessage)
      );
    }
    return response;
  },

  (error) => {
    const data = error?.response?.data;
    if (typeof data === 'string' && data) {
      if (error?.response?.status === 500) {
        enqueueSnackbar('An Error occurred, Please contact your system administrator.');
      } else {
        enqueueSnackbar(data);
      }
    } else if (data?.errors && typeof data?.errors === 'object') {
      const messages: string[][] = Object.values(data.errors);
      messages.forEach(
        (keyMsgs) => Array.isArray(keyMsgs) && keyMsgs.forEach((msg) => msg && enqueueSnackbar(msg))
      );
    }
    if (error.message === 'canceled') {
      return Promise.reject();
    }
    return Promise.reject((error.response && data) || 'Something went wrong');
  }
);

export default axiosInstance;
