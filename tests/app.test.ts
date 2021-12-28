import request from "supertest";
import { getApp } from "../src/app";

import UserRepository from "../src/users/repository";

jest.mock("../src/users/repository");

describe("Test", () => {

  // mock repository

  test("Hello", async () => {
    // @ts-ignore
    UserRepository.listAll.mockResolvedValue([]);

    const response =
      await request(getApp())
        .get("/api/v1/users");
      
    expect(response.statusCode).toBe(200);
    
    // await getPool().end();
  });
});
