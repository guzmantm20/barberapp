import AsyncStorage from "@react-native-async-storage/async-storage";

const useUser = () => {
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("userKey", value);
    } catch (e) {
      // saving error
    }
  };
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("userKey");
      if (value !== null) {
        return value;
      }
    } catch (e) {
      // error reading value
    }
  };

  return { storeData: storeData, getData: getData };
};

export default useUser;
