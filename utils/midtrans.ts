import midtransClient from 'midtrans-client';

// Initialize Midtrans configuration
const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: 'SB-Mid-server-QO9lfdHKGxPy-Nkp49PGzXG7',
    clientKey: 'SB-Mid-client-sVP2BWevx_ML4K7d'
});

// Initialize Core API
const core = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: 'SB-Mid-server-QO9lfdHKGxPy-Nkp49PGzXG7',
    clientKey: 'SB-Mid-client-sVP2BWevx_ML4K7d'
});

interface PaymentDetails {
    orderId: string;
    amount: number;
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    items: Array<{
        id: string;
        price: number;
        quantity: number;
        name: string;
    }>;
}

export async function createTransaction(paymentDetails: PaymentDetails) {
    try {
        const transactionDetails = {
            transaction_details: {
                order_id: paymentDetails.orderId,
                gross_amount: paymentDetails.amount
            },
            customer_details: {
                first_name: paymentDetails.customerName,
                email: paymentDetails.customerEmail,
                phone: paymentDetails.customerPhone
            },
            item_details: paymentDetails.items.map(item => ({
                id: item.id,
                price: item.price,
                quantity: item.quantity,
                name: item.name
            })),
            credit_card: {
                secure: true
            }
        };

        // Create transaction
        const transaction = await snap.createTransaction(transactionDetails);
        return transaction;
    } catch (error) {
        console.error('Error creating Midtrans transaction:', error);
        throw error;
    }
}

export async function getTransactionStatus(orderId: string) {
    try {
        const status = await core.transaction.status(orderId);
        return status;
    } catch (error) {
        console.error('Error getting transaction status:', error);
        throw error;
    }
}

export async function cancelTransaction(orderId: string) {
    try {
        const result = await core.transaction.cancel(orderId);
        return result;
    } catch (error) {
        console.error('Error cancelling transaction:', error);
        throw error;
    }
}

export const MidtransConfig = {
    clientKey: 'SB-Mid-client-sVP2BWevx_ML4K7d',
    merchantId: 'G672038663'
};