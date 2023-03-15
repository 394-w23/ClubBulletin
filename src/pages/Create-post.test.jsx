import { describe, expect, test, it, vi, debug } from "vitest";
import { fireEvent, render, screen, within, waitFor } from "@testing-library/react";
import { useProfile } from "../utilities/profile";
import { MemoryRouter } from 'react-router-dom';
import "@testing-library/user-event";
import userEvent from '@testing-library/user-event'
import { act } from "react-test-renderer";
import { useDbData } from "../utilities/firebase";
import ManageClubs from "./ManageClubs";
import NewClub from "./NewClub";
// import testImage from '../../TestImage.png';
import path from 'path';    
import App from "../App";

vi.mock("../utilities/firebase", async () => {
    const original = await vi.importActual("../utilities/firebase");
    return {
        ...original,
        useDbData: vi.fn(),
    };
});

vi.mock("../utilities/profile", async () => {
    const original = await vi.importActual("../utilities/profile");
    return {
        ...original,
        useProfile: vi.fn(),
    };
});

const mockUseDbUpdate = vi.fn();
vi.mock("../utilities/firebase", async () => {
    const original = await vi.importActual("../utilities/firebase");
    return {
        ...original,
        useDbUpdate: () => [mockUseDbUpdate],
    };
});

const handleClose = vi.fn();

const user = {
    uid: "9sRpzAtJxifltQPb2iWH1Nqg7Rm2",
};

const data = {
    clubs: {},
    posts: {},
    users: {
        "9sRpzAtJxifltQPb2iWH1Nqg7Rm2": {
            clubs: [],
            name: "Nicholas Tsung",
        },
    },
};

const data_admin = {
    clubs: {
        "38ce7dbc-0ff0-475e-9b47-0d41f99c17fb": {
            admins: ["9sRpzAtJxifltQPb2iWH1Nqg7Rm2"],
            members: ["9sRpzAtJxifltQPb2iWH1Nqg7Rm2"],
            description: "Testing",
            name: "Test Name",
            picLink: "https://firebasestorage.googleapis.com/v0/b/clubbulletin-e6cf8.appspot.com/o/files%2FScreen%20Shot%202023-03-12%20at%204.20.07%20PM.png?alt=media&token=d17905f8-0f4d-4123-a4c9-a2dd05416d08"
        }
    },
    posts: {},
    users: {
        "9sRpzAtJxifltQPb2iWH1Nqg7Rm2": {
            clubs: ["38ce7dbc-0ff0-475e-9b47-0d41f99c17fb"],
            name: "Nicholas Tsung",
        },
    },
};

describe("Testing creating a post from admin club page", () => {

    it("CreatePost modal is rendered and test info is inputted.  Post creation is successful", async() => {
        const { wrapper } = render(
            <ManageClubs user={user} data={data_admin}></ManageClubs>,
            { wrapper: MemoryRouter }
        );
        const adminClubs = screen.queryByTestId("adminClubsTab");
        act(() => {
            adminClubs.click();
        });

        const createPostElement = screen.queryByTestId("create-post-button");
        act(() => {
            createPostElement.click();
        });

        userEvent.type(screen.queryByTestId('create-post-title'), 'Testing Create Post Title!')
        userEvent.type(screen.queryByTestId('create-post-body'), 'Testing Create Post Body!')

        const submitNewPostElement = screen.queryByTestId("submit-create-post");
        fireEvent.click(submitNewPostElement);

        expect(screen.findByText("Post was successfully uploaded!")).toBeDefined();
    });
});

const userLoggedInProfile = [
    {
        user: {
            uid: "user-id-1",
        },
        isAdmin: null,
    },
    null,
    null,
];

const userWithSubscriptionsAndPosts = [
    {
        clubs: {
            "club-id-1": {
                admins: [],
                members: ["user-id-1"],
                name: "Test Club 1",
                picLink:
                    "https://firebasestorage.googleapis.com/v0/b/clubbulletintest.appspot.com/o/files%2Fimage.jpeg?alt=media&token=ee92e144-3493-44fe-85aa-95d43daa85ab",
            },
            "club-id-2": {
                admins: [],
                members: ["user-id-1"],
                name: "Test Club 2",
                picLink:
                    "https://firebasestorage.googleapis.com/v0/b/clubbulletintest.appspot.com/o/files%2FScreen%20Shot%202023-02-02%20at%208.13.34%20PM.png?alt=media&token=d4c37076-069e-41d8-95fa-a58764d97daa",
            },
            "club-id-3": {
                admins: ["user-id-1"],
                members: ["user-id-1"],
                name: "Test Club 3",
                picLink: "default",
            },
        },
        posts: {
            "post-id-1": {
                clubId: "club-id-1",
                content: "Post 1!",
                likeCount: 5,
                posted: "1",
                title: "Test Club 1; Post 1",
            },
            "post-id-2": {
                clubId: "club-id-1",
                content: "Post 2!",
                likeCount: 1,
                posted: "0",
                title: "Test Club 1; Post 2",
            },
            "post-id-3": {
                clubId: "club-id-2",
                content: "Post 1!",
                likeCount: 8,
                posted: "1",
                title: "Test Club 2; Post 1",
            },
            "post-id-4": {
                clubId: "club-id-3",
                content: "Post 1!",
                likeCount: 3,
                posted: "1",
                title: "Test Club 3; Post 1",
            },
        },
        users: {
            "user-id-1": {
                clubs: ["", "club-id-1", "club-id-2", "club-id-3"],
                name: "Kevin Rueda",
            },
        },
    },
    null,
];

describe("Testing creating a post from club tab in feed", () => {
    beforeEach(() => {
        useProfile.mockReturnValue(userLoggedInProfile);
        useDbData.mockReturnValue(userWithSubscriptionsAndPosts);
    });

    it.each`
    feedTabIndex | clubName         | numberOfPosts | postTitles                                        | postContent               | postLikeCountLabelOnLoad | postLikeCountLabelOnclick | isUserAdmin
    ${1}         | ${"Test Club 1"} | ${2}          | ${["Test Club 1; Post 1", "Test Club 1; Post 2"]} | ${["Post 1!", "Post 2!"]} | ${["5 likes", "1 like"]} | ${["6 likes", "2 likes"]} | ${false}
    ${2}         | ${"Test Club 2"} | ${1}          | ${["Test Club 2; Post 1"]}                        | ${["Post 1!"]}            | ${["8 likes"]}           | ${["9 likes"]}            | ${false}
    ${3}         | ${"Test Club 3"} | ${1}          | ${["Test Club 3; Post 1"]}                        | ${["Post 1!"]}            | ${["3 likes"]}           | ${["4 likes"]}            | ${true}
  `(
        "Clicking on club tab for $clubName renders its corresponding posts",
        async ({
            feedTabIndex,
            clubName,
            numberOfPosts,
            postTitles,
            postContent,
            postLikeCountLabelOnLoad,
            postLikeCountLabelOnclick,
            isUserAdmin,
        }) => {
            const wrapper = render(<App />);

            const clubSelector = wrapper.queryByTestId("feed-club-selector");
            const { getAllByRole } = within(clubSelector);
            const clubTabs = getAllByRole("listitem");

            // expect three tabs to be rendered
            expect(clubTabs.length).toEqual(4);

            // check the tab label is correct
            expect(
                wrapper.getAllByTestId("feed-club-selector-button")[feedTabIndex]
                    .textContent
            ).toEqual(clubName);

            // click on the tab label
            act(() => {
                wrapper
                    .getAllByTestId("feed-club-selector-button")
                [feedTabIndex].click();
            });

            const posts = await wrapper.getAllByTestId("feed-post");

            // expect the correct number of posts to be rendered
            expect(posts.length).toEqual(numberOfPosts);
            

            if (isUserAdmin) {
                const createPostElement = screen.getByText("Create Post");
                act(() => {
                    createPostElement.click();
                });

                userEvent.type(screen.queryByTestId('create-post-title'), 'Testing Create Post Title!')
                userEvent.type(screen.queryByTestId('create-post-body'), 'Testing Create Post Body!')

                const submitNewPostElement = screen.queryByTestId("submit-create-post");
                fireEvent.click(submitNewPostElement);

                expect(screen.findByText("Post was successfully uploaded!")).toBeDefined();                
            } else {
                expect(() => screen.getByText("Create Post")).toThrow();
            }
            
        }
    );
});
