import { describe, expect, test, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { useProfile } from "../utilities/profile";
import { useDbData } from "../utilities/firebase";
import { debug } from "vitest-preview";
import "@testing-library/jest-dom";
import { act } from "react-test-renderer";

import App from "../App";

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

const user = { email: "user@northwetern.edu" };

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

const userWithNoSubscriptionsData = [
  {
    clubs: {
      "3b6f6485-cc38-486d-af03-c4ae032e0ad3": {
        admins: [],
        description: "test",
        members: [],
        name: "test club",
        picLink:
          "https://firebasestorage.googleapis.com/v0/b/clubbulletintest.appspot.com/o/files%2Fimage.jpeg?alt=media&token=ee92e144-3493-44fe-85aa-95d43daa85ab",
      },
      "4c00dad7-d996-488e-ad11-afbc8cc45759": {
        admins: [],
        description: "e",
        members: [],
        name: "test club w pic",
        picLink:
          "https://firebasestorage.googleapis.com/v0/b/clubbulletintest.appspot.com/o/files%2FScreen%20Shot%202023-02-02%20at%208.13.34%20PM.png?alt=media&token=d4c37076-069e-41d8-95fa-a58764d97daa",
      },
      "4f5d00b9-cc7b-4584-a696-94766ef96066": {
        admins: [],
        description: "hello",
        members: [],
        name: "random club",
        picLink: "default",
      },
      "dbace733-9679-4003-a0e8-e03dfe96916b": {
        admins: [],
        description: "testing edit/delete",
        members: [],
        name: "test club 2",
        picLink: "default",
      },
    },
    posts: {},
    users: {
      IuQspQhlilOjDASGQ8dki50HjhT2: {
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
      "3b6f6485-cc38-486d-af03-c4ae032e0ad3": {
        admins: [],
        description: "test",
        members: ["IuQspQhlilOjDASGQ8dki50HjhT2"],
        name: "Test club",
        picLink:
          "https://firebasestorage.googleapis.com/v0/b/clubbulletintest.appspot.com/o/files%2Fimage.jpeg?alt=media&token=ee92e144-3493-44fe-85aa-95d43daa85ab",
      },
    },
    posts: {},
    users: {
      IuQspQhlilOjDASGQ8dki50HjhT2: {
        clubs: ["3b6f6485-cc38-486d-af03-c4ae032e0ad3"],
        name: "Kevin Rueda",
      },
    },
  },
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

describe("Mock Feed when the user is not subscribed to any clubs", () => {
  beforeEach(() => {
    useProfile.mockReturnValue(userLoggedInProfile);
    useDbData.mockReturnValue(userWithNoSubscriptionsData);
  });

  it("The 'No Subscriptions' message is rendered", async () => {
    const { wrapper } = render(<App />);

    const noSubscriptionsMessage =
      "You haven't joined any club feeds yet! Go to Clubs to join a club.";

    const messageElement = screen.queryByTestId(
      "feed-no-subscriptions-message"
    );

    // expect the message to be rendered
    expect(messageElement).toBeDefined();
    expect(messageElement.textContent).toEqual(noSubscriptionsMessage);

    // you can click on the message to render the Manage page
    const noSubscriptionAnchorTag = screen.queryByTestId(
      "feed-no-subscriptions-message-anchor"
    );

    expect(noSubscriptionAnchorTag).toHaveAttribute("href", "/manageclubs");

    act(() => {
      noSubscriptionAnchorTag.click();
    });
  });

  it("Only the 'All Clubs' tab is rendered", () => {
    const { wrapper } = render(<App />);

    const clubSelector = screen.queryByTestId("feed-club-selector");
    const { getAllByRole } = within(clubSelector);
    const items = getAllByRole("listitem");

    // expect one tab to be rendered
    expect(items.length).toEqual(1);

    // expect the one tab to have the "All clubs" text
    expect(items[0].textContent).toEqual("All clubs");
  });
});

describe("Mock Feed when the user is subscribed to clubs with no posts", () => {
  beforeEach(() => {
    useProfile.mockReturnValue(userLoggedInProfile);
    useDbData.mockReturnValue(userWithSubscriptionsNoPostsData);
  });

  it("The 'No Subscriptions' messages are rendered", async () => {
    const wrapper = render(<App />);

    const noPostsAllMessage =
      "None of your subscribed clubs have posted any messages yet!";

    const noPostsClubMessage = "This club hasn't posted any messages yet!";

    const noPostsAllMessageElement = screen.queryByTestId(
      "feed-no-posts-all-message"
    );

    // By default, the "All clubs" tab should be selected. The user should see "None of your subscribed clubs have posted any messages yet!"
    expect(noPostsAllMessageElement).toBeDefined();
    expect(noPostsAllMessageElement.textContent).toEqual(noPostsAllMessage);

    const clubSelector = screen.queryByTestId("feed-club-selector");
    const { getAllByRole } = within(clubSelector);
    const items = getAllByRole("listitem");

    // expect two tabs to be rendered
    expect(items.length).toEqual(2);

    // Switching the tab to a subscribed club should render the "This club hasn't posted any messages yet!" message
    // click on the tab of the subscribed club
    act(() => {
      wrapper.getAllByTestId("feed-club-selector-button")[1].click();
    });

    const noPostsClubMessageElement = screen.queryByTestId(
      "feed-no-posts-club-message"
    );

    expect(noPostsClubMessageElement).toBeDefined();
    expect(noPostsClubMessageElement.textContent).toEqual(noPostsClubMessage);
  });
});

describe("Mock Feed when the user is subscribed to clubs with posts", () => {
  beforeEach(() => {
    useProfile.mockReturnValue(userLoggedInProfile);
    useDbData.mockReturnValue(userWithSubscriptionsAndPosts);
  });

  it("No post messages are not rendered", () => {
    const wrapper = render(<App />);

    const noPostsAllMessageElement = screen.queryByTestId(
      "feed-no-posts-all-message"
    );

    const noPostsClubMessageElement = screen.queryByTestId(
      "feed-no-posts-club-message"
    );

    expect(noPostsAllMessageElement).toBeFalsy();

    act(() => {
      wrapper.getAllByTestId("feed-club-selector-button")[1].click();
    });

    expect(noPostsClubMessageElement).toBeFalsy();
  });

  it.each`
    feedTabIndex | clubName         | numberOfPosts | postTitles                                        | postContent               | postLikeCountLabelOnLoad | postLikeCountLabelOnclick | isUserAdmin
    ${1}         | ${"Test Club 1"} | ${2}          | ${["Test Club 1; Post 1", "Test Club 1; Post 2"]} | ${["Post 1!", "Post 2!"]} | ${["5 likes", "1 like"]} | ${["6 likes", "2 likes"]} | ${false}
    ${2}         | ${"Test Club 2"} | ${1}          | ${["Test Club 2; Post 1"]}                        | ${["Post 1!"]}            | ${["8 likes"]}           | ${["9 likes"]}            | ${false}
    ${3}         | ${"Test Club 3"} | ${1}          | ${["Test Club 3; Post 1"]}                        | ${["Post 1!"]}            | ${["3 likes"]}           | ${["4 likes"]}            | ${true}
  `(
    "Clicking on club tab for $clubName renders its corresponding posts",
    async ({
      feedTabIndex,
      clubName,
      numberOfPosts,
      postTitles,
      postContent,
      postLikeCountLabelOnLoad,
      postLikeCountLabelOnclick,
      isUserAdmin,
    }) => {
      const wrapper = render(<App />);

      const clubSelector = wrapper.queryByTestId("feed-club-selector");
      const { getAllByRole } = within(clubSelector);
      const clubTabs = getAllByRole("listitem");

      // expect three tabs to be rendered
      expect(clubTabs.length).toEqual(4);

      // check the tab label is correct
      expect(
        wrapper.getAllByTestId("feed-club-selector-button")[feedTabIndex]
          .textContent
      ).toEqual(clubName);

      // click on the tab label
      act(() => {
        wrapper
          .getAllByTestId("feed-club-selector-button")
          [feedTabIndex].click();
      });

      const posts = await wrapper.getAllByTestId("feed-post");

      // expect the correct number of posts to be rendered
      expect(posts.length).toEqual(numberOfPosts);

      posts.map((post, index) => {
        // check post club name
        expect(post.querySelector(".post-club-name").textContent).toEqual(
          clubName
        );

        // check post title
        expect(post.querySelector(".post-title").textContent).toEqual(
          postTitles[index]
        );

        // check post body
        expect(post.querySelector(".card-post-content").textContent).toEqual(
          postContent[index]
        );

        // check post likes
        expect(
          post.querySelector(".post-like-count-label").textContent
        ).toEqual(postLikeCountLabelOnLoad[index]);

        // expect the post to not be liked
        expect(post.querySelector(".post-favorite-border-icon")).toBeDefined();
        expect(post.querySelector(".post-favorite-icon")).toBeFalsy();

        // like the post
        fireEvent.click(post.querySelector(".post-favorite-border-icon"));

        // expect the like count to have updated
        expect(
          post.querySelector(".post-like-count-label").textContent
        ).toEqual(postLikeCountLabelOnclick[index]);

        // expect the like icon to have updated
        expect(post.querySelector(".post-favorite-border-icon")).toBeFalsy();
        expect(post.querySelector(".post-favorite-icon")).toBeDefined();

        // if the user is an admin, expect the modal to appear
        isUserAdmin
          ? expect(screen.getByText("Create Post")).toBeDefined()
          : expect(() => screen.getByText("Create Post")).toThrow();
      });
    }
  );
});
