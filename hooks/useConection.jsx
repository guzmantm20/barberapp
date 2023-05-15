const useConection = () => {
  // const [dataPelis, setDataPelis] = useState();
  const sendData= (data, url) => {
    return fetch("https://www.recargateaqui.com/api/"+url, {
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
