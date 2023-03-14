import { describe, expect, test, it, vi } from "vitest";
import { fireEvent, render, screen, within, waitFor } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import "@testing-library/user-event";
import userEvent from '@testing-library/user-event'
import { act } from "react-test-renderer";
import ManageClubs from "./ManageClubs";
import NewClub from "./NewClub";
// import testImage from '../../TestImage.png';
import path from 'path';

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
    uid: "yaIVzjyxUyd9zrk7zqCpbhL9DvX2",
};

const data = {
    clubs: {},
    posts: {},
    users: {
        "yaIVzjyxUyd9zrk7zqCpbhL9DvX2": {
            clubs: [],
            name: "Maya Blumovitz",
        },
    },
};

const data_admin = {
    clubs: {
        uid: "38ce7dbc-0ff0-475e-9b47-0d41f99c17fb",
        admins: ["yaIVzjyxUyd9zrk7zqCpbhL9DvX2"],
        members: ["yaIVzjyxUyd9zrk7zqCpbhL9DvX2"],
        description: "Testing",
        name: "Test Name",
        picLink: "https://firebasestorage.googleapis.com/v0/b/clubbulletin-e6cf8.appspot.com/o/files%2FScreen%20Shot%202023-03-12%20at%204.20.07%20PM.png?alt=media&token=d17905f8-0f4d-4123-a4c9-a2dd05416d08"
    },
    posts: {},
    users: {
        "yaIVzjyxUyd9zrk7zqCpbhL9DvX2": {
            clubs: [],
            name: "Maya Blumovitz",
        },
    },
};

describe("Mock tabs before new club is added", () => {

    it("ManageClubs is rendered, no admin clubs appear, and new club will be clicked", async () => {
        const { wrapper } = render(
            <ManageClubs user={user} data={data}></ManageClubs>,
            { wrapper: MemoryRouter }
        );
        const adminClubs = screen.queryByTestId("adminClubsTab");
        act(() => {
            adminClubs.click();
        });

        const noAdminsMessage =
            "Clubs that you are an admin for will appear here. Add a new club to get started.";

        const messageElement = screen.queryByTestId("no-admins-message");

        expect(messageElement).toBeDefined();
        expect(messageElement.textContent).toEqual(noAdminsMessage);
    });

    it("NewClub modal is rendered and test info is inputted. New club now appears in admin.", async () => {
        
        const { wrapper } = render(
            <ManageClubs user={user} data={data}></ManageClubs>,
            { wrapper: MemoryRouter }
        );
        const addClubElement = screen.queryByTestId("add-club-button");
        act(() => {
            addClubElement.click();
        });

        userEvent.type(screen.queryByTestId('add-club-name'), 'Testing Add Club!')
        userEvent.type(screen.queryByTestId('add-club-description'), 'Testing Add Club Description!')
        const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });

        const addClubForm = screen.queryByTestId("add-club-form");
        // act(() => {
        //     submitNewClubElement.click();
        // });
        fireEvent.submit(addClubForm);

 // UNCOMMENT

        // await waitFor(() => {
        //     expect(handleClose).toHaveBeenCalled();
        // });

        // screen.debug();

        // await waitFor(() => {
        //     expect(mockUseDbUpdate).toHaveBeenCalledWith({
        //         "/clubs": {
        //             [expect.any(String)]: {
        //                 description: "Testing Add Club Description!",
        //                 admins: ["yaIVzjyxUyd9zrk7zqCpbhL9DvX2"],
        //                 name: "Testing Add Club!",
        //                 members: ["yaIVzjyxUyd9zrk7zqCpbhL9DvX2"],
        //                 picLink: expect.any(String),
        //             },
        //         },
        //     });
        //     expect(mockUseDbUpdate).toHaveBeenCalledWith({
        //         "/users/yaIVzjyxUyd9zrk7zqCpbhL9DvX2/clubs": [expect.any(String)],
        //     });
        //     expect(handleClose).toHaveBeenCalled();

        // });
    });
});


// LEAVE OUT
            // const submitNewClubElement = screen.queryByTestId("submit-new-club");
            // act(() => {
            //     submitNewClubElement.click();
            // });

            // const newClubElement = await screen.queryByTestId("admin-club-card");
            // expect(newClubElement).toBeDefined();

            // const newClubName = await screen.queryByTestId("admin-club-name");
            // screen.debug();
            // expect(newClubName.innerText).toEqual('Testing Add Club!');


            // const deleteAdminClub = await screen.queryByTestId("delete-club-button");
            // act(() => {
            //     deleteAdminClub.click();
            // });

            // userEvent.type(screen.queryByTestId('delete-club-confirm-name'), 'Testing Add Club!')
            // const confirmDeleteAdminClub = await screen.queryByTestId("delete-club-confirm-button");
            // act(() => {
            //     confirmDeleteAdminClub.click();
            // });

            // expect(messageElement).toBeDefined();
            // expect(messageElement.textContent).toEqual(noAdminsMessage);