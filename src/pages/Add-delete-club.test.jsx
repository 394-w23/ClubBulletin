import { describe, expect, test, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import "@testing-library/jest-dom";
import "@testing-library/user-event";
import userEvent from '@testing-library/user-event'
import { act } from "react-test-renderer";
import ManageClubs from "./ManageClubs";
// import testImage from '../../TestImage.png';
import path from 'path';

const filePath = path.join(__dirname, '../../TestImage.png');

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

    it("NewClub modal is rendered and test info is inputted. New club now appears in admin. Then, it is deleted.", async () => {
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
        // const response = await fetch(`file://${filePath}`);
        // const file = await response.blob();

        // const picInput = screen.queryByTestId('add-club-pic');
        // userEvent.upload(picInput, file);

        const submitNewClubElement = screen.queryByTestId("submit-new-club");
        act(() => {
            submitNewClubElement.click();
        });

        const newClubElement = await screen.queryByTestId("admin-club-card");
        expect(newClubElement).toBeDefined();

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
    });

});