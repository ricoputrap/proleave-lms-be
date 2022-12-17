import { SuperTest, Test } from "supertest";
import postBasic from "./postBasic";

const runPostTests = (request: SuperTest<Test>) => {
  postBasic(request);
}

export default runPostTests;