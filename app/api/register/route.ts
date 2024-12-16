import { NextResponse } from 'next/server';
import { supabase } from '@/config/supabase';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        
        // Add registration to Supabase
        const { data: registration, error } = await supabase
            .from('registrations')
            .insert([{
                ...data,
                status: 'pending',
                timestamp: new Date().toISOString()
            }])
            .select()
            .single();

        if (error) {
            throw error;
        }

        return NextResponse.json({ 
            success: true, 
            message: 'Registration successful! We will contact you shortly.',
            registrationId: registration.id
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