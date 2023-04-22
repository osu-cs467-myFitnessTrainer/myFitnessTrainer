// exercise library json file import
import * as exercise_library from "../exercise_library/exercise_library.json" assert { type: "json" }

import db from "../myFitnessTrainer/firebaseConfig.js"

async function addExercise(exercise) {
  try {
    await addDoc(collection(db, "exercises"), exercise)
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

const exercises = exercise_library.default

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
