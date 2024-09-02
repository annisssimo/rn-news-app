import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { NewsDataType } from "@/types";
import SliderItem from "@/components/SliderItem";

type Props = {
    newsList: Array<NewsDataType>
}

const BreakingNews = ({newsList}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BreakingNews</Text>
      <View style={styles.slideWrapper}>
      <FlatList
        data={newsList} keyExtractor={(_, index) => `listItem${index}`}
        renderItem={({item, index}) => <SliderItem slideItem={item} index={index} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />
      </View>
    </View>
  );
};

export default BreakingNews;

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,

    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: Colors.black,
        marginBottom: 10,
        marginLeft: 20,
    },
    slideWrapper: {
        justifyContent: 'center',
    }
});
