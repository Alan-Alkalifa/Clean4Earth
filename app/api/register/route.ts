import { NextResponse } from 'next/server';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/config/database';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        
        // Add registration to Firestore
        const docRef = await addDoc(collection(db, 'registrations'), {
            ...data,
            createdAt: new Date().toISOString()
        });

        return NextResponse.json({ 
            success: true, 
            message: 'Registration successful! We will contact you shortly.',
            registrationId: docRef.id
        });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: 'Registration failed. Please try again.' 
            },
            { status: 500 }
        );
    }
}
