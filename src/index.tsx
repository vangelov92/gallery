import ReactDOM from "react-dom/client";
import { Provider } from "react-redux/es/exports";

import images from "./store/imageStore";
import Viewer from "./components/viewer/viewer";
import Browser from "./components/browser/browser";

import "./index.scss";

ReactDOM.createRoot(document.querySelector("#root")!).render(
	<Provider store={images}>
		<Viewer />
		<Browser />
	</Provider>
);