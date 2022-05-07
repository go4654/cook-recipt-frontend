import { Helmet } from "react-helmet-async";

export const PageTitle = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | Cook Recipe</title>
    </Helmet>
  );
};
