import { Document } from "mongoose";

export interface IFeature extends Document {
  name: string;
}