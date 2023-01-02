import supertest, { SuperTest, Test } from "supertest";
import { HOST } from "../../../config/env";
import runAddNewTests from "./addNew";
import runGetAllTests from "./getAll";

const request: SuperTest<Test> = supertest(HOST);

describe("Features API", () => {
  runGetAllTests(request);
  runAddNewTests(request);
});