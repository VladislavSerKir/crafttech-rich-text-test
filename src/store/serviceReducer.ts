import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IServiceState, IShapeProperties } from "../interfaces";
import { IFigure } from "../components/canvas/Canvas";

const initialShapeProperties: IShapeProperties = {};

const serviceState: IServiceState = {
  shapeProperties: initialShapeProperties,
  shapeType: "rect",
  figures: [],
  isOpen: false,
  currElemId: "",
};

export const serviceSlice = createSlice({
  name: "service",
  initialState: serviceState,
  reducers: {
    setShape: (state, action: PayloadAction<IShapeProperties>) => {
      state.shapeProperties = action.payload;
    },
    setShapeType: (state, action: PayloadAction<string>) => {
      state.shapeType = action.payload;
    },
    setAllFigures: (state, action: PayloadAction<IFigure>) => {
      state.figures = [...state.figures, action.payload];
    },
    addFigure: (state, action: PayloadAction<IFigure>) => {
      state.figures.push(action.payload);
    },
    setIsOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
    setCurrElemId: (state, action: PayloadAction<string>) => {
      state.currElemId = action.payload;
    },
    setCurrElemText: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        value: string;
      }>
    ) => {
      const { id, name, value } = action.payload;
      const figure = state.figures.filter((figure) => figure.id === id);
      if (figure && name === "color") {
        figure[0].color = value;
      }
      if (figure && name === "sizeText") {
        figure[0].sizeText = value;
      }
      if (figure && name === "weight") {
        figure[0].weight = value;
      }
      if (figure) {
        state.figures = [
          ...state.figures.filter((f) => f.id !== id),
          { ...figure[0] },
        ];
      }
    },
  },
});

export const {
  setShape,
  setShapeType,
  setAllFigures,
  addFigure,
  setIsOpen,
  setCurrElemId,
  setCurrElemText,
} = serviceSlice.actions;

export const serviceReducer = serviceSlice.reducer;
