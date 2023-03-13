import { describe, expect, test, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import { useProfile } from "../utilities/profile";
import { useDbData } from "../utilities/firebase";
// import { debug } from "vitest-preview";
import "@testing-library/jest-dom";
import "@testing-library/user-event";
import userEvent from '@testing-library/user-event'
import { act } from "react-test-renderer";
import App from "../App";
import ManageClubs from "./ManageClubs";
import NewClub from "./NewClub";

// vi.mock("../utilities/firebase", async () => {
//     const original = await vi.importActual("../utilities/firebase");
//     return {
//         ...original,
//         useDbData: vi.fn(),
//     };
// });

// vi.mock("../utilities/profile", async () => {
//     const original = await vi.importActual("../utilities/profile");
//     return {
//         ...original,
//         useProfile: vi.fn(),
//     };
// });

const user = {
    uid: "user-1",
};

const data = {
    clubs: {},
    posts: {},
    users: {
        "user-1": {
            clubs: [],
            name: "user",
        },
    },
};

describe("Mock tabs before new club is added", () => {
    // beforeEach(() => {
    //     useProfile.mockReturnValue(userLoggedInProfile);
    //     useDbData.mockReturnValue(userWithSubscriptionsAndPosts);
    // });

    it("ManageClubs is rendered, no admin clubs appear, and new club will be clicked", async () => {
        const { wrapper } = render(
            <ManageClubs user={user} data={data}></ManageClubs>,
            { wrapper: MemoryRouter }
        );
        const adminClubs = screen.queryByTestId(
            "adminClubsTab"
        );
        act(() => {
            adminClubs.click();
        });

        const noAdminsMessage =
            "Clubs that you are an admin for will appear here. Add a new club to get started.";

        const messageElement = screen.queryByTestId(
            "no-admins-message"
        );

        // expect the message to be rendered
        expect(messageElement).toBeDefined();
        expect(messageElement.textContent).toEqual(noAdminsMessage);
    });

    it("NewClub modal is rendered and test info is inputted. New club now appears in admin.", async () => {
        const { wrapper } = render(
            <ManageClubs user={user} data={data}></ManageClubs>,
            { wrapper: MemoryRouter }
        );
        const addClubElement = screen.queryByTestId(
            "add-club-button"
        );
        act(() => {
            addClubElement.click();
        });

        userEvent.type(screen.queryByTestId('add-club-name'), 'Testing Add Club!')
        // expect(screen.queryByTestId('add-club-name')).toHaveValue('Testing Add Club!')

        userEvent.type(screen.queryByTestId('add-club-description'), 'Testing Add Club Description!')
        // expect(screen.queryByTestId('add-club-description')).toHaveValue('Testing Add Club Description!')

        const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });

        const picInput = screen.queryByTestId('add-club-pic');
        userEvent.upload(picInput, file);

        const submitNewClubElement = screen.queryByTestId(
            "submit-new-club"
        );
        act(() => {
            submitNewClubElement.click();
        });

        const newClubElement = await screen.queryByTestId("admin-club-card");
        expect(newClubElement).toBeDefined();
    });

});