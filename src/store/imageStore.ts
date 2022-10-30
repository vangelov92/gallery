import { configureStore, createSlice } from "@reduxjs/toolkit";

export interface IImage {
    name: string;
    size: number;
    type: string;
    base64: string;
};

export interface IImageStore {
    images: IImage[];
    pivot: number;
    magnification: number;
    lensSize: number;
};

const slice = createSlice({
    name: "images",
    initialState: {
        images: [],
        pivot: 0,
        magnification: 2,
        lensSize: 200
    } as IImageStore,
    reducers: {
        load: (state, action) => {
            state.images = action.payload;
            state.pivot = 0;
        },
        prev: (state) => {
            state.pivot = Math.max(0, state.pivot - 1);
        },
        next: (state) => {
            state.pivot = Math.min(state.images.length - 1, state.pivot + 1);
        },
        activate: (state, action) => {
            state.pivot = action.payload;
        },
        remove: (state, action) => {
            let images = state.images.map((image) => {
                return {
                    name: image.name,
                    size: image.size,
                    type: image.type,
                    base64: image.base64
                }
            });

            let index = images.findIndex((image) => {
                return image.name === action.payload.name && image.type === action.payload.type;
            });

            if (index !== -1) {
                images.splice(index, 1);
                state.images = images;
                state.pivot = Math.max(0, Math.min(state.pivot, state.images.length - 1));
            }
        },
        magnification: (state, action) => {
            state.magnification = action.payload;
        },
        lensSize: (state, action) => {
            state.lensSize = action.payload;
        }
    }
});

export const { load, prev, next, lensSize, magnification, activate, remove } = slice.actions;

const imageStore = configureStore({
    reducer: slice.reducer
});

export default imageStore;