import { useDispatch, useSelector } from "react-redux/es/exports";

import { activate, IImageStore, lensSize, magnification, remove } from "../../store/imageStore";
import Picker from "../picker/picker";

import "./browser.scss";

export default function Browser() {
    let dispatch = useDispatch();

    let state = useSelector<IImageStore, IImageStore>((state) => {
        return state;
    });

    const calcSize = (size: number) => {
        if (size > 1000) {
            if (size > 1000000) {
                return `${(size / 1000000).toFixed(2)} MB`
            } else {
                return `${(size / 1000).toFixed(2)} KB`
            }
        } else {
            return `${(size).toFixed(2)} bytes`
        }
    };

    const validate = (input: HTMLInputElement, min: number, max: number) => {
        let value = Number(input.value);

        if (isNaN(value)) {
            value = min;
        }

        value = Math.max(min, Math.min(value, max));
        input.value = String(value);

        return value;
    };

    return (
        <div data-component="Browser">
            <Picker />
            <div className="list">
            {
                state.images.map((image, index) => {
                    return <div className="image" title={image.name} data-active={state.pivot === index} key={index}>
                        <label onClick={
                            () => {
                                dispatch(activate(index));
                            }
                        }>{image.name} ({calcSize(image.size)})</label>
                        <button title="Delete" onClick={() => {
                            dispatch(remove(image));
                        }}></button>
                    </div>;
                })
            }
            </div>
            <div className="toolbar">
                <div className="row">
                    <label htmlFor="area">Magnification area size (in px):</label>
                    <input id="area" type="number" min="200" max="500" defaultValue={state.lensSize} onBlur={
                        (e) => {
                            dispatch(lensSize(validate(e.nativeEvent.target as HTMLInputElement, 200, 500)));
                        }
                    } onKeyUp={
                        (e) => {
                            if (e.key === "Enter") {
                                dispatch(lensSize(validate(e.nativeEvent.target as HTMLInputElement, 200, 500)));
                            }
                        }
                    } />
                </div>
                <div className="row">
                    <label htmlFor="factor">Magnification factor:</label>
                    <input id="factor" type="number" min="2" max="10" defaultValue={state.magnification} onBlur={
                        (e) => {
                            dispatch(magnification(validate(e.nativeEvent.target as HTMLInputElement, 2, 10)));
                        }
                    } onKeyUp={
                        (e) => {
                            if (e.key === "Enter") {
                                dispatch(magnification(validate(e.nativeEvent.target as HTMLInputElement, 2, 10)));
                            }
                        }
                    } />
                </div>
            </div>
        </div>
    );
};