import {Tabs} from "expo-router";

const _Layout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    name: "Home",
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    name: "Search",
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    name: "Saved",
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    name: "Profile",
                    headerShown: false,
                }}
            />
        </Tabs>
    )
};

export default _Layout;