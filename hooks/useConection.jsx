import { API_URL } from "@env"
const useConection = () => {
  const sendData= (data, url) => {
    return fetch(API_URL+url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        return json;
      });
  };

  return { sendData: sendData };
};

export default useConection;
