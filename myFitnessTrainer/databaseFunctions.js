import { collection, doc, getDoc, getDocs, query, where, addDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";


/*********** GENERAL DATABASE FUNCTIONS START ******************************/

const getStringFieldValueInDocument = async (collectionName, documentId, fieldName) => {
    const docRef = doc(db, collectionName, documentId);
    console.log("docRef", docRef);
    const docSnap = await getDoc(docRef);
    console.log("docSnap.data().fieldName=", docSnap.data().fieldName);
    return docSnap.data().fieldName;
};


/**
 *
 * @param {String} collectionName
 * @param {String} searchKey: document key to be searched
 * @param {String} seachString: searchString to match searchKey
 * @returns {Promise<String>} the requested document, in the specifed collection. undefined if the document doesn't exist
 */
const getDocuments = async (collectionName, searchKey, searchString) => {
    const q = query(
        collection(db, collectionName),
        where(searchKey, "==", searchString)
    );
    const docSnapshot = await getDocs(q);
    if (docSnapshot.exists()) {
        return docSnapshot.data();
    } else {
        console.log("No such document");
    }
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


const updateFieldValueInDocument = async (collectionName, id, fieldName, newValue) => {
    const docRef = doc(db, collectionName, id);
    return await updateDoc(docRef, {
        fieldName: newValue
    });
};


/**
 *
 * @param {String} collectionName
 * @returns {Array} Array of each document object in the specified collection
 */
const getAllDocuments = async (collectionName) => {
    const collectionDocuments = [];
    const querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        collectionDocuments.push(doc.data());
    });
    return collectionDocuments;
};

/*********** GENERAL DATABASE FUNCTIONS END ******************************/

export { getStringFieldValueInDocument, getDocuments, getDocumentId, postDocument, getAllDocuments, updateFieldValueInDocument };
