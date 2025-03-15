import { useCallback, useState } from "react";
import Select from "react-select";
import { ISelectedShape, useTypedSelector } from "../../interfaces";
import ShapeProps from "../shape-props/ShapeProps";
import TextSettings from "../text-settings/TextSettings";

interface IControlProps {
  tool: string;
  setTool: (tool: string) => void;
}

const Control: React.FC<IControlProps> = ({ tool, setTool }) => {
  const isOpen = useTypedSelector((state) => state.service.isOpen);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTool(e.target.value);
  };

  const shapeOptions = [
    { label: "Квадрат", value: "rect" },
    { label: "Кольцо", value: "ring" },
    { label: "Круг", value: "circle" },
    { label: "Эллипс", value: "ellipse" },
    { label: "Звезда", value: "star" },
    { label: "Арка", value: "arc" },
    { label: "Полигон", value: "hexagon" },
  ];

  const [selectedShape, setSelectedShape] = useState<ISelectedShape>({
    label: "Квадрат",
    value: "rect",
  });

  const handleChangeShape = useCallback(
    (selectedOption: ISelectedShape | null) => {
      if (selectedOption) {
        setSelectedShape(selectedOption);
      }
    },
    []
  );

  return (
    <div style={{ position: "absolute", top: 0 }} className="control">
      <div>
        <input
          type="radio"
          id="cursor"
          name="control"
          value="cursor"
          checked={tool === "cursor"}
          onChange={handleOnChange}
        />
        <label htmlFor="cursor" className="control__label-action">
          Взаимодействие
        </label>
      </div>

      <div>
        <input
          type="radio"
          id="shape"
          name="control"
          value="shape"
          checked={tool === "shape"}
          onChange={handleOnChange}
        />
        <label htmlFor="shape" className="control__label-action">
          Добавление
        </label>
      </div>

      <div>
        <label htmlFor="shapes" className="control__label">
          Формы
        </label>
        <Select
          options={shapeOptions}
          onChange={handleChangeShape}
          value={selectedShape}
          name="shapes"
        />
      </div>
      <div>
        <label htmlFor="props" className="control__label">
          Свойства фигуры
        </label>
        <ShapeProps value={selectedShape} name="props" />
      </div>
      {isOpen && (
        <>
          <label htmlFor="text" className="control__label">
            Свойства текста
          </label>
          <TextSettings />
        </>
      )}
    </div>
  );
};

export default Control;
