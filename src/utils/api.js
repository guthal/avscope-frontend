import axios from "axios";
import { ENDPOINTS } from "../configs/api";
import { HOME_PAGE } from "../configs/app";

export const getContents = () => {
    // TODO: Delete statement below post API implementation
    return Promise.resolve([
        {
            id: "1",
            name: "Batman",
            description:
                "After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption.",
            star: "Batman",
            posterUrl: HOME_PAGE.CAROUSEL_IMAGES[0] || "",
        },
        {
            id: "2",
            name: "Joker",
            description:
                "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.",
            star: "Joker",
            posterUrl: HOME_PAGE.CAROUSEL_IMAGES[1] || "",
        },
        {
            id: "3",
            name: "Dark Knight",
            description:
                "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            star: "Joker",
            posterUrl: HOME_PAGE.CAROUSEL_IMAGES[2] || "",
        },
    ]);

    // eslint-disable-next-line
    return axios.get(ENDPOINTS.GET_CONTENTS).then(res => res.data);
};

export const getContent = contentID =>
    axios.get(ENDPOINTS.GET_CONTENT(contentID)).then(res => res.data);

export const postDummyApi = (reqBody, contentID) =>
    axios.post(`/${contentID}`, reqBody).then(res => res.data);
