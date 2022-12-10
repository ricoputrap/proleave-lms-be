export type ReturnType = {
  success: boolean;
  code: number;
  data?: any;
  message?: string;
}

export type FeatureFilterType = {
  _id?: number;
  name?: string;
}

export type DeleteReturnType = {
  acknowledged: boolean;
  deletedCount?: number;
}

export type FGetSingleItem<T> = (filter: any) => Promise<T | null>;