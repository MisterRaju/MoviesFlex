import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import { fetchMovies } from "@/services/api";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(""); // Debounced search value
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch initial movies when the component mounts
  useEffect(() => {
    const fetchInitialMovies = async () => {
      setLoading(true);
      try {
        const result = await fetchMovies({ query: "" }); // Fetch default movies (e.g., trending)
        setMovies(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialMovies();
  }, []);

  // Debounce: Update `debouncedQuery` 500ms after user stops typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(handler); // Cleanup timeout
  }, [searchQuery]);

  // Fetch movies when `debouncedQuery` changes
  useEffect(() => {
    const fetchData = async () => {
      if (!debouncedQuery.trim()) return; // If search is empty, keep initial movies

      setLoading(true);
      setError(null);
      try {
        const result = await fetchMovies({ query: debouncedQuery });
        setMovies(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedQuery]);

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
                onChangeText={setSearchQuery}
              />
            </View>

            {loading && <ActivityIndicator size="large" color="#0000ff" className="my-3" />}
            {error && <Text className="text-red-500 px-5 my-3"> Error: {error.message} </Text>}

            {!loading && !error && debouncedQuery.trim() && movies?.length > 0 && (
              <Text className="text-xl text-white font-bold">
                Search Results for <Text className="text-accent">{debouncedQuery}</Text>
              </Text>
            )}
          </>
        }
        // Show "No movies found" when search is empty
        ListEmptyComponent={
          !loading && debouncedQuery.trim() ? (
            <View className="flex-1 justify-center items-center my-10">
              <Text className="text-white text-lg">No movies found!</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
