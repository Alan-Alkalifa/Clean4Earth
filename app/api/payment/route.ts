import { NextResponse } from 'next/server';
import { createTransaction } from '@/utils/midtrans';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        // Validate required fields
        if (!body.amount || !body.customerName || !body.customerEmail || !body.items) {
            return NextResponse.json(
                { 
                    error: 'Missing required fields',
                    details: {
                        amount: !body.amount,
                        customerName: !body.customerName,
                        customerEmail: !body.customerEmail,
                        items: !body.items
                    }
                },
                { status: 400 }
            );
        }

        // Validate items have required fields
        const invalidItems = body.items.filter((item: any) => 
            !item.id || !item.price || !item.quantity || !item.name
        );

        if (invalidItems.length > 0) {
            return NextResponse.json(
                {
                    error: 'Invalid items in cart',
                    details: {
                        message: 'Each item must have id, price, quantity, and name',
                        invalidItems
                    }
                },
                { status: 400 }
            );
        }

        // Use provided order ID or generate a new one
        const orderId = body.orderId || `ORDER-${Date.now()}`;
        
        const paymentDetails = {
            orderId,
            amount: body.amount,
            customerName: body.customerName,
            customerEmail: body.customerEmail,
            customerPhone: body.customerPhone || '',
            customerAddress: body.customerAddress || '',
            items: body.items.map((item: any) => ({
                id: item.id,
                price: item.price,
                quantity: item.quantity,
                name: item.name
            }))
        };

        console.log('Creating transaction with details:', {
            orderId: paymentDetails.orderId,
            amount: paymentDetails.amount,
            customerName: paymentDetails.customerName,
            itemCount: paymentDetails.items.length,
            items: paymentDetails.items
        });

        const transaction = await createTransaction(paymentDetails);
        
        if (!transaction || !transaction.token) {
            console.error('Transaction creation failed:', transaction);
            return NextResponse.json(
                { error: 'Failed to create transaction token' },
                { status: 500 }
            );
        }

        console.log('Transaction created successfully:', {
            orderId: orderId,
            token: transaction.token ? 'Present' : 'Missing'
        });

        return NextResponse.json({
            token: transaction.token,
            orderId: orderId,
            redirect_url: transaction.redirect_url
        });
    } catch (error: any) {
        console.error('Payment creation error:', {
            message: error.message,
            stack: error.stack,
            details: error.details || error.response?.data
        });

        return NextResponse.json(
            { 
                error: 'Failed to create payment',
                details: error.message
            },
            { status: 500 }
        );
    }
}
