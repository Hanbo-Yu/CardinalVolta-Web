// Used only at build time. No server is needed after deployment.
import { renderToString } from "react-dom/server";
import App from "./App.jsx";

export const render = () => renderToString(<App />);
