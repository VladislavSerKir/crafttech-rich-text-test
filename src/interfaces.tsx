import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { rootReducer } from "./store";
import { Action, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { IFigure } from "./components/canvas/Canvas";

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedDispatch = () => useDispatch<AppThunkDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppThunkDispatch = ThunkDispatch<RootState, never, Action<string>>;

export interface ISelectedShape {
  label: string;
  value: string;
}

export interface GenericObject {
  [key: string]: string | number;
}

export interface IShapeProperties {
  stroke?: string;
  width?: number;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  fill?: string;
  strokeWidth?: number;
  radius?: number;
  radiusX?: number;
  radiusY?: number;
  numPoints?: number;
  color?: string;
  sizeText?: string;
  weight?: string;
  angle?: number;
  rotationDeg?: number;
  sides?: number;
}

export interface IServiceState {
  shapeProperties: IShapeProperties;
  shapeType: string;
  figures: IFigure[];
  isOpen: boolean;
  currElemId: string;
}

export interface IAllTextSettings {
  color: string;
  sizeText: string;
  weight: string;
}
