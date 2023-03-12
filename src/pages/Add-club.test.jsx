import { describe, expect, test, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { useProfile } from "../utilities/profile";
import { useDbData } from "../utilities/firebase";
import { debug } from "vitest-preview";
import "@testing-library/jest-dom";
import "@testing-library/user-event";
import userEvent from '@testing-library/user-event'
import { act } from "react-test-renderer";

import App from "../App";
import ManageClubs from "./ManageClubs";
import NewClub from "./NewClub";

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

const userLoggedInProfile = [
    {
        user: {
            uid: "IuQspQhlilOjDASGQ8dki50HjhT2",
            email: "kevinrueda2024@u.northwestern.edu",
            emailVerified: true,
            displayName: "Kevin Rueda",
            isAnonymous: false,
            photoURL:
                "https://lh3.googleusercontent.com/a/AEdFTp7mnMo-a44wdlXy8EC4BEwwxly6BtVFuxUWiDBY=s96-c",
            providerData: [
                {
                    providerId: "google.com",
                    uid: "110052672816418990599",
                    displayName: "Kevin Rueda",
                    email: "kevinrueda2024@u.northwestern.edu",
                    phoneNumber: null,
                    photoURL:
                        "https://lh3.googleusercontent.com/a/AGNmyxb6Li0myuOavE1zQtoT-oXtGlQKfHu0joaga0Fs=s96-c",
                },
            ],
            stsTokenManager: {
                refreshToken:
                    "APJWN8f8J-k80z1zXj5mpEZBk5_ajKX6aF0cPqpR08O4rTV3hBLAo6YveB57Obu4fd_c9cdHv7I5bdHDQPbfh86pRu4dfAPqW1uk7KB05Z7VzjMMPbyfKwkwSOuaS5reo59IDLishz5-ehfKQR5BME4qIMSSeIoK7X-FNcFfhZlkionl8UJzdaBbQhFM2JQowuHDqbyJgA9Vbn_UMPnphvGxIEzdL4VtaZrTdjKCC_83BB0Z0RXTn_KJDnVqICJJHkweNRiu8r9Z_oMR_Xp2XPeABIrvPUVkVAVsLNero2HXYgz7NtD5MuxfR3y7zyWYmqRKyHS6zFIYPwMVQw0s0Qkra402mGJYpcskxSANHuaeDSkpCD0lXie67AoXmCxuoWtjGOBgWQMM_LbXZlqEZ0u1bP2RYFCq7bs-RI6sqhpJJv26Ar6w3ispcTEaz5Nd3UbCKojpHvhO",
                accessToken:
                    "eyJhbGciOiJSUzI1NiIsImtpZCI6ImY4NzZiNzIxNDAwYmZhZmEyOWQ0MTFmZTYwODE2YmRhZWMyM2IzODIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiS2V2aW4gUnVlZGEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUVkRlRwN21uTW8tYTQ0d2RsWHk4RUM0QkV3d3hseTZCdFZGdXhVV2lEQlk9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2x1YmJ1bGxldGludGVzdCIsImF1ZCI6ImNsdWJidWxsZXRpbnRlc3QiLCJhdXRoX3RpbWUiOjE2Nzc4MDg0NDIsInVzZXJfaWQiOiJJdVFzcFFobGlsT2pEQVNHUThka2k1MEhqaFQyIiwic3ViIjoiSXVRc3BRaGxpbE9qREFTR1E4ZGtpNTBIamhUMiIsImlhdCI6MTY3NzgwODQ0MiwiZXhwIjoxNjc3ODEyMDQyLCJlbWFpbCI6ImtldmlucnVlZGEyMDI0QHUubm9ydGh3ZXN0ZXJuLmVkdSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTEwMDUyNjcyODE2NDE4OTkwNTk5Il0sImVtYWlsIjpbImtldmlucnVlZGEyMDI0QHUubm9ydGh3ZXN0ZXJuLmVkdSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.J4zPLmLj9MhzBAG3fNz_o4eb9wxLs8cPNuH-97xyjbphFYx-HFdZ9VlCdUNIMhfgDy_p2uXtdwbya7CcoWn1KAA8BUQ9kjKDWX30w8CTMkBpdtn-IOvYzcN2emVf7YIX4u3dZamyYu1IYzNXY5tprSTbOpfi-lyZCYbaOyhyvWEvGXIN_pyLHNIVcOdZm1gbFwWHmBbLEDkHrEA_YE6b2mCjwg-YVvHizRG2jwbHxdTYV5krZhdvx1_EaFTBoaZYqMKPkSJ5fzYjjH83skXDDFSTe2PaCSAh836aKOPer7pag-qDgNbbi0dv5Qhba7b5M_aNvGLTQuovNfDc4bZh6w",
                expirationTime: 1677812042720,
            },
            createdAt: "1674429555883",
            lastLoginAt: "1677808442746",
            apiKey: "AIzaSyDMwPuqe10GRZZBNPBUpcj2v_vTB5L61fs",
            appName: "[DEFAULT]",
        },
        isAdmin: null,
    },
    null,
    null,
];

const userWithSubscriptionsAndPosts = [
    {
        clubs: {
            "3b6f6485-cc38-486d-af03-c4ae032e0ad3": {
                admins: [],
                description: "test",
                members: ["IuQspQhlilOjDASGQ8dki50HjhT2"],
                name: "Test Club 1",
                picLink:
                    "https://firebasestorage.googleapis.com/v0/b/clubbulletintest.appspot.com/o/files%2Fimage.jpeg?alt=media&token=ee92e144-3493-44fe-85aa-95d43daa85ab",
            },
            "4c00dad7-d996-488e-ad11-afbc8cc45759": {
                admins: [],
                description: "e",
                members: ["IuQspQhlilOjDASGQ8dki50HjhT2"],
                name: "Test Club 2",
                picLink:
                    "https://firebasestorage.googleapis.com/v0/b/clubbulletintest.appspot.com/o/files%2FScreen%20Shot%202023-02-02%20at%208.13.34%20PM.png?alt=media&token=d4c37076-069e-41d8-95fa-a58764d97daa",
            },
            "4f5d00b9-cc7b-4584-a696-94766ef96066": {
                admins: ["IuQspQhlilOjDASGQ8dki50HjhT2"],
                description: "hello",
                members: ["IuQspQhlilOjDASGQ8dki50HjhT2"],
                name: "Test Club 3",
                picLink: "default",
            },
        },
        posts: {
            "5867e826-edf9-43d0-a883-4b09366c6a16": {
                clubId: "3b6f6485-cc38-486d-af03-c4ae032e0ad3",
                content: "Post 1!",
                likeCount: 5,
                posted: "1",
                title: "Test Club 1; Post 1",
            },
            "7576fa00-fb40-4446-8307-7f65200e62fd": {
                clubId: "3b6f6485-cc38-486d-af03-c4ae032e0ad3",
                content: "Post 2!",
                likeCount: 1,
                posted: "0",
                title: "Test Club 1; Post 2",
            },
            "a0a53e8d-a71c-490d-be31-fe1bf6420e6b": {
                clubId: "4c00dad7-d996-488e-ad11-afbc8cc45759",
                content: "Post 1!",
                likeCount: 8,
                posted: "1",
                title: "Test Club 2; Post 1",
            },
            "b0a53e8d-a71c-490d-be31-fe1bf6420e6b": {
                clubId: "4f5d00b9-cc7b-4584-a696-94766ef96066",
                content: "Post 1!",
                likeCount: 3,
                posted: "1",
                title: "Test Club 3; Post 1",
            },
        },
        users: {
            IuQspQhlilOjDASGQ8dki50HjhT2: {
                clubs: [
                    "",
                    "3b6f6485-cc38-486d-af03-c4ae032e0ad3",
                    "4c00dad7-d996-488e-ad11-afbc8cc45759",
                    "4f5d00b9-cc7b-4584-a696-94766ef96066",
                ],
                name: "Kevin Rueda",
            },
        },
    },
    null,
];

describe("Mock tabs before new club is added", () => {
    beforeEach(() => {
        useProfile.mockReturnValue(userLoggedInProfile);
        useDbData.mockReturnValue(userWithSubscriptionsAndPosts);
    });

    it("ManageClubs is rendered, no admin clubs appear, and new club will be clicked", async () => {
        render(<ManageClubs />);

        const noAdminsMessage =
            "Clubs that you are an admin for will appear here. Add a new club to get started.";

        const messageElement = screen.queryByTestId(
            "no-admins-message"
        );

        // expect the message to be rendered
        expect(messageElement).toBeDefined();
        expect(messageElement.textContent).toEqual(noAdminsMessage);
    });

    it("NewClub modal is rendered and test info is inputted", () => {
        const addClubElement = screen.queryByTestId(
            "add-club-button"
        );
        act(() => {
            addClubElement.click();
        });

        userEvent.type(screen.queryByTestId('add-club-name'), 'Testing Add Club!')
        expect(screen.queryByTestId('add-club-name')).toHaveValue('Testing Add Club!')

        userEvent.type(screen.queryByTestId('add-club-description'), 'Testing Add Club Description!')
        expect(screen.queryByTestId('add-club-description')).toHaveValue('Testing Add Club Description!')

        const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });

        const picInput = getByTestId('add-club-pic');
        userEvent.upload(picInput, file);

        const submitNewClubElement = screen.queryByTestId(
            "submit-new-club"
        );
        act(() => {
            submitNewClubElement.click();
        });
    });

    it("The added club will now appear in admin", async () => {
        const newClubElement = await screen.findByTestId("admin-club-card");
        expect(newClubElement).toBeDefined();
    });
});