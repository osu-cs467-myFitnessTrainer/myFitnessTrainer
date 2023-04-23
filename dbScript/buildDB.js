// exercise library json file import
import * as exercise_library from "../exercise_library/exercise_library.json" assert { type: "json" }

import db from "../myFitnessTrainer/firebaseConfig.js"

// Helper Function to determine our default exercise stats
async function addExerciseStatToDB(fitnessLevel, fitnessGoal, equipment) {
  let exerciseStat = {
    reps: null,
    sets: null,
    weight: null,
    incline: null,
    speed: null,
    resistance: null,
    time_in_sec: null
  };

  // made weight low (5 lb), user should determine weight on first exercise attempt
  if (fitnessGoal === 'strength' && fitnessLevel === 'beginner') {
    exerciseStat['reps'] = 10;
    exerciseStat['sets'] = 1;
    if (equipment !== 'bodyweight'){
      exerciseStat['weight'] = 5;
    }
  }
  if (fitnessGoal === 'strength' && fitnessLevel === 'intermediate') {
    exerciseStat['reps'] = 10;
    exerciseStat['sets'] = 2;
    if (equipment !== 'bodyweight'){
      exerciseStat['weight'] = 5;
    }
  }
  if (fitnessGoal === 'strength' && fitnessLevel === 'advanced') {
    exerciseStat['reps'] = 10;
    exerciseStat['sets'] = 3;
    if (equipment !== 'bodyweight'){
      exerciseStat['weight'] = 5;
    }
  }
  if (fitnessGoal === 'flexibility' && fitnessLevel === 'beginner') {
    exerciseStat['time_in_sec'] = 60;
    exerciseStat['reps'] = 1;
  }
  if (fitnessGoal === 'flexibility' && fitnessLevel === 'intermediate') {
    exerciseStat['time_in_sec'] = 60;
    exerciseStat['reps'] = 2;
  }
  if (fitnessGoal === 'flexibility' && fitnessLevel === 'advanced') {
    exerciseStat['time_in_sec'] = 60;
    exerciseStat['reps'] = 3;
  }
  if (fitnessGoal === 'cardio' && fitnessLevel === 'beginner') {
    exerciseStat['time_in_sec'] = 600; // 10 min

    if (equipment === 'treadmill') {
      exerciseStat['speed'] = 3;
    }
    if (equipment === 'elliptical') {
      exerciseStat['speed'] = 4;
    }
    if (equipment === 'stationary_bike') {
      exerciseStat['speed'] = 1;
    }
  }
  if (fitnessGoal === 'cardio' && fitnessLevel === 'intermediate') {
    exerciseStat['time_in_sec'] = 900; // 15 min
    if (equipment === 'treadmill') {
      exerciseStat['speed'] = 3.5;
    }
  }
  if (fitnessGoal === 'cardio' && fitnessLevel === 'advanced') {
    exerciseStat['time_in_sec'] = 1200; // 20 min
    if (equipment === 'treadmill') {
      exerciseStat['speed'] = 3.5;
      
    }
  }

  const statDocRef = await addDoc(collection(db, "exercise_stats"), exerciseStat);
  return statDocRef;
}

async function addExercise(exercise) {
  const statDocRef = await addExerciseStatToDB(
      exercise["fitness_level"],
      exercise["fitness_goal"],
      exercise["equipment"]
    );
  
  const exerciseToAdd = exercise;
  exerciseToAdd["default_exercise_stat_id"] = statDocRef;

  try {
    await addDoc(collection(db, "exercises"), exerciseToAdd)
  } catch (error) {
    console.error("Error writing new message to Firebase Database", error)
  }
}
/***************** BUILD DB SCRIPT INSTRUCTIONS *******************************/
/* 
  - In order to run this script, you must edit the package.json file to allow 'module' imports

  - Add in key value pair, 'type': 'module' into package.json as shown below

  {
    ...
    'dependencies': {...},
    'type': 'module'
    ...
  }
  
*/
/******************************************************************************/

//const exercises = exercise_library.default

// handles the nested data structure in the strength object
const handleStrengthCase = (category) => {
  for (const muscleGroup in exercises[category]) {
    // returns 'lower body' and 'upper body'
    const muscleGroupList = exercises[category][muscleGroup]
    for (const difficulty in muscleGroupList) {
      // returns 'beginner', 'intermediate', and 'advanced' arrays
      const difficultyList = muscleGroupList[difficulty]
      for (let i = 0; i < difficultyList.length; i++) {
        const exercise = difficultyList[i]
        addExercise(exercise)
      }
    }
  }
}

function processJSON() {
  for (const category in exercises) {
    if (category == "strength") {
      handleStrengthCase(category)
    } else {
      const categoryObj = exercises[category]
      for (const difficulty in categoryObj) {
        const difficultyList = categoryObj[difficulty]
        for (let i = 0; i < difficultyList.length; i++) {
          const exercise = difficultyList[i]
          addExercise(exercise)
        }
      }
    }
  }
}

processJSON()
