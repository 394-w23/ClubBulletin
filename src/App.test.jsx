import {describe, expect, test, it, vi } from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import { useProfile } from "./utilities/profile";
import { useDbData } from "./utilities/firebase";
import App from './App';

// vi.mock('./utilities/firebase');

const profile = [
  {
      "user": {
          "uid": "yzr2CLCgskTUupMHfR2mcuFTffo1",
          "email": "alexfeng2024@u.northwestern.edu",
          "emailVerified": true,
          "displayName": "Alex Feng",
          "isAnonymous": false,
          "photoURL": "https://lh3.googleusercontent.com/a/AEdFTp7x13g7CiRUW1yvgkc4dbC3v-4ae1KROf5ZWaEw=s96-c",
          "providerData": [
              {
                  "providerId": "google.com",
                  "uid": "104770163327567357965",
                  "displayName": "Alex Feng",
                  "email": "alexfeng2024@u.northwestern.edu",
                  "phoneNumber": null,
                  "photoURL": "https://lh3.googleusercontent.com/a/AGNmyxbtO_hzu5ldQJN-xW-u8cRHUnpN_hd6IfXKrq8R=s96-c"
              }
          ],
          "stsTokenManager": {
              "refreshToken": "APJWN8fBib4P_VnMv8X4qPT54VPRRkcbGV810vslSlDpaDT1Oss--x8RPQx8EpnmGgO0ctgshZN0hkM-IBRFmDXdMSJ4auKWpfm6yk19E-QAJMPZBQThqsXv-Mffyr3duLWQo8gQ-sAEyVoRMljnsohtPaEfR0lnxhR_k8hmZy3Wayso8E-PkztIsXEVhzKOuMhOVJtTK70hfEjDS1uZ6r9lvUDliQfZccTu6ZK0_9Tlvhb6KdxJrc-8i4r96e7E8sWyTpsY52F_CDsix5z83SDN2IKihCVN4qLg0iHizuE7SxpjbidfTOtgUJqXFtIcRcA7K69gCBQJpkVrNc5DxguLJOf2B6BIsWCLbtZeN8ndxxHIJE1hyAqeqmuY3noK7xYgUTTQ_UQNlKgGHYQZDor1dUmDun5BykCH6Js5NCkIqTDdvysuRxA",
              "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImY4NzZiNzIxNDAwYmZhZmEyOWQ0MTFmZTYwODE2YmRhZWMyM2IzODIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQWxleCBGZW5nIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FFZEZUcDd4MTNnN0NpUlVXMXl2Z2tjNGRiQzN2LTRhZTFLUk9mNVpXYUV3PXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2NsdWJidWxsZXRpbnRlc3QiLCJhdWQiOiJjbHViYnVsbGV0aW50ZXN0IiwiYXV0aF90aW1lIjoxNjc3NTM4MTEzLCJ1c2VyX2lkIjoieXpyMkNMQ2dza1RVdXBNSGZSMm1jdUZUZmZvMSIsInN1YiI6Inl6cjJDTENnc2tUVXVwTUhmUjJtY3VGVGZmbzEiLCJpYXQiOjE2Nzc3MDkzNzUsImV4cCI6MTY3NzcxMjk3NSwiZW1haWwiOiJhbGV4ZmVuZzIwMjRAdS5ub3J0aHdlc3Rlcm4uZWR1IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDQ3NzAxNjMzMjc1NjczNTc5NjUiXSwiZW1haWwiOlsiYWxleGZlbmcyMDI0QHUubm9ydGh3ZXN0ZXJuLmVkdSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.QLFK2wpdkBHh1xobpyudtT38UpRDAmJ8Oq7sKw7Iq9rPublqjeAKcDhrbxkRVAR0IvLOLAIVyHLh8Jf9ft9veGh3u9fpHWHdZWVP9-yDCckWjyPNm5jFNdgreXFH6VQHiIIiE4Nmq0SWc-uJEdzS-bhcBTH74W4SamvorlATVvpJgqxPG5bgfWDplIm0BWDG-AFtR4rneJgxQjhYvhuA_t7IV2rToi56tfVFA70_vUVySOb7CXoRNngShbyBcfnYwvx6vR9e4aVYo7LDngnMX9HUkL2DzeZMnzxIvugfBwk4mxtm8oRI_FeHvWCLHFBA3zQshj_IC-UGlfZpmkHPHA",
              "expirationTime": 1677712976012
          },
          "createdAt": "1674415690122",
          "lastLoginAt": "1677538113048",
          "apiKey": "AIzaSyDMwPuqe10GRZZBNPBUpcj2v_vTB5L61fs",
          "appName": "[DEFAULT]"
      },
      "isAdmin": null
  },
  null,
  null
]
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
    await screen.findByText(/Sign in to view posts and subscribe to clubs/);
  });
});


describe('mock user is logged in', () => {
  vi.mock('./utilities/profile');
  useProfile.mockReturnValue([profile]);
  render(<App />);

  it('loads your feed', async () => {    
    await screen.findByText(/Your Feed/);
    // await screen.findByText(/Sign in to view posts and subscribe to clubs./);
    // const manageClubsButton = screen.getByText('Manage');
    // fireEvent.click(manageClubsButton);
    // expect(await screen.findByText('Manage Clubs')).toBeDefined();
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