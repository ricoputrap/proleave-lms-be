import { SuperTest, Test } from "supertest";
import getSingleBasic from "./getSingleBasic";

const runGetSingleTests = (req: SuperTest<Test>) => {
  describe("GET - Get Single Feature", () => {
    getSingleBasic(req);
  });
}

export default runGetSingleTests;