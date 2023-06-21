export interface FreelancerParams {
  q: string,
  role: string,
  plan: string,
  status: string,
  perPage: number,
  currentPage: number,
  byProvince?: string
}