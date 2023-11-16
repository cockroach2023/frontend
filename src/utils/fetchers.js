import axios from "axios";

const fetcher = (url) => axios.get(url).then((response) => response.data);

export const fetcher_with_user = (url) => {
  const access_token = sessionStorage.getItem("access_token");

  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json", // You may need to adjust the content type based on your API requirements
  };

  return axios.get(url, { headers });
};
export default fetcher;
