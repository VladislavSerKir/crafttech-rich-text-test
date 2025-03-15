import React, { RefObject } from "react";
import { Layer, Stage } from "react-konva";
import Shape from "../shape/Shape";
import { useTypedSelector, useTypedDispatch } from "../../interfaces";
import { IShapeProperties } from "../../interfaces";
import Konva from "konva";
import { addFigure } from "../../store/serviceReducer";

interface ICanvasProps {
  tool: string;
  stageRef: RefObject<Konva.Stage>;
}

export interface IFigure extends IShapeProperties {
  id: string;
  x: number;
  y: number;
  html: string;
  text: string;
  type: string;
}

const Canvas: React.FC<ICanvasProps> = ({ tool, stageRef }) => {
  const dispatch = useTypedDispatch();
  const figures = useTypedSelector((state) => state.service.figures);

  const shapeProperties = useTypedSelector(
    (state) => state.service.shapeProperties
  );
  const shapeType = useTypedSelector((state) => state.service.shapeType);

  const handleOnClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (tool === "cursor") return;
    const stage = e.target.getStage();
    if (!stage) return;

    const stageOffset = stage.absolutePosition();
    const point = stage.getPointerPosition();
    if (!point) return;

    const newFigure: IFigure = {
      id: String(Math.floor(Math.random() * 1000000)),
      type: shapeType,
      ...shapeProperties,
      x: point.x - stageOffset.x,
      y: point.y - stageOffset.y,
      html: "",
      text: "",
    };

    dispatch(addFigure(newFigure));
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      draggable={tool === "cursor"}
      onClick={handleOnClick}
      ref={stageRef}
    >
      <Layer>
        {figures.map((figure) => (
          <Shape
            key={figure.id}
            {...figure}
            type={figure.type}
            stageRef={stageRef}
            tool={tool}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default Canvas;
