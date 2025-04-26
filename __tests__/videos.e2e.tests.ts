import request = require("supertest");
import express = require("express");
import { setupApp } from "../src/setup-app";
import { Resolution, Video } from "../src/basic_types/basic-types";
import {
  CreateDefaultDate,
  HttpStatus,
} from "../src/utility/utility-functions";
//import express, {Request, Response, Express} from "express";

describe("Overall API tests", () => {
  const app = express();
  setupApp(app);

  //создаем тестовую видео карточку
  const testVideoRecord: Video = {
    id: 1,
    title: "TestMovie01",
    author: "TestAuthor01",
    canBeDownloaded: true,
    minAgeRestriction: 14,
    createdAt: new Date(),
    publicationDate: CreateDefaultDate(), //new Date(new Date().getDate() + 1),
    availableResolutions: [Resolution.P240, Resolution.P144],
  };

  beforeAll(async () => {
    await request(app).delete(`/testing/all-data`).expect(HttpStatus.NoContent);
  });

  it("GET /videos - should return 204 NoContent", async () => {
    await request(app).get(`/videos`).expect(HttpStatus.Ok);
  });

  it("GET /videos/:id - should return 404 not found ", async () => {
    await request(app).get(`/videos/1}`).expect(HttpStatus.NotFound);
  });

  it("POST and GET /videos/ - should return 201 created and pass following GET query", async () => {
    await request(app).post(`/videos`).send(testVideoRecord).expect(HttpStatus.Created);

    const testResponse = await request(app).get(`/videos/`).expect(HttpStatus.Ok);
    expect(testResponse.body[0].id).toBe(1);
    //expect(testResponse.body.length()).toBe(1); //не получилось вызвать метод length() у body
  });

  it("PUT /videos/1 and GET /videos/1 - should return 204 no content and 200 success", async () => {
    const testVideoUpdate = {
      title: "UpdatedTestMovie01",
      author: "UpdatedTestAuthor01",
      canBeDownloaded: true,
      minAgeRestriction: 14,
      publicationDate: CreateDefaultDate(), //new Date(new Date().getDate() + 1),
      availableResolutions: [Resolution.P240, Resolution.P144],
    }

    await request(app).put(`/videos/1`).send(testVideoUpdate).expect(HttpStatus.NoContent);

    const testResponse = await request(app).get(`/videos/1`).expect(HttpStatus.Ok);
    expect(testResponse.body[0].title).toBe("UpdatedTestMovie01");
  });
});
