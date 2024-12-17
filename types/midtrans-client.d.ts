declare module 'midtrans-client' {
  interface ClientConfig {
    isProduction: boolean;
    serverKey: string;
    clientKey: string;
  }

  interface TransactionDetails {
    order_id: string;
    gross_amount: number;
  }

  interface CustomerDetails {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
  }

  interface ItemDetails {
    id: string;
    price: number;
    quantity: number;
    name: string;
  }

  interface TransactionOptions {
    transaction_details: TransactionDetails;
    customer_details?: CustomerDetails;
    item_details?: ItemDetails[];
  }

  export class Snap {
    constructor(config: ClientConfig);
    createTransaction(options: TransactionOptions): Promise<any>;
  }

  export class CoreApi {
    constructor(config: ClientConfig);
    charge(options: TransactionOptions): Promise<any>;
    transaction: {
      status(orderId: string): Promise<any>;
      cancel(orderId: string): Promise<any>;
    };
  }
}
