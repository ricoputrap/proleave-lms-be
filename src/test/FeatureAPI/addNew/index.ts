import { SuperTest, Test } from "supertest";
import addBasic from "./addBasic";
import addWithoutName from "./addWithoutName";

const runAddNewTests = (request: SuperTest<Test>) => {
  addBasic(request);
  addWithoutName(request);
}

export default runAddNewTests;