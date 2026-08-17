export interface INotice {
  heading: string;
  body: string;
  pdfUrl?: string;
  pdfPublicId?: string;
  publishDate: string;
  isPinned?: boolean;
  isDeleted: boolean;
}
