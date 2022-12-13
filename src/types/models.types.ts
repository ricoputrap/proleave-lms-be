import { Document } from "mongoose";

export interface IFeature extends Document {
  name: string;
  _id: number;
}

export interface ISubscriptionPlan extends Document {
  _id: number;
  name?: string;
  featureIds?: number[];
  features?: IFeature[];
}