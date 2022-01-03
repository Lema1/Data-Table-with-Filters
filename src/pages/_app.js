import Layout from "../components/Layout";
import "../styles/app.scss";

const MyApp = (props) => {
  const { Component, pageProps } = props;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
