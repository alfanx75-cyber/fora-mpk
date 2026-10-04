export type AspirationStatus = "submitted" | "received" | "discussed" | "follow_up" | "completed";

export type AspirationCategory = 
  | "fasilitas" 
  | "kantin" 
  | "akademik" 
  | "event" 
  | "transportasi" 
  | "kebersihan" 
  | "ide_baru" 
  | "lainnya";

export interface CategoryInfo {
  id: AspirationCategory;
  name: string;
  icon: string;
  bgColor: string;
}

export interface StatusInfo {
  id: AspirationStatus;
  label: string;
  number: string;
  icon: string;
  color: string;
  badgeBg: string;
  textColor: string;
  description: string;
}

export interface TimelineEvent {
  stage: AspirationStatus;
  label: string;
  date: string;
  note: string;
  actor: string;
  completed: boolean;
  current: boolean;
}

export interface MPKResponse {
  responderName: string;
  responderRole: string;
  date: string;
  statement: string;
  actionTaken: string;
  verifiedOfficial: boolean;
}

export interface Comment {
  id: string;
  author: string;
  roleOrClass: string;
  content: string;
  timestamp: string;
  likes: number;
}

export interface Attachment {
  name: string;
  size?: string;
  type?: string;
  previewUrl?: string;
}

export interface Aspiration {
  id: string; // e.g. "MPK-2026-8849"
  title: string;
  description: string;
  category: AspirationCategory;
  authorName: string;
  className: string;
  isAnonymous: boolean;
  supportCount: number;
  status: AspirationStatus;
  createdAt: string;
  updatedAt: string;
  attachments?: Attachment[];
  mpkResponse?: MPKResponse;
  timeline: TimelineEvent[];
  comments: Comment[];
  hasVoted?: boolean;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  ticketId?: string;
  type?: "success" | "info" | "vote" | "error";
}
