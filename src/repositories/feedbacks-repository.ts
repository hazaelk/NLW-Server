export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}
export interface FeedbacksRepository {
  create: (data: FeedbackCreateData) => Promise<void>;/* create estará retornando uma promise por ser func async */
}