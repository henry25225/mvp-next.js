import "bootstrap/dist/css/bootstrap.min.css";
import { SWRConfig } from "swr";
import "../styles/global.css";
import request from "../utils/request";

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource) =>
          request.get(resource).then((response) => response.data.data),
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
