import { StyleSheet, TextInput, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

interface Props {
  placeholder: string;
  onPress?: () => void;
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar: React.FC<Props> = ({ placeholder, onPress, value, onChangeText }) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-5">
      <Image
        source={icons.search}
        className="size-10"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TouchableOpacity onPress={onPress} className="flex-1">
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#a8b5db"
          className="text-white"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
