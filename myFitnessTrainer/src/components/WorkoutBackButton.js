import { StyleSheet } from 'react-native';
import React from 'react';
import { HeaderBackButton } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';

const WorkoutBackButton = () => {
    const navigation = useNavigation();
  return (
    <HeaderBackButton onPress={() => navigation.navigate('Dashboard')}/>
  );
}

export default WorkoutBackButton;
