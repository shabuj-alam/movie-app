import {View, Text, Image} from "react-native";
import {icons} from "@/constants/icons";

const Saved = () => {
    return (
        <View className="flex-1 bg-primary">
            <View className="flex flex-1 flex-col justify-center items-center gap-5">
                <Image
                    source={icons.save}
                    className="size-10"
                    tintColor="fff"
                />
                <Text className="text-gray-500 text-base">
                    Save
                </Text>
            </View>
        </View>
    )
};

export default Saved;