export interface Purchase {
  userId: string;
  productId: string;
  checkoutUrl: string;
  status: string;
  createdAt: string;
}

export interface Subscription {
  userId: string;
  orderId: string;
  status: string;
  createdAt: string;
}
