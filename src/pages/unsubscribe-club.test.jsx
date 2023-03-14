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
            name: "Zarif Ceaser",
        },
    },
};

describe("Check subscribable club", () => {

    it("ManageClubs is rendered, a club should have a subscribe button", async () => {
        const { wrapper } = render(
            <ManageClubs user={user} data={data}></ManageClubs>,
            { wrapper: MemoryRouter }
        );
        const joinClubs = screen.queryByTestId("joinClubsTab");
        act(() => {
            joinClubs.click();
        });

        const joinClubsMessage = "Join Clubs"

        expect(joinClubs).toBeDefined();
        expect(joinClubs.textContent).toEqual(joinClubsMessage);
    });

    it("No subscribed clubs message appears when user is not subscribed to any clubs", async () => {

        const { wrapper } = render(
            <ManageClubs user={user} data={data}></ManageClubs>,
            { wrapper: MemoryRouter }
        );
        const subscribeClubs = screen.queryByTestId("subscribeClubTab");
        act(() => {
            subscribeClubs.click();
        });

        expect(screen.findByText("You aren't subscribed to any clubs yet!")).toBeDefined();
    });
});