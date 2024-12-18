import { NextResponse } from 'next/server';
import { getTransactionStatus, TransactionStatus } from '@/utils/midtrans';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const orderId = searchParams.get('orderId');

        if (!orderId) {
            return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
        }

        const status = await getTransactionStatus(orderId);
        
        if (!status.success) {
            return NextResponse.json({ error: status.error }, { status: 400 });
        }

        return NextResponse.json({
            transaction_status: status.data.transaction_status,
            status_code: status.data.status_code,
            order_id: status.data.order_id
        });
    } catch (error: any) {
        console.error('Error checking payment status:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to check payment status' },
            { status: 500 }
        );
    }
}
