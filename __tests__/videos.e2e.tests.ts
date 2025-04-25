import request = require('supertest');
import express = require('express');
import {setupApp} from "../src/setup-app";
import {Resolution, Video} from "../src/basic_types/basic-types";
import {CreateDefaultDate, HttpStatus} from "../src/utility/utility-functions";
//import express, {Request, Response, Express} from "express";


describe('Overall API tests', () => {
    const app = express();
    setupApp(app);

    //создаем тестовую видео карточку
    const testVideoRecord:Video = {
        id: 1,
        title: 'TestMovie01',
        author: 'TestAuthor01',
        canBeDownloaded: true,
        minAgeRestriction: 14,
        createdAt: new Date(),
        publicationDate: CreateDefaultDate(),//new Date(new Date().getDate() + 1),
        availableResolutions: [Resolution.P240, Resolution.P144],
    }

    beforeAll(async () => {
        await request(app).delete(`/testing/all-data`).expect(HttpStatus.NoContent);
    })

    it('GET /videos', () => {

    });

});