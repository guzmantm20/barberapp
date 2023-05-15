import { View, Text, Modal, StyleSheet, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import Style from "../../components/Style";
import useConection from "../../hooks/useConection";
import useUser from "../../hooks/useUser";

const PayModal = ({ setModalVisible, modalVisible, barberData }) => {
  const { sendData } = useConection();
  const { getData } = useUser();
  const [userData, setUserData] = useState("");

  const getUserData = async () => {
    setUserData(JSON.parse(await getData()));
  };
  useEffect(() => {
    getUserData();
  }, []);

  const onSubmit = async () => {
    const res = await sendData(
      {...{ barberId: barberData.id, pay: 1 }, ...userData },
      "barberactions"
    );
    if (res.code == "error") {
      setError("des", { message: res.message });
    } else {
      // ToastAndroid.show("Pago agregado!!", ToastAndroid.SHORT);
      setModalVisible();
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={Style.centeredView}>
        <View style={Style.modalView}>
          <View style={{ alignItems: "center", marginBottom: 5 }}>
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
              {barberData.username}
            </Text>
            <Text style={{ color: "#3a1aed" }}>
              Venta:{" "}
              {parseInt(barberData.credit)
                .toFixed(0)
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
            </Text>
            <Text style={{ color: "#22e663" }}>
              Ganancia:{" "}
              {parseInt(barberData.commission)
                .toFixed(0)
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={Style.button}
              title="Button"
              onPress={onSubmit}
            >
              <Text style={Style.textStyle}>Pagar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[Style.button, { backgroundColor: "#f28e4b" }]}
              title="Button"
              onPress={() => setModalVisible()}
            >
              <Text style={Style.textStyle}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 25,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 25,
    padding: 10,
    elevation: 2,
    backgroundColor: "#008ae8",
  },
  textStyle: {
    // color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default PayModal;
