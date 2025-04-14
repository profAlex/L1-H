"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoDb = void 0;
const basic_types_1 = require("../basic_types/basic-types");
exports.videoDb = {
    videos: [{
            id: 1,
            title: 'Movie01',
            author: 'Author01',
            canBeDownloaded: true,
            minAgeRestriction: 12,
            createdAt: new Date(),
            publicationDate: new Date(new Date().getDate() + 1),
            availableResolutions: [basic_types_1.Resolution.P144, 'P240']
        },
        {
            id: 2,
            title: 'Movie02',
            author: 'Author02',
            canBeDownloaded: true,
            minAgeRestriction: 10,
            createdAt: new Date(),
            publicationDate: new Date(new Date().getDate() + 1),
            availableResolutions: [basic_types_1.Resolution.P144, 'P240']
        },
    ]
};
