import {View, Text, Touchable, TouchableOpacity, Image} from 'react-native'
import {Link} from "expo-router";
import {icons} from "@/constants/icons";

const MovieCard = ({ id, poster_path, title, vote_average, release_date, original_language}: Movie) => {

    return (
        <Link href={`/movies/${id}`} asChild>
            <TouchableOpacity className="w-[30%] p-1">
                <Image
                    source={{
                        uri: poster_path
                            ? `https://image.tmdb.org/t/p/w500${poster_path}`
                            : 'https://via.placeholder.com/600x400/1a1a1a/ffffff.png'
                    }}
                    className={`w-full h-52 rounded-lg`}
                    resizeMode="cover"
                />

                <Text
                    className="text-sm font-bold text-white mt-2 h-10"
                    numberOfLines={2}
                    ellipsizeMode="tail"
                >
                    {title}
                </Text>

                <View className={`flex-row justify-start items-center gap-x-1`}>
                    <Image
                        source={icons.star}
                        className={`size-4`}
                    />
                    <Text className={`text-xs text-white font-bold uppercase`}>{(vote_average).toFixed(1)}</Text>
                </View>


                <View className={`flex-row justify-between items-center mt-1`}>
                    <Text className={`text-xs text-gray-500 font-medium`}>{release_date?.split('-')[0]}</Text>
                    <Text className={`text-xs text-gray-500 font-medium uppercase`}>{original_language}</Text>
                </View>
            </TouchableOpacity>
        </Link>
    )
}

export default MovieCard;