import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loggedInVar, logoutUser } from "../../apollo";
import { routes } from "../../routes";

const ME_QUERY = gql`
  query me {
    me {
      id
      username
      nickName
    }
  }
`;

export const useUser = () => {
  const navigate = useNavigate();
  const loggedIn = useReactiveVar(loggedInVar);

  const { data } = useQuery(ME_QUERY, {
    skip: !loggedIn,
  });

  useEffect(() => {
    if (data?.me === null) {
      navigate(routes.home);
      logoutUser();
    }
  }, [data, navigate]);

  return { data };
};
