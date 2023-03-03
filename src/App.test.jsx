import { describe, expect, test, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { useProfile } from "./utilities/profile";
import { useDbData, useAuthState } from "./utilities/firebase";
import { debug } from "vitest-preview";

import App from "./App";

// vi.mock("./utilities/profile");
// vi.mock("./utilities/firebase");

vi.mock("./utilities/firebase", async () => {
  const original = await vi.importActual("./utilities/firebase");
  return {
    ...original,
    useAuthState: vi.fn(),
    useDbData: vi.fn(),
  };
});

vi.mock("./utilities/profile", async () => {
  const original = await vi.importActual("./utilities/profile");
  return {
    ...original,
    useProfile: vi.fn(),
  };
});

const user = { email: "user@northwetern.edu" };

const profile = [
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

const data = [
  {
    clubs: {
      "3b6f6485-cc38-486d-af03-c4ae032e0ad3": {
        admins: [
          "",
          "HcYJNncMwQQbmnmYKWNln0FbqtG3",
          "yzr2CLCgskTUupMHfR2mcuFTffo1",
        ],
        description: "test",
        members: [
          "",
          "yzr2CLCgskTUupMHfR2mcuFTffo1",
          "jgWu9uNa5chPQ0oOVywxUuwzxpI2",
          "Sg4kJL09iTejpm9oP6Ih0biWOWt1",
          "8Z6IVm1xRgVHKOLJiK0gqj2WGJZ2",
          "v5m2nuuAq9TAUfDt87veYETfgnw1",
          "pC5DrFpxFcNQdFe5Q4ZRpN5ZN1u1",
          "IvEyS51SktZ7rHZBY1LDlQfcA963",
          "IuQspQhlilOjDASGQ8dki50HjhT2",
        ],
        name: "test club",
        picLink:
          "https://firebasestorage.googleapis.com/v0/b/clubbulletintest.appspot.com/o/files%2Fimage.jpeg?alt=media&token=ee92e144-3493-44fe-85aa-95d43daa85ab",
      },
      "4c00dad7-d996-488e-ad11-afbc8cc45759": {
        admins: [
          "",
          "HcYJNncMwQQbmnmYKWNln0FbqtG3",
          "IuQspQhlilOjDASGQ8dki50HjhT2",
        ],
        description: "e",
        members: ["", "IuQspQhlilOjDASGQ8dki50HjhT2"],
        name: "test club w pic",
        picLink:
          "https://firebasestorage.googleapis.com/v0/b/clubbulletintest.appspot.com/o/files%2FScreen%20Shot%202023-02-02%20at%208.13.34%20PM.png?alt=media&token=d4c37076-069e-41d8-95fa-a58764d97daa",
      },
      "4f5d00b9-cc7b-4584-a696-94766ef96066": {
        admins: [
          "",
          "HcYJNncMwQQbmnmYKWNln0FbqtG3",
          "v5m2nuuAq9TAUfDt87veYETfgnw1",
        ],
        description: "hello",
        members: [
          "",
          "v5m2nuuAq9TAUfDt87veYETfgnw1",
          "pC5DrFpxFcNQdFe5Q4ZRpN5ZN1u1",
          "IvEyS51SktZ7rHZBY1LDlQfcA963",
        ],
        name: "random club",
        picLink: "default",
      },
      "dbace733-9679-4003-a0e8-e03dfe96916b": {
        admins: [
          "",
          "HcYJNncMwQQbmnmYKWNln0FbqtG3",
          "Sg4kJL09iTejpm9oP6Ih0biWOWt1",
        ],
        description: "testing edit/delete",
        members: [
          "",
          "Sg4kJL09iTejpm9oP6Ih0biWOWt1",
          "IvEyS51SktZ7rHZBY1LDlQfcA963",
        ],
        name: "test club 2",
        picLink: "default",
      },
    },
    posts: {
      "5867e826-edf9-43d0-a883-4b09366c6a16": {
        clubId: "dbace733-9679-4003-a0e8-e03dfe96916b",
        content: "test post 1 lolol",
        likeCount: 0,
        posted: "1674516539622",
        title: "test post 1",
      },
      "7576fa00-fb40-4446-8307-7f65200e62fd": {
        clubId: "4f5d00b9-cc7b-4584-a696-94766ef96066",
        content: "XDDDD",
        likeCount: 0,
        posted: "1674784089992",
        title: "xd",
      },
      "93c4c898-8e23-4db2-8943-bf8aff2225e2": {
        clubId: "4c00dad7-d996-488e-ad11-afbc8cc45759",
        content: "hi",
        likeCount: 0,
        posted: "1675391518034",
        title: "hi",
      },
      "a0a53e8d-a71c-490d-be31-fe1bf6420e6b": {
        clubId: "3b6f6485-cc38-486d-af03-c4ae032e0ad3",
        content: "test post",
        likeCount: 1,
        posted: "1674415767768",
        title: "test post",
      },
    },
    users: {
      "8Z6IVm1xRgVHKOLJiK0gqj2WGJZ2": {
        clubs: ["", "3b6f6485-cc38-486d-af03-c4ae032e0ad3"],
        name: "Maya Blumovitz",
      },
      IuQspQhlilOjDASGQ8dki50HjhT2: {
        clubs: [
          "",
          "4c00dad7-d996-488e-ad11-afbc8cc45759",
          "3b6f6485-cc38-486d-af03-c4ae032e0ad3",
        ],
        name: "Kevin Rueda",
      },
      IvEyS51SktZ7rHZBY1LDlQfcA963: {
        clubs: [
          "",
          "3b6f6485-cc38-486d-af03-c4ae032e0ad3",
          "dbace733-9679-4003-a0e8-e03dfe96916b",
          "4f5d00b9-cc7b-4584-a696-94766ef96066",
        ],
        name: "Chris",
      },
      R5gcgCHJZpaJH7zAuTMj58QwBGz2: {
        clubs: [""],
        name: "Yuming Wang",
      },
      Sg4kJL09iTejpm9oP6Ih0biWOWt1: {
        clubs: [
          "",
          "3b6f6485-cc38-486d-af03-c4ae032e0ad3",
          "dbace733-9679-4003-a0e8-e03dfe96916b",
        ],
        name: "Nicholas Tsung",
      },
      jgWu9uNa5chPQ0oOVywxUuwzxpI2: {
        clubs: ["", "3b6f6485-cc38-486d-af03-c4ae032e0ad3"],
        name: "Root Admin",
      },
      pC5DrFpxFcNQdFe5Q4ZRpN5ZN1u1: {
        clubs: [
          "",
          "3b6f6485-cc38-486d-af03-c4ae032e0ad3",
          "4f5d00b9-cc7b-4584-a696-94766ef96066",
        ],
        name: "Zarif Ceaser",
      },
      v5m2nuuAq9TAUfDt87veYETfgnw1: {
        clubs: [
          "",
          "4f5d00b9-cc7b-4584-a696-94766ef96066",
          "3b6f6485-cc38-486d-af03-c4ae032e0ad3",
        ],
        name: "Nathan Wang",
      },
      yzr2CLCgskTUupMHfR2mcuFTffo1: {
        clubs: ["", "3b6f6485-cc38-486d-af03-c4ae032e0ad3"],
        name: "Alex Feng",
      },
    },
  },
  null,
];

describe("no user is logged in", () => {
  it("shows the login page", async () => {
    render(<App />);
    await screen.findByText("Sign in to view posts and subscribe to clubs.");
  });
});

describe("mock user is logged in", () => {
  useProfile.mockReturnValue(profile);
  useAuthState.mockReturnValue(user);
  useDbData.mockReturnValue(data);

  it("loads your feed", async () => {
    render(<App />);
    await screen.findByText("Your Feed");

    // const manageClubsButton = screen.getByText('Manage');
    // fireEvent.click(manageClubsButton);
    // expect(await screen.findByText('Manage Clubs')).toBeDefined();
  });
  it("loads your first club", async () => {
    await screen.findByText("Test Club");
  });
});

// describe('without logged in user', () => {
//   beforeEach(() => {
//     useAuthState.mockReturnValue([null]);
//     useProfile.mockReturnValue([null]);
//     render(<App />);
//   });
//   it('load login page', async () => {
//     expect(await screen.getByText('Sign in to view posts and subscribe to clubs.')).toBeDefined();
//   });
// });
