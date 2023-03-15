import { describe, expect, test, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { useProfile } from "../utilities/profile";
import { MemoryRouter } from 'react-router-dom';

import { useDbData } from "../utilities/firebase";
import { debug } from "vitest-preview";
import "@testing-library/jest-dom";
import { act } from "react-test-renderer";

import App from "../App";
import NewClub from "../pages/NewClub";
import ManageClubs from "../pages/ManageClubs";

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
const user = {
    uid: "user-id-1",
};
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

const userWithNoSubscriptionsData = [
  {
    clubs: {
      "club-id-1": {
        admins: [],
        members: [],
        name: "Test Club 1",
        picLink:
          "https://firebasestorage.googleapis.com/v0/b/clubbulletintest.appspot.com/o/files%2Fimage.jpeg?alt=media&token=ee92e144-3493-44fe-85aa-95d43daa85ab",
      },
      "club-id-2": {
        admins: [],
        members: [],
        name: "Test Club 2",
        picLink:
          "https://firebasestorage.googleapis.com/v0/b/clubbulletintest.appspot.com/o/files%2FScreen%20Shot%202023-02-02%20at%208.13.34%20PM.png?alt=media&token=d4c37076-069e-41d8-95fa-a58764d97daa",
      },
      "club-id-3": {
        admins: [],
        members: [],
        name: "Test Club 3",
        picLink: "default",
      },
      "club-id-4": {
        admins: [],
        members: [],
        name: "Test Club 4",
        picLink: "default",
      },
    },
    posts: {},
    users: {
      "user-id-1": {
        clubs: [],
        name: "Kevin Rueda",
      },
    },
  },
  null,
];

const userWithSubscriptionsNoPostsData = [
  {
    clubs: {
      "club-id-1": {
        admins: [],
        members: ["user-id-1"],
        name: "Test Club 1",
      },
    },
    posts: {},
    users: {
      "user-id-1": {
        clubs: ["club-id-1"],
        name: "Kevin Rueda",
      },
    },
  },
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


describe("Open up add new club modal when clicked", () => {
  beforeEach(() => {
    useProfile.mockReturnValue(userLoggedInProfile);
    useDbData.mockReturnValue(userWithNoSubscriptionsData);
  });

  it("The 'Add New Club' button is rendered", async () => {
    // const { wrapper } = render(<ManageClubs user={user} data={}/>);
    const { wrapper } = render(
        <ManageClubs user={user} data={userWithNoSubscriptionsData[0]}></ManageClubs>,
        { wrapper: MemoryRouter }
    );
    const addNewClubMsg = "Add New Club";

    const addClubButton = screen.getByTestId("add-club-button");
    // console.log(addClubButton.children)
    // expect the message to be rendered
    expect(addClubButton).toBeDefined();
    expect(addClubButton.textContent).toEqual(addNewClubMsg);
  });

  it("The whole form is rendered, with labels, after clicking Add New Club", () => {
    const { wrapper } = render(
        <ManageClubs user={user} data={userWithNoSubscriptionsData[0]}></ManageClubs>,
        { wrapper: MemoryRouter }
    );
    // const addNewClubMsg = "Add New Club";

    const addClubButton = screen.getByTestId("add-club-button");

    act(() => {
        addClubButton.click();
    });

    const modalTitle = "Create New Club";
    const modalTitleElement = screen.queryByTestId("create-new-club-title");
    expect(modalTitleElement).toBeDefined();
    expect(modalTitleElement.textContent).toEqual(modalTitle);

  });
});


