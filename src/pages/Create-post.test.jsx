import { describe, expect, test, it, vi, debug } from "vitest";
import { fireEvent, render, screen, within, waitFor } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import "@testing-library/user-event";
import userEvent from '@testing-library/user-event'
import { act } from "react-test-renderer";
import ManageClubs from "./ManageClubs";
import NewClub from "./NewClub";
// import testImage from '../../TestImage.png';
import path from 'path';    
import Feed from "./Feed";

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