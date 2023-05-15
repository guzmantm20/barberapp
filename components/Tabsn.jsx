import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/Home";
import Users from "../pages/Users";
import Reports from "../pages/Reports";
import { Entypo } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import NewBarber from "../pages/NewBarber";

const Tabsn = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      sceneContainerStyle={{backgroundColor: '#ececec'}}
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: '#141112',
        },
        tabBarStyle: {
          backgroundColor: "#141112",
          borderRadius: 25,
          position: "absolute",
          marginBottom: 5,
        },
        headerTintColor: "#fff",
        tabBarActiveTintColor: "#008ae8",
        tabBarInactiveTintColor: "#fff",
        tabBarButton: ["Nuevo Barbero"].includes(route.name)
          ? () => {
              return null;
            }
          : undefined,
      })}
    >
      <Tab.Screen
        name="Nuevo Barbero"
        component={NewBarber}
        options={({ navigation }) => ({
          tabBarStyle:{display: "none"},
          headerLeft: () => (
            <TouchableOpacity
              color="#008ae8"
              title="Button"
              onPress={() => {
                navigation.navigate("Barberos");
              }}
              style={{paddingLeft: 5}}
            >
              <AntDesign name="arrowleft" size={28} color="white" />
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Entypo name="list" size={size} color={color} />;
          },
        }}
        name="Reportes"
        component={Reports}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Entypo name="home" size={size} color={color} />;
          },
        }}
        name="Inicio"
        component={Home}
      />
      <Tab.Screen
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => {
            return <Entypo name="users" size={size} color={color} />;
          },
          headerRight: () => (
            <TouchableOpacity
              color="#008ae8"
              title="Button"
              onPress={() => {
                navigation.navigate("Nuevo Barbero");
              }}
              style={styles.btn}
            >
              <AntDesign name="pluscircleo" size={32} color="white" />
            </TouchableOpacity>
          ),
        })}
        name="Barberos"
        component={Users}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  btn: {
    marginRight: 10,
  },
});

export default Tabsn;
