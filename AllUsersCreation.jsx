import { View, Text, FlatList, Image, Dimensions, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../../services/GlobalApi";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function AllUsersCreation() {
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [aiImageList, setAiImageList] = useState([]);
  const router = useRouter();

  const ColumnWidth = Dimensions.get("screen").width * 0.86 / 2;

  useEffect(() => {
    setAiImageList([]); // Clear list initially
    GetAllAiImages(pageSize);
  }, []);

  /* Fetch All User AI Images */
  const GetAllAiImages = async (size) => {
    setLoading(true);

    try {
      const result = await GlobalApi.GetAllAiImages(size);
      console.log("✅ All Images:", result.data.data);

      if (result.data && result.data.data) {
        // ✅ Remove duplicate IDs before updating state
        const uniqueImages = result.data.data.filter(
          (newItem) => !aiImageList.some((existingItem) => existingItem.id === newItem.id)
        );

        setAiImageList((prev) => [...prev, ...uniqueImages]);
      }
    } catch (error) {
      console.error("🚨 Error Fetching Images:", error);
    }

    setLoading(false);
  };

  /* Infinite Scroll Loader */
  const RenderFoot = () => {
    return loading ? <ActivityIndicator size={"large"} color={Colors.PRIMARY} /> : null;
  };

  /* Image Click - Navigate to View Image */
  const OnImageClickHandle = (item) => {
    router.push({
      pathname: "/viewAiImage",
      params: {
        imageUrl: item.imageUrl,
        prompt: "Hidden",
      },
    });
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}> User's Creation</Text>

      <FlatList
        data={aiImageList}
        numColumns={2}
        keyExtractor={(item, index) => item?.id ? String(item.id) : `index-${index}`} // ✅ Ensures unique keys
        onEndReached={() => GetAllAiImages(pageSize + 5)}
        onEndReachedThreshold={0.7}
        ListFooterComponent={RenderFoot}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => OnImageClickHandle(item)} style={{ margin: 5 }}>
            <Image
              source={{ uri: item?.imageUrl }}
              style={{
                height: 250,
                width: ColumnWidth,
                borderRadius: 15,
              }}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
