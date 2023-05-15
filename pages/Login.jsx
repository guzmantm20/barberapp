import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import Style from "../components/Style";
import useConection from "../hooks/useConection";
const Login = ({setUserData}) => {
  const { sendData } = useConection();
  const {
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const res = await sendData(data, "login")
    if(res.code == "error"){
      setError('password', { message: res.message });
    }else{
      setUserData(JSON.stringify({username: data.username, apptoken: res.apptoken}))
    }
    
    // 
  };

  return (
    <ImageBackground
      source={require("../assets/bg.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={{width: "80%"}}>
      <Text style={Style.label}>Usuario</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={Style.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="username"
          rules={{ required: true }}
        />
        {errors.username && (
          <Text style={{ color: "red" }}>
          {errors.username.message
            ? errors.username.message
            : "Este campo es requerido"}
          .
        </Text>
        )}
        <Text style={Style.label}>Constraseña</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={Style.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              secureTextEntry={true}
            />
          )}
          name="password"
          rules={{ required: true }}
        />
        {errors.password && (
          <Text style={{ color: "red" }}>
          {errors.password.message
            ? errors.password.message
            : "Este campo es requerido"}
          .
        </Text>
        )}

        <View style={Style.button}>
          <TouchableOpacity
            color="#008ae8"
            title="Button"
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>Ingresar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 8,
  },
  image: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
});

export default Login;
