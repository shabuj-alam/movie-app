import React from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import {Link} from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import {images} from "@/constants/images";

const TrendingCard = ({ movie: { movieID, movieTitle, posterUrl }, index }: TrendingCardProps) => {
    return (
        <Link href={`/movies/${movieID}`} asChild>
            <TouchableOpacity className="w-32 relative pl-5">
                <Image
                    source={{ uri: posterUrl }}
                    className="w-32 h-48 rounded-lg"
                    resizeMode="cover"
                />

                <View className="absolute bottom-9 -left-3 ml-1 px-3 py-1 rounded-lg">
                    <MaskedView  maskElement={
                        <Text className="font-bold text-white text-6xl">{index + 1}</Text>
                    }>
                        <Image
                            source={images.rankingGradient}
                            className="size-14"
                            resizeMode="cover"
                        />
                    </MaskedView>
                </View>
                <Text className="text-white text-sm font-bold mt-2 h-10" numberOfLines={2} ellipsizeMode="tail">
                    {movieTitle}
                </Text>
            </TouchableOpacity>
        </Link>
    )
}

export default TrendingCard;