// import { describe, expect, test, it, vi } from "vitest";
// import { fireEvent, render, screen, within } from "@testing-library/react";
// import { useProfile } from "../utilities/profile";
// import { MemoryRouter } from 'react-router-dom';

// import { useDbData } from "../utilities/firebase";
// import { debug } from "vitest-preview";
// import "@testing-library/jest-dom";
// import { act } from "react-test-renderer";

// import ManageClubs from "../pages/ManageClubs";
// import Navigation from "../components/Navigation/Navigation"
// import userEvent from '@testing-library/user-event'
// import { signOut } from "../utilities/firebase";


// vi.mock("../utilities/firebase", async () => {
//   const original = await vi.importActual("../utilities/firebase");
//   return {
//     ...original,
//     useDbData: vi.fn(),
//     signOut: vi.fn()
//   };
// });

// vi.mock("../utilities/profile", async () => {
//   const original = await vi.importActual("../utilities/profile");
//   return {
//     ...original,
//     useProfile: vi.fn(),
//   };
// });
// const user = {
//     uid: "user-id-1",
// };
// const userLoggedInProfile = [
//   {
//     user: {
//       uid: "user-id-1",
//     },
//     isAdmin: null,
//   },
//   null,
//   null,
// ];

// const userWithNoSubscriptionsData = [
//   {
//     clubs: {
//       "club-id-1": {
//         admins: [],
//         members: [],
//         name: "Test Club 1",
//         picLink:
//           "https://firebasestorage.googleapis.com/v0/b/clubbulletintest.appspot.com/o/files%2Fimage.jpeg?alt=media&token=ee92e144-3493-44fe-85aa-95d43daa85ab",
//       },
//       "club-id-2": {
//         admins: [],
//         members: [],
//         name: "Test Club 2",
//         picLink:
//           "https://firebasestorage.googleapis.com/v0/b/clubbulletintest.appspot.com/o/files%2FScreen%20Shot%202023-02-02%20at%208.13.34%20PM.png?alt=media&token=d4c37076-069e-41d8-95fa-a58764d97daa",
//       },
//       "club-id-3": {
//         admins: [],
//         members: [],
//         name: "Test Club 3",
//         picLink: "default",
//       },
//       "club-id-4": {
//         admins: [],
//         members: [],
//         name: "Test Club 4",
//         picLink: "default",
//       },
//     },
//     posts: {},
//     users: {
//       "user-id-1": {
//         clubs: [],
//         name: "Kevin Rueda",
//       },
//     },
//   },
//   null,
// ];



// describe("Signout button signs out user", () => {
//   beforeEach(() => {
//     useProfile.mockReturnValue(userLoggedInProfile);
//     useDbData.mockReturnValue(userWithNoSubscriptionsData);
//   });

//   it("The 'Sign out' button is rendered", async () => {
//     signOut.mockReturnValue(null);
    
//     const userEv = userEvent.setup();
//     const { wrapper } = render(
//         <ManageClubs user={user} data={userWithNoSubscriptionsData[0]}></ManageClubs>,
//         { wrapper: MemoryRouter }
//     );
//     const dropdownButton = screen.getByTestId("navbar-toggle")
//     act(() => {
//       dropdownButton.click();
//     });
//     const dropdown2 = screen.getByTestId("signout-dropdown");
//     act(() => {
//       dropdown2.click();
//     });
//     const signoutDropdown = await screen.findAllByText("Kevin Rueda");
//     act(() => {
//       signoutDropdown[0].click();
//     });
//     const signoutButton = screen.getByTestId("sign-out-button");
//     console.log(signoutButton)
//     // console.log(signoutButton);
//     // console.log(addClubButton.children)
//     // expect the message to be rendered
//     act(() => {
//       signoutButton.click();
//     });
//     // console.log(spyer)
//     expect(signOut).toHaveBeenCalledTimes(1);
//     console.log('hi');
//     screen.debug(undefined, null, {});
//     expect(dropdownButton).toBeDefined();
//     // expect(signoutButton.textContent).toEqual(addNewClubMsg);
//   });

//   it("The whole form is rendered, with labels, after clicking Add New Club", () => {
//     const { wrapper } = render(
//         <ManageClubs user={user} data={userWithNoSubscriptionsData[0]}></ManageClubs>,
//         { wrapper: MemoryRouter }
//     );
//     // const addNewClubMsg = "Add New Club";

//     const addClubButton = screen.getByTestId("add-club-button");

//     act(() => {
//         addClubButton.click();
//     });

//     const modalTitle = "Create New Club";
//     const modalTitleElement = screen.queryByTestId("create-new-club-title");
//     expect(modalTitleElement).toBeDefined();
//     expect(modalTitleElement.textContent).toEqual(modalTitle);

//   });
// });


