import {ActivityIndicator, FlatList, Image, ScrollView, Text, View} from "react-native";
import '../globals.css';
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import {useRouter} from "expo-router";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import MovieCard from "@/components/MovieCard";

export default function Index() {

    const router = useRouter();

    const {
        data: movies,
        isLoading: moviesLoading,
        error: moviesError
    } = useFetch(() => fetchMovies({
        query: '',
    }));

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0"/>

        <ScrollView className="flex-1 px-5">
            <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>

            {moviesLoading ? (
                <ActivityIndicator
                    size="large"
                    color="#0000FF"
                    className="mt-10 self-center"
                />
            ) : moviesError ? (
                <Text className="text-white text-center">Error: {moviesError?.message}</Text>
            ) : (
                <View className="flex-1 mt-5">
                    <SearchBar
                        onPress={()=>  router.push('/search')}
                        placeholder = 'Search for a movie'
                    />

                    <>
                        <Text className="text-white text-lg font-bold mt-5 mb-3">
                            Latest Movies
                        </Text>

                        <FlatList
                            data={ movies }
                            keyExtractor={(item)=> item.id.toString()}
                            numColumns={3}
                            renderItem={({item}) => (
                                <MovieCard {...item}/>
                            )}
                            columnWrapperStyle={{
                                justifyContent: 'flex-start',
                                gap: 20,
                                paddingRight: 5,
                                marginBottom: 10
                            }}
                        />
                    </>
                </View>
            )}
        </ScrollView>
    </View>
  );
}
