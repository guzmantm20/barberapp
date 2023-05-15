import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import useConection from "../hooks/useConection";
import { AntDesign } from "@expo/vector-icons";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import Spent from "../components/modals/Spent";

const Home = ({ navigation }) => {
  const { getData } = useUser();
  const { sendData } = useConection();
  const [userData, setUserData] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const parseNum = (num) => {
    return parseInt(num)
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const spent = () => {
    modalVisible && initialData();
    setModalVisible(!modalVisible);
  };

  const initialData = async () => {
    setUserData(
      await sendData(
        { ...JSON.parse(await getData()), type: "getData" },
        "barberactions"
      )
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      initialData();
    });
    return unsubscribe;
  }, [navigation]);

  const render = () => {
    return (
      <>
        <View style={{ flexDirection: "column" }}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.name}>{userData.user}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={[styles.current, { color: "#00f9a9" }]}>
              Disponible $ {parseNum(userData.credit)}
            </Text>
            <Text style={[styles.current, { color: "#ff2f00" }]}>
              Gastos $ {parseNum(userData.totalSpent)}
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={[styles.current, { color: "#f9c300" }]}>
              Ventas $ {parseNum(userData.totalSell)}
            </Text>
            <Text style={[styles.current, { color: "#1b00ff" }]}>
              Ingresos $ {parseNum(userData.totalBarber)}
            </Text>
          </View>
        </View>
        <View style={styles.loby}>
          <Pressable
            onPress={() => {
              setModalVisible(true);
            }}
            style={styles.buttonsLoby}
          >
            <AntDesign name="shoppingcart" size={50} color="black" />
            <Text style={styles.text}>Gastos</Text>
          </Pressable>
        </View>
      </>
    );
  };
  return (
    <View style={styles.container}>
      <Spent modalVisible={modalVisible} setModalVisible={spent} />
      {userData && render()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    padding: 5,
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "capitalize",
    margin: 5,
  },
  current: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 5,
  },
  loby: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
    flex: 8 / 10,
  },
  buttonsLoby: {
    margin: 5,
    width: "30%",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Home;
