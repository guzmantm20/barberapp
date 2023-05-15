import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import useConection from "../../hooks/useConection";
import useUser from "../../hooks/useUser";
import { useForm } from "react-hook-form";
import Style from "../../components/Style";
import Inputs from "../Inputs";

const AdjustModal = ({ setModalVisible, modalVisible, barberId }) => {
  const { sendData } = useConection();
  const { getData } = useUser();
  const [userData, setUserData] = useState("");

  const getUserData = async () => {
    setUserData(JSON.parse(await getData()));
  };
  useEffect(() => {
    getUserData();
  }, []);

  const {
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    if (data) {
      const res = await sendData(
        { ...data, ...{ barberId: barberId, type: 93 }, ...userData },
        "barberactions"
      );
      if (res.code == "error") {
        setError("des", { message: res.message });
      } else {
        ToastAndroid.show("Ajuste realizado!!", ToastAndroid.SHORT);
        reset();
        setModalVisible();
      }
    }
  };

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={Style.centeredView}>
        <View style={Style.modalView}>
          <Inputs
            textLabel="Monto"
            name={"amount"}
            control={control}
            aditional={{ keyboardType: "numeric" }}
          />
          {errors.amount && (
            <Text style={{ color: "red" }}>
              {errors.amount.message
                ? errors.amount.message
                : "Este campo es requerido"}
              .
            </Text>
          )}
          <Inputs textLabel="Motivo de ajuste" name={"des"} control={control} />
          {errors.des && (
            <Text style={{ color: "red" }}>
              {errors.des.message
                ? errors.des.message
                : "Este campo es requerido"}
              .
            </Text>
          )}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={Style.button}
              title="Button"
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={Style.textStyle}>Guardar</Text>
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

export default AdjustModal;
