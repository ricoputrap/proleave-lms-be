import { SuperTest, Test } from "supertest";
import postBasic from "./postBasic";
import postWithoutName from "./postWithoutName";

const runPostTests = (request: SuperTest<Test>) => {
  postBasic(request);
  postWithoutName(request);
}

export default runPostTests;