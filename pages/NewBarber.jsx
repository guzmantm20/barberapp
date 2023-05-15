import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SendButton from "../components/SendButton";
import Inputs from "../components/Inputs";
import useConection from "../hooks/useConection";
import useUser from "../hooks/useUser";
import { useNavigation } from "@react-navigation/native";

const NewBarber = () => {
  const { getData } = useUser();
  const { sendData } = useConection();
  const [userData, setUserData] = useState("");

  const navigation = useNavigation();

  const getUserData = async () => {
    setUserData(JSON.parse(await getData()));
  };
  useEffect(() => {
    getUserData();
  }, []);

  const {
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data) {
      const res = await sendData({ ...data, ...userData }, "addbarber");
      if (res.code == "error") {
        setError("pass", { message: res.message });
      } else {
        reset();
        navigation.navigate("Barberos");
      }
    }
  };
  return (
    <View style={styles.container}>
      <Inputs textLabel={"Nombre"} name={"name"} control={control} />
      {errors.name && (
        <Text style={{ color: "red" }}>
          {errors.name.message
            ? errors.name.message
            : "Este campo es requerido"}
          .
        </Text>
      )}
      <Inputs
        textLabel={"Porcentaje"}
        name={"porcent"}
        control={control}
        aditional={{ keyboardType: "numeric" }}
      />
      {errors.porcent && (
        <Text style={{ color: "red" }}>
          {errors.porcent.message
            ? errors.porcent.message
            : "Este campo es requerido"}
          .
        </Text>
      )}
      <Inputs textLabel={"Usuario"} name={"user"} control={control} />
      {errors.user && (
        <Text style={{ color: "red" }}>
          {errors.user.message
            ? errors.user.message
            : "Este campo es requerido"}
          .
        </Text>
      )}
      <Inputs textLabel={"Contraseña"} name={"pass"} control={control} />
      {errors.pass && (
        <Text style={{ color: "red" }}>
          {errors.pass.message
            ? errors.pass.message
            : "Este campo es requerido"}
          .
        </Text>
      )}

      <SendButton
        handleSubmit={handleSubmit(onSubmit)}
        name={"Crear Barbero"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 8,
  },
  label: {
    color: "#000",
    margin: 10,
    marginLeft: 0,
  },
});

export default NewBarber;
