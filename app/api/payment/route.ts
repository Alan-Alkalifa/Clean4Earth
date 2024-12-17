import { NextResponse } from 'next/server';
import { createTransaction } from '@/utils/midtrans';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        // Generate a unique order ID (you might want to use a more sophisticated method)
        const orderId = `ORDER-${Date.now()}`;
        
        const paymentDetails = {
            orderId,
            amount: body.amount,
            customerName: body.customerName,
            customerEmail: body.customerEmail,
            customerPhone: body.customerPhone,
            items: body.items
        };

        const transaction = await createTransaction(paymentDetails);
        
        return NextResponse.json({
            token: transaction.token,
            redirect_url: transaction.redirect_url
        });
    } catch (error) {
        console.error('Payment creation error:', error);
        return NextResponse.json(
            { error: 'Failed to create payment' },
            { status: 500 }
        );
    }
}
