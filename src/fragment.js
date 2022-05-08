import { gql } from "@apollo/client";

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    username
    nickName
  }
`;

export const HASHTAG_FRAGMENT = gql`
  fragment HashtagFragment on Hashtag {
    id
    hashtag
  }
`;
