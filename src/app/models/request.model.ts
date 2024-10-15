export interface ProjectRequest {
  id: number;
  name: string | null;
  user: string | null;
  contract: number | null;
  status: "AWAITING_APPROVAL" | "APPROVED";
}
