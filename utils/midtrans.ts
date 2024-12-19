import midtransClient from 'midtrans-client';

// Initialize Midtrans Snap client
const snap = new midtransClient.Snap({
    isProduction: true,
    serverKey: 'Mid-server__D_xEJ6nJLBglrFgLZx2AjAD',
    clientKey: 'Mid-client-oK9RZNfZ6G-HuQYM'
});

// Initialize Midtrans Core API client for status checks
const coreApi = new midtransClient.CoreApi({
    isProduction: true,
    serverKey: 'Mid-server__D_xEJ6nJLBglrFgLZx2AjAD',
    clientKey: 'Mid-client-oK9RZNfZ6G-HuQYM'
});

// Validate Midtrans configuration
const serverKey = 'Mid-server__D_xEJ6nJLBglrFgLZx2AjAD';
const clientKey = 'Mid-client-oK9RZNfZ6G-HuQYM';

if (!serverKey || !clientKey) {
    console.error('Midtrans configuration missing. Please set NEXT_PUBLIC_MIDTRANS_SERVER_KEY and NEXT_PUBLIC_MIDTRANS_CLIENT_KEY');
}

interface PaymentDetails {
    orderId: string;
    amount: number;
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    customerAddress: string;
    items: {
        id: string;
        price: number;
        quantity: number;
        name: string;
    }[];
}

export const TransactionStatus = {
    SUCCESS: 'success',
    PENDING: 'pending',
    FAILURE: 'failure',
    EXPIRED: 'expired',
    CANCEL: 'cancel'
} as const;

export async function createTransaction(params: {
    orderId: string;
    amount: number;
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    customerAddress?: string;
    items: Array<{
        id: string;
        price: number;
        quantity: number;
        name: string;
    }>;
}) {
    try {
        // Validate Midtrans configuration
        if (!process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY || !process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY) {
            throw new Error('Midtrans configuration missing');
        }

        // Validate required parameters
        if (!params.orderId || !params.amount || !params.customerName || !params.customerEmail) {
            throw new Error('Missing required parameters');
        }

        // Validate items
        if (!params.items || params.items.length === 0) {
            throw new Error('No items provided');
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
            credit_card: {
                secure: true
            },
            customer_details: {
                first_name: params.customerName,
                email: params.customerEmail,
                phone: params.customerPhone || '',
                billing_address: params.customerAddress ? {
                    address: params.customerAddress
                } : undefined
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
        if (!coreApi) {
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
        
        // Handle network errors - removed browser-specific check
        if (error.message === 'Network Error') {
            return {
                success: false,
                error: 'Network connection issue. Please check your internet connection.'
            };
        }

        return {
            success: false,
            error: error.message || 'Unknown error occurred'
        };
    }
}

export async function checkPaymentStatus(orderId: string) {
    try {
        const transactionStatus = await getTransactionStatus(orderId);
        const status = transactionStatus.data.status;
        return status;
    } catch (error) {
        console.error('Error checking payment status:', error);
        throw error;
    }
}

export async function cancelTransaction(orderId: string) {
    try {
        const result = await coreApi.transaction.cancel(orderId);
        return result;
    } catch (error) {
        console.error('Error cancelling transaction:', error);
        throw error;
    }
}

export const MidtransConfig = {
    clientKey: 'Mid-client-oK9RZNfZ6G-HuQYM',
    merchantId: 'G672038663'
};