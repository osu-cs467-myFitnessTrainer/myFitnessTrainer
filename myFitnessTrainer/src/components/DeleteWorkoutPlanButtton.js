import { View } from "react-native";
import React from "react";
import CustomizableGetActiveWorkoutPlanButton from "./CustomizableGetActiveWorkoutPlanButton";

const DeleteWorkoutPlanButton = () => {
    return (
        <View>
          <CustomizableGetActiveWorkoutPlanButton routeTo="Delete Workout Plan" textInButton="Delete Workout Plan" buttonStyle="deleteButton" buttonTextStyle="deleteButtonText" />
        </View>
    );
};

export default DeleteWorkoutPlanButton;