import { View } from "react-native";
import React from "react";
import CustomizableGetActiveWorkoutPlanButton from "./CustomizableGetActiveWorkoutPlanButton";

const ViewWorkoutPlanButton = () => {  
    return (
        <View>
          <CustomizableGetActiveWorkoutPlanButton routeTo="View Workout Plan" textInButton="View Workout Plan" buttonStyle="viewButton" buttonTextStyle="viewButtonText" />
        </View>
    );
};
  

export default ViewWorkoutPlanButton;
