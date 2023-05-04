import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
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

export { getDocument, getDocumentId, postDocument, getAllDocuments };