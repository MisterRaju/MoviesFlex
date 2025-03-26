import { StyleSheet, TextInput, View, Image } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

interface Props{
    placeholder:string;
    onPress?:()=>void;
  }

const SearchBar = ({placeholder,onPress}):Props => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-5">
      <Image
        source={icons.search}
        className="size-10"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value=""
        onChangeText={() => {}}
        placeholderTextColor="#a8b5db"
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
