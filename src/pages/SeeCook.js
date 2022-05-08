import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { HASHTAG_FRAGMENT, USER_FRAGMENT } from "../fragment";

const SEE_COOK_QUERY = gql`
  query seeCook($id: Int!) {
    seeCook(id: $id) {
      id
      user {
        ...UserFragment
      }
      cookName
      payload
      videoLink
      file
      hashtags {
        ...HashtagFragment
      }
      createdAt
    }
  }
  ${USER_FRAGMENT}
  ${HASHTAG_FRAGMENT}
`;

export const SeeCook = () => {
  const { id } = useParams();

  const { data, loading } = useQuery(SEE_COOK_QUERY, {
    variables: {
      id: +id,
    },
  });

  console.log(data);

  return <div>ShowRecipe</div>;
};
