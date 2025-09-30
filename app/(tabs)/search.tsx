import {View, Text, Image, FlatList, ActivityIndicator} from "react-native";
import {images} from "@/constants/images";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import {icons} from "@/constants/icons";
import {useEffect, useState} from "react";
import {updateSearchCount} from "@/services/appwrite";

const Search = () => {

    const [searchQuery, setSearchQuery ] = useState('');

    const {
        data: movies,
        isLoading: moviesLoading,
        error: moviesError,
        refetch: moviesRefetch,
        reset: moviesReset,
    } = useFetch(() => fetchMovies({
        query: searchQuery,
    }), false);

    useEffect(()=>{

        const timeoutId = setTimeout( async () => {
            if(searchQuery.trim()) {
                if(movies?.length > 0 && movies?.[0])
                    await updateSearchCount(searchQuery, movies[0]);

                await moviesRefetch();
            } else {
                moviesReset();
            }
        }, 500);

        return () => clearTimeout(timeoutId);

    }, [searchQuery])

    return (
        <View className={'flex-1 bg-primary'}>
            <Image source={images.bg} className="absolute w-full z-0"/>

            <FlatList
                data={ movies }
                keyExtractor={(item)=> item.id.toString()}
                numColumns={3}
                renderItem={({item}) => (
                    <MovieCard {...item}/>
                )}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={{
                    justifyContent: 'center',
                    gap: 20,
                    marginVertical: 16,
                    paddingLeft: 8,
                    paddingRight: 8,
                }}
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
                ListHeaderComponent={
                    <>
                        <View className="w-full flex-row justify-center mt-20 items-center">
                           <Image
                               source={icons.logo}
                               className="w-12 h-10"
                           />
                        </View>

                        <View className=" my-5 px-5">
                            <SearchBar
                                placeholder="Search movies..."
                                value={searchQuery}
                                onChangeText={(text)=> setSearchQuery(text)}
                            />
                        </View>

                        {moviesLoading && (
                            <ActivityIndicator
                                size="large"
                                color="#0000ff"
                                className="my-6"
                            />
                        )}

                        {moviesError &&(
                            <Text className="text-red-500 px-5 my-3">
                                Error: {moviesError.message}
                            </Text>
                        )}

                        {
                            !moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
                                <View className="flex justify-center items-center">
                                    <Text className="text-xl text-white font-bold">
                                        Search results for {''}
                                        <Text className="text-darkAccent">{searchQuery}</Text>
                                    </Text>
                                </View>
                            )
                        }
                    </>
                }
                ListEmptyComponent={
                    !moviesLoading && !moviesError ? (
                        <View className="mt-10 px-5">
                            <Text className="text-gray-500 text-center">
                                {searchQuery.trim() ? 'No results found' : 'Start searching for movies'}
                            </Text>
                        </View>
                    ) : null
                }
            />
        </View>
    )
};

export default Search;