export type TicketStatus = "open" | "in-progress" | "resolved" | "closed";
export type TicketPriority = "low" | "medium" | "high" | "urgent";

export type TicketCategory =
  | "Order & Delivery Issues"
  | "Payments & Refunds"
  | "Website & Technical Support"
  | "Product Inquiries"
  | "Pharmacy & Health Services"
  | "Manufacturing & Wholesale"
  | "Accounts & Profile Management"
  | "Feedback & General Enquiries";
  

export interface Ticket {
  id: string;
  title: string; 
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: string; 
  createdAt: string;
  updatedAt?: string; 
  assignedAgentName?: string; 
}

