import { SuperTest, Test } from "supertest";
import addBasic from "./addBasic";
import addWithoutName from "./addWithoutName";

const runAddNewTests = (req: SuperTest<Test>) => {
  describe("POST - Add New Feature", () => {
    addBasic(req);
    addWithoutName(req);
  });
}

export default runAddNewTests;