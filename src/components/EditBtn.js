import { gql, useMutation } from "@apollo/client";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { routes } from "../routes";

const DELETE_RECIPE_MUTATION = gql`
  mutation deleteRecipe($id: Int!) {
    deleteRecipe(id: $id) {
      ok
      error
    }
  }
`;

const Items = styled.div`
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 140px;
  right: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.mainColor};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;
  a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s;
  }
  &:hover a {
    transform: rotateZ(180deg) scale(2);
  }
  &:nth-child(4) {
    bottom: 80px;
    background-color: crimson;
    cursor: pointer;
  }
`;

export const EditBtn = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteRecipe, { loading }] = useMutation(DELETE_RECIPE_MUTATION);

  const handleDelete = () => {
    if (window.confirm("삭제 할래요?🤔")) {
      if (loading) {
        return;
      }
      deleteRecipe({
        variables: {
          id: +id,
        },
      });
      navigate(routes.home);
    }
  };

  return (
    <>
      <Items>
        <Link to={`/edit-recipe/${id}`}>
          <FontAwesomeIcon icon={faEdit} />
        </Link>
      </Items>
      <Items onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrash} />
      </Items>
    </>
  );
};
