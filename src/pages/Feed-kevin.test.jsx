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
        members: ["IuQspQhlilOjDASGQ8dki50HjhT2"],
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
