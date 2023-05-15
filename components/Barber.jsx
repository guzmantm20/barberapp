import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import PayModal from "./modals/PayModal";
import CourtModal from "./modals/CourtModal";
import AdjustModal from "./modals/AdjustModal";

const Barber = ({ barberData, actData }) => {
  const [modalPayVisible, setModalPayVisible] = useState(false);
  const [modalCourtVisible, setModalCourtVisible] = useState(false);
  const [modalAdjustVisible, setModalAdjustVisible] = useState(false);
  const parseNum = (num) => {
    return parseInt(num)
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  const court = () => {
    modalCourtVisible && actData();
    setModalCourtVisible(!modalCourtVisible);
  };

  const pay = () => {
    modalPayVisible && actData();
    setModalPayVisible(!modalPayVisible);
  };

  const adjust = () => {
    modalAdjustVisible && actData();
    setModalAdjustVisible(!modalAdjustVisible);
  };
  return (
    <View style={styles.container}>
      <PayModal
        modalVisible={modalPayVisible}
        setModalVisible={pay}
        barberData={barberData}
      />
      <CourtModal
        modalVisible={modalCourtVisible}
        setModalVisible={court}
        barberId={barberData.id}
      />
      <AdjustModal
        modalVisible={modalAdjustVisible}
        setModalVisible={adjust}
        barberId={barberData.id}
      />
      <View style={styles.barber}>
        <Text style={styles.userText}>{barberData.username}</Text>
        <Text style={{ color: "#008ae8", fontSize: 10 }}>
          Ventas: {parseNum(barberData.credit)}
        </Text>
        <Text style={{ color: "#32e36d", fontSize: 10 }}>
          Ganacia: {parseNum(barberData.commission)}
        </Text>
        <Text style={{ color: "#fff", fontSize: 10 }}>
          Cortes: {parseNum(barberData.supbag)} -{" "}
          {parseNum(barberData.creditbag)}
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={court}
          style={[styles.buttons, { backgroundColor: "#008ae8" }]}
        >
          <FontAwesome name="scissors" size={30} color="#141112" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttons, { backgroundColor: "#32e36d" }]}
        >
          <FontAwesome onPress={pay} name="money" size={30} color="#141112" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttons, { backgroundColor: "#c37a00" }]}
        >
          <FontAwesome onPress={adjust} name="edit" size={30} color="#141112" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonsContainer: {
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  barber: {
    flexWrap: "wrap",
    flexDirection: "column",
    flexGrow: 1,
    maxWidth: "30%",
  },
  userText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  buttons: {
    borderRadius: 50,
    padding: 10,
    margin: 3,
  },
});

export default Barber;
