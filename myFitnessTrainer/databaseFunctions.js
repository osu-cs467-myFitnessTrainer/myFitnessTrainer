import {
    collection,
    getDocs,
    getDoc,
    doc,
    query,
    where,
    addDoc,
    and,
    updateDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

/*********** GENERAL DATABASE FUNCTIONS START ******************************/

/**
 *
 * @param {String} collectionName
 * @param {String} searchKey: document key to be searched
 * @param {String} seachString: searchString to match searchKey
 * @returns {Promise<String>} the requested document, in the specifed collection. undefined if the document doesn't exist
 */
const getDocument = async (collectionName, searchKey, searchString) => {
    const q = query(
        collection(db, collectionName),
        where(searchKey, "==", searchString)
    );
    const docSnapshot = await getDocs(q);
    // console.log(docSnapshot);
    let document;
    docSnapshot.forEach((doc) => {
        document = doc.data();
        document["id"] = doc.id;
    });
    return document;
};

/**
 *
 * @param {String} collectionName
 * @param {String} searchKey: document key to be searched
 * @param {String} seachString: searchString to match searchKey
 * @returns {Promise<String>} the string ID of the requested document, in the specifed collection. undefined if the document doesn't exist
 */
const getDocumentId = async (collectionName, searchKey, searchString) => {
    let documentId;
    const q = query(
        collection(db, collectionName),
        where(searchKey, "==", searchString)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        documentId = doc.id;
    });
    return documentId;
};

/**
 *
 * @param {String} collectionName
 * @param {Object} postObject
 * @returns {Promise} a reference to the posted Document
 */
const postDocument = async (collectionName, postObject) => {
    return await addDoc(collection(db, collectionName), postObject);
};

/**
 *
 * @param {String} collectionName
 * @returns {Object} Array of each document object in the specified collection
 */
const getAllDocuments = async (collectionName) => {
    const collectionDocuments = {};
    const querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach((doc) => {
        collectionDocuments[doc.id] = doc.data();
    });
    return collectionDocuments;
};

/**
 * @param {String} collectionName
 * @param {String} documentId
 * @param {Object} updateObject Object containing fields to be changed and their new values
 */
const updateDocument = async (collectionName, documentId, updateObject) => {
    const documentRef = doc(db, collectionName, documentId);
    await updateDoc(documentRef, updateObject);
};

/*********** GENERAL DATABASE FUNCTIONS END ******************************/

/*********** USER SPECIFIC DATABASE FUNCTIONS BEGIN ******************************/

/**
 *
 * @param {String} email
 * @returns {Promise<String>} the string ID of the requested document, in the specifed collection. undefined if the document doesn't exist
 */
const getUsernameWithUserId = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data();

    return docData.username;
};

/*********** USER SPECIFIC DATABASE FUNCTIONS END ******************************/

/*********** WORKOUT SPECIFIC DATABASE FUNCTIONS BEGIN ******************************/

/**
 *
 * @param {String} userId
 * @returns {Promise<Boolean>} returns a boolean of whether user has made a workout plan
 */
const userhasWorkoutPlan = async (userId) => {
    let workoutPlan;
    const q = query(
        collection(db, "workout_plans"),
        and(where("user_id", "==", userId))
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        workoutPlan = doc;
    });

    return !!workoutPlan;
};

/**
 *
 * @param {String} userId
 * @returns {Promise<Boolean>} returns a boolean of whether user has an active workout plan
 */
const userHasActiveWorkoutPlan = async (userId) => {
    let activeWorkoutPlan;
    const q = query(
        collection(db, "workout_plans"),
        and(where("user_id", "==", userId), where("active", "==", true))
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        activeWorkoutPlan = doc;
    });

    return !!activeWorkoutPlan;
};

const getUserActivePlan = async (userId) => {
    let activeWorkoutPlan;
    const q = query(
        collection(db, "workout_plans"),
        and(where("user_id", "==", userId), where("active", "==", true))
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        activeWorkoutPlan = doc.data();
        activeWorkoutPlan["id"] = doc.id;
    });

    return activeWorkoutPlan;
};

/*********** WORKOUT SPECIFIC DATABASE FUNCTIONS END ******************************/

export {
    getDocument,
    getDocumentId,
    postDocument,
    getAllDocuments,
    getUsernameWithUserId,
    userhasWorkoutPlan,
    userHasActiveWorkoutPlan,
    updateDocument,
    getUserActivePlan,
};
