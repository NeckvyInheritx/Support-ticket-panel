import { Ticket } from "@/types/ticket.d";

// --- Existing Static Data (for 'My Tickets' page) ---
export const customerTicketsStatic: Ticket[] = [
  {
    id: "ticket_001",
    title: "Cannot login to my account",
    description: "I am unable to log in to my account. I have tried resetting my password multiple times, but it keeps saying 'invalid credentials'.",
    status: "open",
    priority: "high",
    category: "Account", // Added category
    createdAt: "2025-06-15T10:00:00Z",
    updatedAt: "2025-06-15T10:00:00Z",
    assignedAgentName: "Alice Agent"
  },
  {
    id: "ticket_002",
    title: "Product ABC description is wrong",
    description: "The description for product ABC says it has 16GB RAM, but the specifications list 8GB. Please correct this.",
    status: "in-progress",
    priority: "medium",
    category: "Product Information", // Added category
    createdAt: "2025-06-14T14:30:00Z",
    updatedAt: "2025-06-16T09:00:00Z",
    assignedAgentName: "Bob Agent"
  },
  {
    id: "ticket_003",
    title: "Refund request for order #12345",
    description: "I would like to request a refund for order #12345. The item was damaged upon arrival.",
    status: "resolved",
    priority: "low",
    category: "Billing", // Added category
    createdAt: "2024-06-10T11:00:00Z",
    updatedAt: "2024-06-12T16:00:00Z",
    assignedAgentName: "Charlie Agent"
  },
  {
    id: "ticket_004",
    title: "Feature request: Dark mode",
    description: "It would be great if you could add a dark mode option to the website. It's much easier on the eyes, especially at night.",
    status: "open",
    priority: "low",
    category: "Feature Request", // Added category
    createdAt: "2024-06-17T09:00:00Z",
    updatedAt: "2024-06-17T09:00:00Z",
  },
];

// --- New Mock Tickets for Dashboard ---
export const dashboardMockTickets: Ticket[] = [
  {
    id: 'dashboard_001',
    title: 'Payment Issue', // Mapped from 'subject'
    priority: 'high',
    category: 'Billing',
    description: 'Payment not processed for order #ABC-123. Customer reports multiple failed attempts.',
    status: 'open',
    createdAt: new Date('2024-06-18T09:00:00Z').toISOString(),
  },
  {
    id: 'dashboard_002',
    title: 'Product Delivery Delay',
    priority: 'medium',
    category: 'Shipping',
    description: 'Order #XYZ-456 not delivered within promised timeframe. Customer requesting update.',
    status: 'in-progress',
    createdAt: new Date('2024-06-17T14:30:00Z').toISOString(),
  },
  {
    id: 'dashboard_003',
    title: 'Website Bug Report - Checkout',
    priority: 'high',
    category: 'Technical',
    description: 'Users unable to complete checkout process. Error message: "Invalid payment gateway response".',
    status: 'open',
    createdAt: new Date('2024-06-18T10:15:00Z').toISOString(),
  },
  {
    id: 'dashboard_004',
    title: 'General Inquiry - Return Policy',
    priority: 'low',
    category: 'General',
    description: 'Customer asking about the return policy for electronics. Needs clarification on restocking fees.',
    status: 'resolved',
    createdAt: new Date('2024-06-16T11:00:00Z').toISOString(),
  },
  {
    id: 'dashboard_005',
    title: 'Account Verification Issue',
    priority: 'high',
    category: 'Account',
    description: 'User cannot verify email address. Verification link expired. Needs manual activation or new link.',
    status: 'open',
    createdAt: new Date('2024-06-18T08:30:00Z').toISOString(),
  },
];


export const getCustomerStaticTickets = (): Ticket[] => customerTicketsStatic;
export const getCustomerStaticTicketById = (id: string): Ticket | undefined => {
  return customerTicketsStatic.find((ticket) => ticket.id === id);
};

export const getDashboardMockTickets = (): Ticket[] => dashboardMockTickets;
