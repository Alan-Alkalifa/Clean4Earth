import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDvNDsvypNNhduM9RwL9rB3kQhar6dOeDk",
    authDomain: "clean4earth-f58f2.firebaseapp.com",
    databaseURL: "https://clean4earth-f58f2-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "clean4earth-f58f2",
    storageBucket: "clean4earth-f58f2.firebasestorage.app",
    messagingSenderId: "1033001274307",
    appId: "1:1033001274307:web:47eb770b09eb72cd964b76",
    measurementId: "G-854QH74YYX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const submitVolunteerForm = async (formData: {
    name: string;
    email: string;
    phone: string;
    role: string;
    interests: string[];
    availability: string;
    message: string;
}) => {
    try {
        const docRef = await addDoc(collection(db, 'volunteerForms'), {
            ...formData,
            timestamp: new Date().toISOString()
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error submitting form:', error);
        return { success: false, error };
    }
};

export const submitContactForm = async (formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
}) => {
    try {
        const docRef = await addDoc(collection(db, 'contactForms'), {
            ...formData,
            timestamp: new Date().toISOString()
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error submitting contact form:', error);
        return { success: false, error };
    }
};

export const submitRegistrationForm = async (formData: {
    fullName: string;
    email: string;
    phone: string;
    organization?: string;
    attendanceDate: string;
    numberOfGuests: number;
    specialRequirements?: string;
    eventTitle: string;
    eventDate: string;
    eventTime: string;
}) => {
    try {
        const docRef = await addDoc(collection(db, 'registrations'), {
            ...formData,
            timestamp: new Date().toISOString(),
            status: 'pending'
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error submitting registration:', error);
        return { success: false, error };
    }
};

export { db };