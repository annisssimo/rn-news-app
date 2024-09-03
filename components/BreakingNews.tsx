import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue, runOnJS } from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import { NewsDataType } from "@/types";
import SliderItem from "@/components/SliderItem";

const { width } = Dimensions.get("screen");

type Props = {
  newsList: Array<NewsDataType>;
};

const BreakingNews = ({ newsList }: Props) => {
  const [paginationIndex, setPaginationIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const ref = useAnimatedRef<FlatList<NewsDataType>>();

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
      const index = Math.round(event.contentOffset.x / width);
      runOnJS(setPaginationIndex)(index);
    },
  });

  const scrollToIndex = (index: number) => {
    if (ref.current && index < newsList.length) {
      ref.current.scrollToIndex({ animated: true, index });
      setPaginationIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breaking News</Text>
      <View style={styles.slideWrapper}>
        <Animated.FlatList
          ref={ref}
          data={newsList}
          keyExtractor={(item) => `listItem${item.article_id}`}
          renderItem={({ item, index }) => (
            <SliderItem slideItem={item} index={index} scrollX={scrollX} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={onScrollHandler}
          scrollEventThrottle={16}
          onEndReachedThreshold={0.5}
        />
      </View>
      <View style={styles.paginationWrapper}>
        {newsList.map((_, index) => (
          <TouchableOpacity key={`dot-${index}`} onPress={() => scrollToIndex(index)}>
            <View
              style={[
                styles.dot,
                paginationIndex === index && styles.activeDot,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default BreakingNews;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 10,
    marginLeft: 20,
  },
  slideWrapper: {
    justifyContent: "center",
  },
  paginationWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: Colors.lightGrey,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: Colors.black,
    width: 10,
    height: 10,
  },
});
