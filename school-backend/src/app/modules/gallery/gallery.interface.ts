export interface IGallery {
  title: string;
  caption?: string;
  category?: string; // e.g. "ক্যাম্পাস", "ক্রীড়া", "সাংস্কৃতিক", "বিজ্ঞান মেলা", "পুরস্কার বিতরণী"
  imageUrl: string;
  imagePublicId?: string;
  isDeleted: boolean;
}
