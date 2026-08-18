export interface IGallery {
  title: string;
  caption?: string;
  category?: string; // e.g. "Campus", "Sports", "Cultural", "Science Fair", "Prize Giving"
  imageUrl: string;
  imagePublicId?: string;
  isDeleted: boolean;
}
