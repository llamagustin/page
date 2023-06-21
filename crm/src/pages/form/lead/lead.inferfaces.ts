export interface IPlan {
  plan: string;
  tag: string;
  tipo: string;
  costo: number;
  createdAt: Date;
}

export interface IOptsSelectedPlan {
  planTag: string | null,
  costKey: string | null,
  newPlanTag: string | null,
  isAnnualPlan?: boolean
}
