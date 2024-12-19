import midtransClient from 'midtrans-client';

// Initialize Midtrans Snap client
const snap = new midtransClient.Snap({
    isProduction: true,
    serverKey: process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY || '',
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || ''
});

// Initialize Midtrans Core API client for status checks
const coreApi = new midtransClient.CoreApi({
    isProduction: true,
    serverKey: process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY || '',
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || ''
});

interface PaymentDetails {
    orderId: string;
    amount: number;
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    customerAddress: string;
    items: Array<{
        id: string;
        price: number;
        quantity: number;
        name: string;
    }>;
}

export const TransactionStatus = {
    SUCCESS: 'success',
    PENDING: 'pending',
    FAILURE: 'failure',
    EXPIRED: 'expired',
    CANCEL: 'cancel'
};

export async function createTransaction(params: PaymentDetails) {
    try {
        // Validate required parameters
        if (!params.orderId || !params.amount || !params.customerName || !params.customerEmail) {
            throw new Error('Missing required parameters');
        }

        // Validate items
        if (!params.items || params.items.length === 0) {
            throw new Error('No items provided');
        }

        // Validate Midtrans configuration
        if (!process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY || !process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY) {
            throw new Error('Midtrans configuration missing');
        }

        console.log('Creating Midtrans transaction with params:', {
            orderId: params.orderId,
            amount: params.amount,
            customerName: params.customerName,
            customerEmail: params.customerEmail,
            itemCount: params.items.length
        });

        const transactionDetails = {
            transaction_details: {
                order_id: params.orderId,
                gross_amount: params.amount
            },
            customer_details: {
                first_name: params.customerName,
                email: params.customerEmail,
                phone: params.customerPhone || '',
                address: params.customerAddress || ''
            },
            item_details: params.items.map(item => ({
                id: item.id,
                price: item.price,
                quantity: item.quantity,
                name: item.name
            }))
        };

        console.log('Formatted transaction details:', JSON.stringify(transactionDetails, null, 2));

        const transaction = await snap.createTransaction(transactionDetails);

        if (!transaction || !transaction.token) {
            throw new Error('Failed to get transaction token from Midtrans');
        }

        console.log('Midtrans response:', {
            token: 'Present',
            redirect_url: transaction.redirect_url ? 'Present' : 'Missing'
        });

        return {
            token: transaction.token,
            redirect_url: transaction.redirect_url
        };
    } catch (error: any) {
        console.error('Midtrans transaction creation error:', {
            message: error.message,
            response: error.response?.data,
            httpStatus: error.response?.status,
            details: error.details
        });
        
        throw new Error(`Failed to create Midtrans transaction: ${error.message}`);
    }
}

export async function getTransactionStatus(orderId: string) {
    try {
        if (!process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY || !process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY) {
            throw new Error('Midtrans configuration missing');
        }

        const transactionStatus = await coreApi.transaction.status(orderId);
        return {
            success: true,
            data: transactionStatus
        };
    } catch (error: any) {
        // Handle specific Midtrans error types
        if (error.httpStatusCode === 404) {
            return {
                success: false,
                error: 'Transaction not found'
            };
        }
        
        if (error.message.includes('Network')) {
            return {
                success: false,
                error: 'Network error: Unable to reach Midtrans'
            };
        }
        
        return {
            success: false,
            error: error.message
        };
    }
}

export async function checkPaymentStatus(orderId: string) {
    try {
        const response = await getTransactionStatus(orderId);
        return response;
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        };
    }
}

export async function cancelTransaction(orderId: string) {
    try {
        const response = await coreApi.transaction.cancel(orderId);
        return {
            success: true,
            data: response
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        };
    }
}

export const MidtransConfig = {
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || '',
    merchantId: 'G672038663'
};