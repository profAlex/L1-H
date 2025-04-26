"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoDb = void 0;
const basic_types_1 = require("../basic_types/basic-types");
const utility_functions_1 = require("../utility/utility-functions");
exports.videoDb = {
    videos: [
        {
            id: 1,
            title: "Movie01",
            author: "Author01",
            canBeDownloaded: true,
            minAgeRestriction: 12,
            createdAt: new Date(),
            publicationDate: (0, utility_functions_1.CreateDefaultDate)(), //new Date(new Date().getDate() + 1),
            availableResolutions: [basic_types_1.Resolution.P240],
        },
        {
            id: 2,
            title: "Movie02",
            author: "Author02",
            canBeDownloaded: false,
            minAgeRestriction: 8,
            createdAt: new Date(),
            publicationDate: (0, utility_functions_1.CreateDefaultDate)(),
            availableResolutions: [basic_types_1.Resolution.P144],
        },
    ],
};
