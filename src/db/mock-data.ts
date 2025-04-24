import {Resolution, Video} from "../basic_types/basic-types";
import {CreateDefaultDate} from "../utility/utility-functions";

export const videoDb = {
    videos: <Video[]>[{
        id: 1,
        title: 'Movie01',
        author: 'Author01',
        canBeDownloaded: true,
        minAgeRestriction: 12,
        createdAt: new Date(),
        publicationDate: CreateDefaultDate(),//new Date(new Date().getDate() + 1),
        availableResolutions: [Resolution.P240],
    },
    {
        id: 2,
        title: 'Movie02',
        author: 'Author02',
        canBeDownloaded: false,
        minAgeRestriction: 8,
        createdAt: new Date(),
        publicationDate: CreateDefaultDate(),
        availableResolutions: [Resolution.P144]
    }
]};
