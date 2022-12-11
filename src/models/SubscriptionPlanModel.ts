import { Model, model, Schema } from "mongoose";
import { ISubscriptionPlan } from "../types/models.types";
import { FeatureSchema } from "./FeatureModel";

const SubscriptionPlanSchema = new Schema<ISubscriptionPlan>({
  _id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  features: { type: [FeatureSchema] }
});

const SubscriptionPlanModel: Model<ISubscriptionPlan> = model(
  "subcriptionPlan",
  SubscriptionPlanSchema
);

export default SubscriptionPlanModel;