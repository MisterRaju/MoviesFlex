import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import { fetchMovies } from "@/services/api";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchMovies({ query: searchQuery });
        setMovies(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]);

  return (
    <View className="bg-primary flex-1">
      <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode="cover" />

      <FlatList
        data={movies ?? []}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item?.id?.toString() ?? Math.random().toString()}
        extraData={movies}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{ gap: 5, justifyContent: "center", marginVertical: 16 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-10 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className="my-5">
              <SearchBar
                placeholder="Search for a movie ..."
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
              />
            </View>

            {loading && <ActivityIndicator size="large" color="#0000ff" className="my-3" />}
            {error && <Text className="text-red-500 px-5 my-3"> Error: {error.message} </Text>}

            {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <Text className="text-xl text-white font-bold">
                Search Results for <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
      />
    </View>
  );
};

export default Search;
