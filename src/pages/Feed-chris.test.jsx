import { describe, expect, test, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { useProfile } from "../utilities/profile";
import { useDbData } from "../utilities/firebase";
import { debug } from "vitest-preview";
import "@testing-library/jest-dom";
import { act } from "react-test-renderer";
import ManageClubs from "./ManageClubs";
import { MemoryRouter } from 'react-router-dom';

import App from "../App";

// vi.mock("./utilities/profile");
// vi.mock("./utilities/firebase");

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

// const user = {
//     uid: "user-id-1",
// };

// const userNotLoggedIn = [{}, null, null];

// const data = {
//     clubs: {
//         club1: {
//           admins: [],
//           members: [""],
//           name: "Math",
//           picLink: "default",
//         },
//         club2: {
//           admins: [],
//           members: [""],
//           name: "Anime",
//           picLink: "default",
//         },
//         club3: {
//           admins: ["user-id-1"],
//           members: [""],
//           name: "Chess",
//           picLink: "default",
//         },
//         club4: {
//           admins: ["user-id-1"],
//           members: [""],
//           name: "Glee",
//           picLink: "default",
//         },
//         users: {
//           "user-id-1": {
//             clubs: ["", "club1", "club2", "club3, club4"],
//             name: "Chris Naing",
//           },
//         },
//       },
// }

const user = {
    uid: "user-id-1",
};

const data = {
    clubs: {
        club1: {
          admins: [],
          members: [""],
          name: "Math",
          picLink: "default",
        },
        club2: {
          admins: [],
          members: [""],
          name: "Anime",
          picLink: "default",
        },
        club3: {
          admins: ["user-id-1"],
          members: [""],
          name: "Chess",
          picLink: "default",
        },
        club4: {
          admins: ["user-id-1"],
          members: [""],
          name: "Glee",
          picLink: "default",
        },
      },
    posts: {},
    users: {
        "user-id-1": {
            clubs: [],
            name: "Chris Naing",
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

describe("User can go back to feed on Manage Clubs page by clicking on 'Back to Feed' button ", async () => {
  beforeEach(() => {
    useDbData.mockReturnValue(data);
  });

  it("find button and click it", async () => {
    const { wrapper } = render(
      <ManageClubs user={user} data={data}></ManageClubs>,
      { wrapper: MemoryRouter }
    );

    const backButton = screen.getByTestId("backFeed");
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveTextContent("Back to Feed");
    expect(backButton).not.toHaveTextContent("Create Club");
    const { getAllByRole } = within(backButton);
    const button = getAllByRole("button")[0];
    act(() => {
        button.click();
    });
  });

  
});
