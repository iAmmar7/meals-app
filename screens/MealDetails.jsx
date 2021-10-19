import React, { useState, useLayoutEffect } from 'react';
import { ScrollView, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { CustomText } from '/components';
import colors from '../constants/colors';

const MealDetails = (props) => {
  const {
    navigation,
    route: { params: { meal, bgColor } = {} },
  } = props;
  const [favorite, setFavorite] = useState(false);

  useLayoutEffect(() => {
    // Add icon on stack navigator header
    navigation.setOptions({
      headerRight: () =>
        favorite ? (
          <TouchableOpacity onPress={() => setFavorite(!favorite)}>
            <Ionicons name="heart-sharp" size={24} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setFavorite(!favorite)}>
            <Ionicons name="heart-outline" size={24} color="white" />
          </TouchableOpacity>
        ),
    });

    // Change color of tab on Tab navigator
    navigation.getParent().setOptions({
      tabBarColor: bgColor ? colors.darkGrey : colors.primary,
    });
  }, [navigation, favorite]);

  const textColor = bgColor ? colors.black : colors.white;

  return (
    <ScrollView style={{ backgroundColor: bgColor ?? colors.secondary }}>
      <Image source={{ uri: meal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <CustomText white>{meal.duration}m</CustomText>
        <CustomText white>{meal.complexity.toUpperCase()}</CustomText>
        <CustomText white>{meal.affordability.toUpperCase()}</CustomText>
      </View>
      <CustomText title bold style={{ ...styles.title, color: textColor }}>
        Ingredients
      </CustomText>
      {meal.ingredients.map((ing) => (
        <View key={ing} style={styles.listItem}>
          <CustomText style={{ color: textColor }}>{ing}</CustomText>
        </View>
      ))}
      <CustomText title bold style={{ ...styles.title, color: textColor }}>
        Steps
      </CustomText>
      {meal.steps.map((step, index) => (
        <View key={step} style={styles.listItem}>
          <CustomText bold style={{ color: textColor }}>
            {index + 1}
          </CustomText>
          <CustomText style={{ ...styles.hyphen, color: textColor }}>-</CustomText>
          <CustomText style={{ ...styles.stepDetails, color: textColor }}>{step}</CustomText>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  details: {
    backgroundColor: colors.darkGrey,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 10,
    justifyContent: 'space-around',
  },
  title: {
    textAlign: 'center',
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    flexDirection: 'row',
  },
  hyphen: {
    marginHorizontal: 4,
  },
  stepDetails: {
    width: '95%',
  },
});

export default MealDetails;
