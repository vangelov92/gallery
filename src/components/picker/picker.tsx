import { useDispatch } from "react-redux/es/exports";
import { IImage, load } from "../../store/imageStore";
import "./picker.scss";

export default function Picker() {
    let dispatch = useDispatch();

    return (
        <div data-component="Picker">
            <div className="overlay">Upload images</div>
            <input type="file" accept="image/*" multiple onChange={
                async (e) => {
                    let promises = Array.from(e.target.files || []).map((file) => {
                        return new Promise<IImage>((resolve) => {
                            let reader = new FileReader();
                        
                            reader.onload = () => {
                                resolve({
                                    name: file.name,
                                    size: file.size,
                                    type: file.type,
                                    base64: reader.result?.toString() || ""
                                });
                            };
                        
                            reader.readAsDataURL(file);
                        });
                    });


                    dispatch(load(await Promise.all(promises)));
                }
            }/>
        </div>
    );
};