import { Timestamp } from "firebase/firestore";

export const dateToTimestamp = date => {
    const dateObject = new Date(date);
    const timestamp = dateObject.getTime();
    const firestoreTimestamp = Timestamp.fromMillis(timestamp);
    return firestoreTimestamp;
}