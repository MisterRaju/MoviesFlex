import React from "react";
import { StyleSheet,Text, View, Image, FlatList, ActivityIndicator } from "react-native";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { icons } from "@/constants/icons";
import SearchBar from '@/components/SearchBar';

const search = () => {
  const router = useRouter();
  const {
    data: movies,
    loading,
    error,
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0 "
        resizeMode="cover"
      />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5 "
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo}  className="h-12 w-10"/>
            </View>
            <View className="my-5">
              <SearchBar placeholder="Search Movies ..."/>
            </View>

            {loading && (
              <ActivityIndicator size="large" color="white" className="my-3"/>
            )}

            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error:{moviesError.message}
              </Text>
            )}

            {
              !loading && !error && "Search Term".trim() && movies?.length > 0 && (
                <Text className="text-xl text-white font-bold">
                  Search results for {"  "}
                  <Text className="text-accent">Search Term</Text>
                </Text>
              )
            }
          </>
        }
      />
    </View>
  );
};

export default search;

const styles = StyleSheet.create({});
