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
        "38ce7dbc-0ff0-475e-9b47-0d41f99c17fb": {
            admins: ["yaIVzjyxUyd9zrk7zqCpbhL9DvX2"],
            members: ["yaIVzjyxUyd9zrk7zqCpbhL9DvX2"],
            description: "Testing",
            name: "Test Name",
            picLink: "https://firebasestorage.googleapis.com/v0/b/clubbulletin-e6cf8.appspot.com/o/files%2FScreen%20Shot%202023-03-12%20at%204.20.07%20PM.png?alt=media&token=d17905f8-0f4d-4123-a4c9-a2dd05416d08"
        }
    },
    posts: {},
    users: {
        "yaIVzjyxUyd9zrk7zqCpbhL9DvX2": {
            clubs: ["38ce7dbc-0ff0-475e-9b47-0d41f99c17fb"],
            name: "Maya Blumovitz",
        },
    },
};

describe("Testing adding a new club", () => {

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

    it("NewClub modal is rendered and test info is inputted. Club creation is successful.", async () => {

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

        const submitNewClubElement = screen.queryByTestId("submit-new-club");
        fireEvent.click(submitNewClubElement);

        expect(screen.findByText("Club creation was a success!")).toBeDefined();
    });
});

describe("Testing deleting a club", () => {

    it("ManageClubs is rendered, one admin clubs appears", async () => {
        const { wrapper } = render(
            <ManageClubs user={user} data={data_admin}></ManageClubs>,
            { wrapper: MemoryRouter }
        );
        const adminClubs = screen.queryByTestId("adminClubsTab");
        act(() => {
            adminClubs.click();
        });

        const adminClubElement = await screen.queryByTestId("admin-club-card");
        expect(adminClubElement).toBeDefined();

        const adminClubName = await screen.queryByTestId("admin-club-name");
        expect(adminClubName).toBeDefined();
        expect(adminClubName.textContent).toEqual('Test Name');
    });

    it("Delete club button is clicked. Club is successfully deleted.", async () => {

        const { wrapper } = render(
            <ManageClubs user={user} data={data_admin}></ManageClubs>,
            { wrapper: MemoryRouter }
        );
        const adminClubs = screen.queryByTestId("adminClubsTab");
        act(() => {
            adminClubs.click();
        });

        const deleteAdminClub = await screen.queryByTestId("delete-club-button");
        expect(deleteAdminClub).toBeDefined();
        fireEvent.click(deleteAdminClub);

        const deleteConfirmation = await screen.queryByTestId('delete-club-confirm-name');
        expect(deleteConfirmation).toBeDefined();
        fireEvent.change(deleteConfirmation, {
            target: { value: "Test Name" },
        });

        const confirmDeleteAdminClub = await screen.queryByTestId("delete-club-confirm-button");
        fireEvent.click(confirmDeleteAdminClub);

        const checkDeletion = await screen.findByText("Club was successfully deleted!");
        expect(checkDeletion).toBeDefined();
    });
});