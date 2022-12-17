import { Model, model, Schema } from "mongoose";
import { IFeature } from "../types/models.types";

const FeatureSchema = new Schema<IFeature>({
  name: { type: String, required: true, unique: true },
  _id: { type: Number, required: true, unique: true }
});

export const FeatureNestedSchema = new Schema<IFeature>({
  name: { type: String, required: true },
  _id: { type: Number, required: true }
});

const FeatureModel: Model<IFeature> = model("feature", FeatureSchema);
export default FeatureModel;