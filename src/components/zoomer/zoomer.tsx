import React, { useEffect, useState } from "react";
import "./zoomer.scss";

export default function Zoomer(props: { imageURL: string, lensSize: number, magnification: number }) {
    const zoomer = React.createRef<HTMLDivElement>();
    const image = React.createRef<HTMLImageElement>();

    const [loading, setLoading] = useState(false);

    const [lensX, setLensX] = useState(0);
    const [lensY, setLensY] = useState(0);
    const [lensBgW, setLensBgW] = useState(0);
    const [lensBgH, setLensBgH] = useState(0);
    const [lensBgX, setLensBgX] = useState(0);
    const [lensBgY, setLensBgY] = useState(0);

    let timer = 0;

    useEffect(() => {
        setLoading(true);
    }, [props.imageURL]);

    return (
        <div ref={zoomer} data-loading={loading} data-component="Zoomer">
            <div
                className="lens"
                style={
                    {
                        width: props.lensSize,
                        height: props.lensSize,
                        backgroundImage: `url("${props.imageURL}")`,
                        left: lensX,
                        top: lensY,
                        backgroundSize: `${lensBgW}px ${lensBgH}px`,
                        backgroundPosition: `${lensBgX}px ${lensBgY}px`
                    }
                }
            ></div>
            <img
                ref={image}
                src={props.imageURL}
                onLoad={
                    () => {
                        setLoading(false);
                    }
                }
                onMouseEnter={
                    () => {
                        setLensBgW(image.current!.width * props.magnification);
                        setLensBgH(image.current!.height * props.magnification);
                    }
                }
                onMouseMove={
                    (event) => {
                        setLensX(image.current!.getBoundingClientRect().left + event.nativeEvent.offsetX + image.current!.getBoundingClientRect().left - zoomer.current!.getBoundingClientRect().left - props.lensSize / 2);
                        setLensY(image.current!.getBoundingClientRect().top + event.nativeEvent.offsetY + image.current!.getBoundingClientRect().top - zoomer.current!.getBoundingClientRect().top - props.lensSize / 2);
                        setLensBgX(-(event.nativeEvent.offsetX * props.magnification - props.lensSize / 2));
                        setLensBgY(-(event.nativeEvent.offsetY * props.magnification - props.lensSize / 2));
                    }
                }
            />
        </div>
    );
}