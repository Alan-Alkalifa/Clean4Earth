import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, orderBy, getDocs, doc, updateDoc, deleteDoc, writeBatch, startAt, endAt, serverTimestamp } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDvNDsvypNNhduM9RwL9rB3kQhar6dOeDk",
    authDomain: "clean4earth-f58f2.firebaseapp.com",
    databaseURL: "https://clean4earth-f58f2-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "clean4earth-f58f2",
    storageBucket: "clean4earth-f58f2.appspot.com",
    messagingSenderId: "1033001274307",
    appId: "1:1033001274307:web:47eb770b09eb72cd964b76",
    measurementId: "G-854QH74YYX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Initialize authentication
export const initializeAuth = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error('Authentication error:', error);
        return { success: false, error };
    }
};

export interface FormData {
    id: string;
    timestamp: string;
    [key: string]: any;
}

export interface Registration extends FormData {
    fullName: string;
    email: string;
    phone: string;
    organization?: string;
    eventTitle: string;
    eventDate: string;
    eventTime: string;
    attendanceDate: string;
    numberOfGuests: number;
    specialRequirements?: string;
    status: string;
}

export interface Volunteer extends FormData {
    name: string;
    email: string;
    phone: string;
    role: string;
    interests: string[];
    availability: string;
    message: string;
    status: string;
}

export interface Contact extends FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    quantity: number;
}

export interface FetchResponse<T> {
    success: boolean;
    data: T[];
    error?: any;
}

export interface OperationResponse {
    success: boolean;
    error?: any;
    id?: string;
}

export const submitVolunteerForm = async (formData: {
    name: string;
    email: string;
    phone: string;
    role: string;
    interests: string[];
    availability: string;
    message: string;
}): Promise<OperationResponse> => {
    try {
        const docRef = await addDoc(collection(db, 'volunteerForms'), {
            ...formData,
            status: 'pending',
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
}): Promise<OperationResponse> => {
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
}): Promise<OperationResponse> => {
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

export const fetchRegistrations = async (): Promise<FetchResponse<Registration>> => {
    try {
        const q = query(collection(db, 'registrations'), orderBy('timestamp', 'desc'));
        const snapshot = await getDocs(q);
        const registrations = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Registration[];
        
        return { success: true, data: registrations };
    } catch (error) {
        console.error('Error fetching registrations:', error);
        return { success: false, error, data: [] };
    }
};

export const fetchVolunteers = async (): Promise<FetchResponse<Volunteer>> => {
    try {
        const q = query(collection(db, 'volunteerForms'), orderBy('timestamp', 'desc'));
        const snapshot = await getDocs(q);
        const volunteers = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Volunteer[];
        
        return { success: true, data: volunteers };
    } catch (error) {
        console.error('Error fetching volunteers:', error);
        return { success: false, error, data: [] };
    }
};

export const fetchContacts = async (): Promise<FetchResponse<Contact>> => {
    try {
        const q = query(collection(db, 'contactForms'), orderBy('timestamp', 'desc'));
        const snapshot = await getDocs(q);
        const contacts = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Contact[];
        
        return { success: true, data: contacts };
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return { success: false, error, data: [] };
    }
};

export const updateRegistration = async (id: string, data: Partial<Registration>): Promise<OperationResponse> => {
    try {
        const docRef = doc(db, 'registrations', id);
        await updateDoc(docRef, {
            ...data,
            updatedAt: new Date().toISOString()
        });
        return { success: true, id };
    } catch (error) {
        console.error('Error updating registration:', error);
        return { success: false, error };
    }
};

export const deleteRegistration = async (id: string): Promise<OperationResponse> => {
    try {
        const docRef = doc(db, 'registrations', id);
        await deleteDoc(docRef);
        return { success: true };
    } catch (error) {
        console.error('Error deleting registration:', error);
        return { success: false, error };
    }
};

export const updateRegistrationStatus = async (id: string, status: string): Promise<OperationResponse> => {
    return updateRegistration(id, { status });
};

export const updateVolunteer = async (id: string, data: Partial<Volunteer>): Promise<OperationResponse> => {
    try {
        const docRef = doc(db, 'volunteerForms', id);
        await updateDoc(docRef, {
            ...data,
            updatedAt: new Date().toISOString()
        });
        return { success: true, id };
    } catch (error) {
        console.error('Error updating volunteer:', error);
        return { success: false, error };
    }
};

export const deleteVolunteer = async (id: string): Promise<OperationResponse> => {
    try {
        const docRef = doc(db, 'volunteerForms', id);
        await deleteDoc(docRef);
        return { success: true };
    } catch (error) {
        console.error('Error deleting volunteer:', error);
        return { success: false, error };
    }
};

export const updateVolunteerStatus = async (id: string, status: string): Promise<OperationResponse> => {
    return updateVolunteer(id, { status });
};

export const updateContact = async (id: string, data: Partial<Contact>): Promise<OperationResponse> => {
    try {
        const docRef = doc(db, 'contactForms', id);
        await updateDoc(docRef, {
            ...data,
            updatedAt: new Date().toISOString()
        });
        return { success: true, id };
    } catch (error) {
        console.error('Error updating contact:', error);
        return { success: false, error };
    }
};

export const deleteContact = async (id: string): Promise<OperationResponse> => {
    try {
        const docRef = doc(db, 'contactForms', id);
        await deleteDoc(docRef);
        return { success: true };
    } catch (error) {
        console.error('Error deleting contact:', error);
        return { success: false, error };
    }
};

export const batchUpdateStatus = async (
    type: 'registration' | 'volunteer' | 'contact',
    ids: string[],
    status: string
): Promise<OperationResponse> => {
    try {
        const batch = writeBatch(db);
        const collectionName = {
            registration: 'registrations',
            volunteer: 'volunteerForms',
            contact: 'contactForms'
        }[type];

        ids.forEach(id => {
            const docRef = doc(db, collectionName, id);
            batch.update(docRef, { 
                status,
                updatedAt: new Date().toISOString()
            });
        });

        await batch.commit();
        return { success: true };
    } catch (error) {
        console.error(`Error batch updating ${type} status:`, error);
        return { success: false, error };
    }
};

export const batchDelete = async (
    type: 'registration' | 'volunteer' | 'contact',
    ids: string[]
): Promise<OperationResponse> => {
    try {
        const batch = writeBatch(db);
        const collectionName = {
            registration: 'registrations',
            volunteer: 'volunteerForms',
            contact: 'contactForms'
        }[type];

        ids.forEach(id => {
            const docRef = doc(db, collectionName, id);
            batch.delete(docRef);
        });

        await batch.commit();
        return { success: true };
    } catch (error) {
        console.error(`Error batch deleting ${type}:`, error);
        return { success: false, error };
    }
};

export const searchRecords = async <T>(
    type: 'registration' | 'volunteer' | 'contact',
    searchTerm: string,
    field: keyof T
): Promise<FetchResponse<T>> => {
    try {
        const collectionName = {
            registration: 'registrations',
            volunteer: 'volunteerForms',
            contact: 'contactForms'
        }[type];

        const q = query(
            collection(db, collectionName),
            orderBy(field as string),
            startAt(searchTerm),
            endAt(searchTerm + '\uf8ff')
        );

        const snapshot = await getDocs(q);

        return {
            success: true,
            data: snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as T[]
        };
    } catch (error) {
        console.error(`Error searching ${type}:`, error);
        return { success: false, error, data: [] };
    }
};

export const uploadProducts = async (products: Product[]): Promise<OperationResponse> => {
    try {
        const batch = writeBatch(db);
        
        products.forEach(product => {
            const docRef = doc(db, 'products', product.id);
            batch.set(docRef, {
                ...product,
                timestamp: new Date().toISOString()
            });
        });

        await batch.commit();
        return { success: true };
    } catch (error) {
        console.error('Error uploading products:', error);
        return { success: false, error };
    }
};

export const fetchProducts = async (): Promise<FetchResponse<Product>> => {
    try {
        const q = query(collection(db, 'products'), orderBy('id'));
        const snapshot = await getDocs(q);
        const products = snapshot.docs.map(doc => ({
            ...doc.data()
        })) as Product[];
        
        return { success: true, data: products };
    } catch (error) {
        console.error('Error fetching products:', error);
        return { success: false, error, data: [] };
    }
};

// Product CRUD Operations
export async function deleteProduct(id: string): Promise<OperationResponse> {
    try {
        const docRef = doc(db, 'products', id);
        await deleteDoc(docRef);
        return { success: true, id };
    } catch (error) {
        console.error('Error deleting product:', error);
        return { success: false, error };
    }
}

export async function batchDeleteProducts(ids: string[]): Promise<OperationResponse> {
    try {
        const batch = writeBatch(db);
        ids.forEach(id => {
            const docRef = doc(db, 'products', id);
            batch.delete(docRef);
        });
        await batch.commit();
        return { success: true };
    } catch (error) {
        console.error('Error batch deleting products:', error);
        return { success: false, error };
    }
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<OperationResponse> {
    try {
        const docRef = doc(db, 'products', id);
        await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() });
        return { success: true, id };
    } catch (error) {
        console.error('Error updating product:', error);
        return { success: false, error };
    }
}

export async function createProduct(data: Omit<Product, 'id'>): Promise<OperationResponse> {
    try {
        const docRef = await addDoc(collection(db, 'products'), {
            ...data,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        
        // Update the document with its ID
        const productRef = doc(db, 'products', docRef.id);
        await updateDoc(productRef, { id: docRef.id });
        
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error creating product:', error);
        return { success: false, error };
    }
}

// Upload image to Firestore
export const uploadImage = async (file: File): Promise<string> => {
    try {
        // Check file size (limit to 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
            throw new Error('Image size should be less than 5MB');
        }

        // Validate file type
        if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
            throw new Error('Only JPG, JPEG, and PNG files are allowed');
        }

        // Create a new FileReader instance
        const reader = new FileReader();

        // Convert image file to base64
        const base64String = await new Promise<string>((resolve, reject) => {
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    resolve(reader.result);
                } else {
                    reject(new Error('Failed to convert image to base64'));
                }
            };
            reader.onerror = () => {
                reject(new Error('Failed to read file'));
            };
            reader.readAsDataURL(file);
        });

        // Create a document in Firestore to store the image
        const imageDoc = await addDoc(collection(db, 'images'), {
            name: file.name,
            type: file.type,
            size: file.size,
            data: base64String,
            uploadedAt: serverTimestamp()
        });

        return imageDoc.id;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

export { db };