import { SuperTest, Test } from "supertest";
import getAllBasic from "./getAllBasic";

const runGetAllTests = (req: SuperTest<Test>) => {
  describe("GET - Get All Features", () => {
    getAllBasic(req);
  });
}

export default runGetAllTests;