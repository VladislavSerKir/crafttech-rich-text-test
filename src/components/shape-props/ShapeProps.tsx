import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ISelectedShape, IShapeProperties } from "../../interfaces";
import { setShape, setShapeType } from "../../store/serviceReducer";

interface IShapePropsProps {
  value: ISelectedShape;
  name: string;
}

const ShapeProps: React.FC<IShapePropsProps> = ({ value }) => {
  const dispatch = useDispatch();

  const allShapesProps: Record<string, IShapeProperties> = {
    rect: {
      stroke: "#000000",
      width: 100,
      height: 100,
    },
    ring: {
      stroke: "#000000",
      innerRadius: 90,
      outerRadius: 100,
      fill: "#ff0000",
      strokeWidth: 5,
    },
    circle: {
      stroke: "#000000",
      radius: 80,
      fill: "#ff0000",
      strokeWidth: 5,
    },
    ellipse: {
      radiusX: 80,
      radiusY: 50,
      fill: "#ff0000",
      strokeWidth: 5,
    },
    star: {
      numPoints: 5,
      innerRadius: 40,
      outerRadius: 80,
      fill: "#ff0000",
      stroke: "#000000",
      strokeWidth: 5,
    },
    arc: {
      innerRadius: 40,
      outerRadius: 80,
      fill: "#ff0000",
      stroke: "#000000",
      strokeWidth: 5,
      angle: 60,
      rotationDeg: -120,
    },
    hexagon: {
      sides: 7,
      radius: 70,
      fill: "#ff0000",
      stroke: "#000000",
      strokeWidth: 4,
    },
  };

  const [data, setData] = useState<IShapeProperties>(
    allShapesProps[value.value]
  );

  const handleChangeShape = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const newValue =
        name === "fill" || name === "stroke" ? value : Number(value);
      setData((prevState) => ({
        ...prevState,
        [name]: newValue,
      }));

      dispatch(setShape({ ...data, [name]: newValue }));
    },
    [dispatch, data]
  );

  useEffect(() => {
    const shapeProps = allShapesProps[value.value];
    setData(shapeProps);
    dispatch(setShape(shapeProps));
    dispatch(setShapeType(value.value));
  }, [value, dispatch]);

  return (
    <div className="shape-props__container">
      <div className="shape-props__form">
        {Object.entries(data).map(([key, val]) => (
          <div key={key} className="shape-props__input-group">
            <label
              htmlFor={key}
              className="shape-props__label shape-props__input-label"
            >
              {key}
            </label>
            {key === "fill" || key === "stroke" ? (
              <input
                id={key}
                name={key}
                type="color"
                value={val as string}
                onChange={handleChangeShape}
                className="shape-props__input"
              />
            ) : (
              <input
                id={key}
                name={key}
                type="number"
                value={val as number}
                onChange={handleChangeShape}
                className="shape-props__input"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShapeProps;
