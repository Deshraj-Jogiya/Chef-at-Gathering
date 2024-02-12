import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
// const firebaseConfig = {
//     apiKey: "AIzaSyBx24apymcCmbnROkXnX9ANrCm6Iq6xzao",
//     authDomain: "chef-republic.firebaseapp.com",
//     databaseURL: "https://chef-republic-default-rtdb.firebaseio.com/",
//     projectId: "chef-republic",
//     storageBucket: "chef-republic.appspot.com",
//     messagingSenderId: "55683319355",
//     appId: "1:55683319355:web:0d62bc23622426d3fc7e1e",
//     measurementId: "G-7841L00ZDM"
// };
const firebaseConfig = {
    apiKey: "AIzaSyBx24apymcCmbnROkXnX9ANrCm6Iq6xzao",
    authDomain: "chef-republic.firebaseapp.com",
    databaseURL: "https://chef-republic-default-rtdb.firebaseio.com",
    projectId: "chef-republic",
    storageBucket: "chef-republic.appspot.com",
    messagingSenderId: "55683319355",
    appId: "1:55683319355:web:0d62bc23622426d3fc7e1e",
    measurementId: "G-7841L00ZDM"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function sendMessage(roomId, text) {
    try {
        await addDoc(collection(db, 'chat-' + roomId), {
            uid: roomId,
            message: text.trim(),
            owner: localStorage.getItem("owner"),
            timestamp: serverTimestamp(),
        });
    } catch (error) {
        console.error(error);
    }
}
function getMessages(roomId, callback) {
    return onSnapshot(
        query(
            collection(db, 'chat-' + roomId),
            orderBy('timestamp', 'asc')
        ),
        (querySnapshot) => {
            const messages = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            callback(messages);
        }
    );
}

export { sendMessage, getMessages };