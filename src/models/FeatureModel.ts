import { Model, model, Schema } from "mongoose";
import { IFeature } from "../types/models.types";

const FeatureSchema = new Schema<IFeature>({
  name: { type: String, required: true, unique: true }
});

const FeatureModel: Model<IFeature> = model("feature", FeatureSchema);
export default FeatureModel;