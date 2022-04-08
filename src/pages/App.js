import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../Layout";
import UrlForm from "../components/UrlForm";
import UserDataTable from "../components/UserDataTable";
import "../utilities/auth";

const App = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const token = global.auth.getToken();
    if (!token) {
      history.push("/users/signin");
    }
  }, []);

  return (
    <Layout>
      <UrlForm setIsLoading={setIsLoading} isLoading={isLoading} />
      <UserDataTable setIsLoading={setIsLoading} isLoading={isLoading} />
    </Layout>
  );
};

export default App;
