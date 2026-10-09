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

export interface Attachment {
  name: string;
  size?: string;
  type?: string;
  previewUrl?: string;
  dataUrl?: string;
}

export interface Aspiration {
  id: string; // e.g. "2026-0001"
  accessKeyHash?: string; // SHA-256 hash of secret access key
  accessKey?: string; // Cleartext access code (only available at submission confirmation or for authorized admin)
  title: string;
  description: string;
  category: AspirationCategory;
  grade?: 'X' | 'XI' | 'XII' | 'none';
  className: string; // e.g. "XI G" or "Tidak ingin menyebutkan kelas"
  status: AspirationStatus;
  createdAt: string;
  updatedAt: string;
  attachments?: Attachment[];
  mpkResponse?: MPKResponse;
  timeline: TimelineEvent[];
  senderProcessNote?: string;
  adminInternalNotes?: string;
}

export interface AppStats {
  total: number;
  responded: number;
  inProgress: number;
  completed: number;
  updatedAt?: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  ticketId?: string;
  type?: "success" | "info" | "vote" | "error";
}
