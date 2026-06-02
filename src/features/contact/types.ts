export interface ContactLead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  serviceType: "basic" | "standard" | "premium" | "custom";
  budget?: string;
  message: string;
  status: "new" | "contacted" | "closed" | "rejected";
  notificationStatus: "pending" | "sent" | "failed";
  createdAt: string;
  updatedAt: string;
}
