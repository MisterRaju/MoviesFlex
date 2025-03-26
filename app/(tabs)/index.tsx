import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import { Text, View, Image, ScrollView } from "react-native";



export default function Index(){
  const router=useRouter();
  return (
    <View className="bg-primary flex-1 ">
      <Image source={images.bg} className="absolute w-full z-0" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="mx-auto mt-20 mb-10" />
        <View className="flex-1 mt-5">
        <SearchBar onPress={()=>{router.push("/search")}} placeholder="Search for a movie"/>
        </View>
      </ScrollView>
    </View>
  );
}
