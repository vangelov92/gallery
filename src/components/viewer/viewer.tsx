import { useDispatch, useSelector } from "react-redux";
import { IImageStore, next, prev } from "../../store/imageStore";
import Zoomer from "../zoomer/zoomer";
import "./viewer.scss";

export default function Viewer() {
    let dispatch = useDispatch();

    let state = useSelector<IImageStore, IImageStore>((state) => {
        return state;
    });

    return (
        <div data-component="Viewer">
            <button className="prev" title="Display previous image" disabled={state.images.length === 0 || state.pivot === 0} onClick={() => dispatch(prev())}></button>
            <div className="preview" data-images={state.images.length}>
                <Zoomer imageURL={state.images[state.pivot]?.base64} lensSize={state.lensSize} magnification={state.magnification} />
            </div>
            <button className="next" title="Display next image" disabled={state.images.length === 0 || state.pivot === state.images.length - 1} onClick={() => dispatch(next())}></button>
        </div>
    );
};