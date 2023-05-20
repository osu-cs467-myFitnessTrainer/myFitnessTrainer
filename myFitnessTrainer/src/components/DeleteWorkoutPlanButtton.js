import React from "react";
import CustomizableGetActiveWorkoutPlanButton from "./CustomizableGetActiveWorkoutPlanButton";

const DeleteWorkoutPlanButton = () => {
    return (
      <CustomizableGetActiveWorkoutPlanButton routeTo="Delete Workout Plan" textInButton="Delete Workout Plan" buttonStyle="deleteButton" buttonTextStyle="deleteButtonText" />
    );
};

export default DeleteWorkoutPlanButton;