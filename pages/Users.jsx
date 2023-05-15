import { View, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import { useNavigation } from "@react-navigation/native";
import useConection from "../hooks/useConection";
import Barber from "../components/Barber";

const Users = () => {
  const { getData } = useUser();
  const { sendData } = useConection();
  const [barbers, setBarbers] = useState();
  const navigation = useNavigation();
  const initialData = async () => {
    setBarbers(
      await sendData(
        { ...JSON.parse(await getData()), type: "getbarbers" },
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

  const renderBarbers = ({ item }) => (
    <View style={styles.container}>
      <TouchableOpacity
      onPress={() => { console.log("modal para eliminar/editar usuario")}}
      >
        <Image
          style={styles.tinyLogo}
          source={{
            uri: `https://robohash.org/${item.name}`,
          }}
        />
      </TouchableOpacity>

      <Barber barberData={item} actData={initialData} />
    </View>
  );

  return (
    <View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={barbers}
        renderItem={renderBarbers}
        numColumns={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
  },
  tinyLogo: {
    width: 80,
    height: 80,
    margin: 5,
    padding: 3,
  },
});

export default Users;
