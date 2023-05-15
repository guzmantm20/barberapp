import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Login from "../pages/Login";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import Tabsn from "./Tabsn";
import useUser from "../hooks/useUser";
import useConection from "../hooks/useConection";

const Navigation = () => {
  const [userData, setUserData] = useState("");
  const { getData, storeData } = useUser();
  const { sendData } = useConection();
  const [isLoading, setLoading] = useState(true);
  function setData(data){
    storeData(data)
    setUserData(data)
  }
  const getUserData = async () =>{
    const data = await getData()
    if(data){
      const res = await sendData(JSON.parse(data), "loginval")
      setUserData(res.code)
      setLoading(false)
    }else{
      setLoading(false)
    }
    
      
  }
  useEffect(() => {
    getUserData()
  }, [userData]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        {isLoading ? <ActivityIndicator size="small" color="#0000ff" style={{flex: 1,
    justifyContent: "center"}} /> : (userData == "ok" ? <Tabsn /> : <Login setUserData={setData} />)}
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Navigation;
