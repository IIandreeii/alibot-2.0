export type MessageStatus = "READ" | "DELIVERED" | "SENT";

export type Inbox = {
  id: string;
  name: string;
  image: string;
  lastMessage?: string;
  timestamp?: string;
  messageStatus?: MessageStatus;
  notificationsCount?: number;
  isPinned?: boolean;
  isOnline?: boolean;
}

export type InboxChat = {
  id?: string
  nickname?: string;
  type?: string
  name?: string
  data?: any
  to?: string
  countMessages?: any;
  text?: string
  content?: string
  phone: string
  from: string
  lastMessage: any
  lastMessageFilter?: string
  status: string
  isConfirmed?: boolean
  timestamp: string
  messages: any[]
  notificationsCount?: number;
  isSearchFilter?: boolean;
  messageMatch?: any;
}
