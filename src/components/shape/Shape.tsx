import html2canvas from "html2canvas";
import Konva from "konva";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Arc,
  Circle,
  Ellipse,
  Group,
  Rect,
  RegularPolygon,
  Ring,
  Star,
} from "react-konva";
import { Html } from "react-konva-utils";
import { useDispatch } from "react-redux";
import { setCurrElemId, setIsOpen } from "../../store/serviceReducer";

interface IShapeProps {
  x: number;
  y: number;
  width?: number;
  height?: number;
  tool: string;
  id: string;
  text: string;
  stageRef: React.RefObject<Konva.Stage>;
  html: string;
  type: string;
  stroke?: string;
  fill?: string;
  radius?: number;
  radiusX?: number;
  radiusY?: number;
  innerRadius?: number;
  outerRadius?: number;
  numPoints?: number;
  angle?: number;
  sides?: number;
}

const Shape: React.FC<IShapeProps> = ({
  x,
  y,
  width,
  height,
  tool,
  id,
  text,
  type,
  ...props
}) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(text);

  const groupRef = useRef<Konva.Group | null>(null);
  const imageRef = useRef<Konva.Image | null>(null);

  const htmltext = document.getElementById(`htmltext_${id}`);

  const renderImage = useCallback(async () => {
    if (!htmltext) return;
    if (htmltext) {
      const innerhtml = htmltext.innerHTML;
      if (innerhtml) {
        const canvas = await html2canvas(htmltext, {
          backgroundColor: "rgba(0,0,0,0)",
        });

        const shape = new Konva.Image({
          x: 0,
          y: width ? width / 2 : 0,
          scaleX: 1 / window.devicePixelRatio,
          scaleY: 1 / window.devicePixelRatio,
          image: canvas,
        });
        groupRef.current?.add(shape);
        imageRef.current = shape;
      }
    }
  }, [id, width, height]);

  useEffect(() => {
    renderImage();
  }, []);

  const handleClick = () => {
    if (tool === "shape") {
      return;
    } else {
      setIsEditing((prev) => !prev);
      if (imageRef.current) {
        if (isEditing) {
          imageRef.current.show();
        } else {
          imageRef.current.hide();
        }
      }
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const toggleAccordion = () => {
    dispatch(setIsOpen());
    dispatch(setCurrElemId(id));
  };

  return (
    <>
      <Group x={x} y={y} onClick={handleClick} ref={groupRef} draggable>
        {type === "rect" && <Rect width={width} height={height} {...props} />}
        {type === "ring" && (
          <Ring
            innerRadius={props.innerRadius ? props.innerRadius : 0}
            outerRadius={props.outerRadius ? props.outerRadius : 70}
            {...props}
          />
        )}
        {type === "circle" && (
          <Circle radius={props.radius ? props.radius : 70} {...props} />
        )}
        {type === "ellipse" && (
          <Ellipse
            radiusX={props.radiusX ? props.radiusX : 0}
            radiusY={props.radiusY ? props.radiusY : 0}
            {...props}
          />
        )}
        {type === "star" && (
          <Star
            numPoints={props.numPoints ? props.numPoints : 5}
            innerRadius={props.innerRadius ? props.innerRadius : 0}
            outerRadius={props.outerRadius ? props.outerRadius : 70}
            {...props}
          />
        )}
        {type === "arc" && (
          <Arc
            numPoints={props.numPoints ? props.numPoints : 5}
            innerRadius={props.innerRadius ? props.innerRadius : 0}
            outerRadius={props.outerRadius ? props.outerRadius : 70}
            angle={props.angle ? props.angle : 0}
            {...props}
          />
        )}
        {type === "hexagon" && (
          <RegularPolygon
            radius={props.radius ? props.radius : 70}
            sides={props.sides ? props.sides : 7}
            {...props}
          />
        )}
        <Html>
          <p className={`shape__text shape__text-${id}`}>{value}</p>
        </Html>
        {isEditing && (
          <Html>
            <textarea
              value={value}
              onChange={handleInput}
              onClick={toggleAccordion}
            />
          </Html>
        )}
      </Group>
    </>
  );
};

export default Shape;
