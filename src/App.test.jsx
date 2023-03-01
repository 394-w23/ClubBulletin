import {describe, expect, test, it, vi } from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import { useProfile } from "./utilities/profile";
import { useDbData } from "./utilities/firebase";
import App from './App';

vi.mock('./utilities/profile');
const profile = {
  'uid': "yzr2CLCgskTUupMHfR2mcuFTffo1",
  'displayName': "Alex Feng",
  'email': "alexfeng2024@u.northwestern.edu",
  'photoURL': "https://lh3.googleusercontent.com/a/AEdFTp7x13g7CiRUW1yvgkc4dbC3v-4ae1KROf5ZWaEw=s96-c"  
}
const data = {
  "clubs": {
      "3b6f6485-cc38-486d-af03-c4ae032e0ad3": {
          "admins": [
              "",
              "HcYJNncMwQQbmnmYKWNln0FbqtG3",
              "yzr2CLCgskTUupMHfR2mcuFTffo1"
          ],
          "description": "test",
          "members": [
              "",
              "yzr2CLCgskTUupMHfR2mcuFTffo1",
              "jgWu9uNa5chPQ0oOVywxUuwzxpI2",
              "Sg4kJL09iTejpm9oP6Ih0biWOWt1",
              "8Z6IVm1xRgVHKOLJiK0gqj2WGJZ2",
              "v5m2nuuAq9TAUfDt87veYETfgnw1",
              "pC5DrFpxFcNQdFe5Q4ZRpN5ZN1u1",
              "IvEyS51SktZ7rHZBY1LDlQfcA963",
              "IuQspQhlilOjDASGQ8dki50HjhT2"
          ],
          "name": "test club",
          "picLink": "https://firebasestorage.googleapis.com/v0/b/clubbulletintest.appspot.com/o/files%2Fimage.jpeg?alt=media&token=ee92e144-3493-44fe-85aa-95d43daa85ab"
      },
      "4c00dad7-d996-488e-ad11-afbc8cc45759": {
          "admins": [
              "",
              "HcYJNncMwQQbmnmYKWNln0FbqtG3",
              "IuQspQhlilOjDASGQ8dki50HjhT2"
          ],
          "description": "e",
          "members": [
              "",
              "IuQspQhlilOjDASGQ8dki50HjhT2"
          ],
          "name": "test club w pic",
          "picLink": "https://firebasestorage.googleapis.com/v0/b/clubbulletintest.appspot.com/o/files%2FScreen%20Shot%202023-02-02%20at%208.13.34%20PM.png?alt=media&token=d4c37076-069e-41d8-95fa-a58764d97daa"
      },
      "4f5d00b9-cc7b-4584-a696-94766ef96066": {
          "admins": [
              "",
              "HcYJNncMwQQbmnmYKWNln0FbqtG3",
              "v5m2nuuAq9TAUfDt87veYETfgnw1"
          ],
          "description": "hello",
          "members": [
              "",
              "v5m2nuuAq9TAUfDt87veYETfgnw1",
              "pC5DrFpxFcNQdFe5Q4ZRpN5ZN1u1",
              "IvEyS51SktZ7rHZBY1LDlQfcA963"
          ],
          "name": "random club",
          "picLink": "default"
      },
      "dbace733-9679-4003-a0e8-e03dfe96916b": {
          "admins": [
              "",
              "HcYJNncMwQQbmnmYKWNln0FbqtG3",
              "Sg4kJL09iTejpm9oP6Ih0biWOWt1"
          ],
          "description": "testing edit/delete",
          "members": [
              "",
              "Sg4kJL09iTejpm9oP6Ih0biWOWt1",
              "IvEyS51SktZ7rHZBY1LDlQfcA963"
          ],
          "name": "test club 2",
          "picLink": "default"
      }
  },
  "posts": {
      "5867e826-edf9-43d0-a883-4b09366c6a16": {
          "clubId": "dbace733-9679-4003-a0e8-e03dfe96916b",
          "content": "test post 1 lolol",
          "likeCount": 0,
          "posted": "1674516539622",
          "title": "test post 1"
      },
      "7576fa00-fb40-4446-8307-7f65200e62fd": {
          "clubId": "4f5d00b9-cc7b-4584-a696-94766ef96066",
          "content": "XDDDD",
          "likeCount": 0,
          "posted": "1674784089992",
          "title": "xd"
      },
      "93c4c898-8e23-4db2-8943-bf8aff2225e2": {
          "clubId": "4c00dad7-d996-488e-ad11-afbc8cc45759",
          "content": "hi",
          "likeCount": 0,
          "posted": "1675391518034",
          "title": "hi"
      },
      "a0a53e8d-a71c-490d-be31-fe1bf6420e6b": {
          "clubId": "3b6f6485-cc38-486d-af03-c4ae032e0ad3",
          "content": "test post",
          "likeCount": 1,
          "posted": "1674415767768",
          "title": "test post"
      }
  },
  "users": {
      "8Z6IVm1xRgVHKOLJiK0gqj2WGJZ2": {
          "clubs": [
              "",
              "3b6f6485-cc38-486d-af03-c4ae032e0ad3"
          ],
          "name": "Maya Blumovitz"
      },
      "IuQspQhlilOjDASGQ8dki50HjhT2": {
          "clubs": [
              "",
              "4c00dad7-d996-488e-ad11-afbc8cc45759",
              "3b6f6485-cc38-486d-af03-c4ae032e0ad3"
          ],
          "name": "Kevin Rueda"
      },
      "IvEyS51SktZ7rHZBY1LDlQfcA963": {
          "clubs": [
              "",
              "3b6f6485-cc38-486d-af03-c4ae032e0ad3",
              "dbace733-9679-4003-a0e8-e03dfe96916b",
              "4f5d00b9-cc7b-4584-a696-94766ef96066"
          ],
          "name": "Chris"
      },
      "R5gcgCHJZpaJH7zAuTMj58QwBGz2": {
          "clubs": [
              ""
          ],
          "name": "Yuming Wang"
      },
      "Sg4kJL09iTejpm9oP6Ih0biWOWt1": {
          "clubs": [
              "",
              "3b6f6485-cc38-486d-af03-c4ae032e0ad3",
              "dbace733-9679-4003-a0e8-e03dfe96916b"
          ],
          "name": "Nicholas Tsung"
      },
      "jgWu9uNa5chPQ0oOVywxUuwzxpI2": {
          "clubs": [
              "",
              "3b6f6485-cc38-486d-af03-c4ae032e0ad3"
          ],
          "name": "Root Admin"
      },
      "pC5DrFpxFcNQdFe5Q4ZRpN5ZN1u1": {
          "clubs": [
              "",
              "3b6f6485-cc38-486d-af03-c4ae032e0ad3",
              "4f5d00b9-cc7b-4584-a696-94766ef96066"
          ],
          "name": "Zarif Ceaser"
      },
      "v5m2nuuAq9TAUfDt87veYETfgnw1": {
          "clubs": [
              "",
              "4f5d00b9-cc7b-4584-a696-94766ef96066",
              "3b6f6485-cc38-486d-af03-c4ae032e0ad3"
          ],
          "name": "Nathan Wang"
      },
      "yzr2CLCgskTUupMHfR2mcuFTffo1": {
          "clubs": [
              "",
              "3b6f6485-cc38-486d-af03-c4ae032e0ad3"
          ],
          "name": "Alex Feng"
      }
  }
}

describe('no user is logged in', () => {
  it('shows the login page', async () => {
    render(<App />);
    await screen.findByText('Sign in to view posts and subscribe to clubs.');
  });
});


// describe('mock user is logged in', () => {
//   useProfile.mockReturnValue([profile]);
//   render(<App />);

//   it('loads your feed', async () => {
//     await screen.findByText('Your Feed');
//     // const manageClubsButton = screen.getByText('Manage');
//     // fireEvent.click(manageClubsButton);
//     // expect(await screen.findByText('Manage Clubs')).toBeDefined();
//   });
//   it('loads your first club', async () => {
//     await screen.findByText('Test Club');
//   });

// });

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