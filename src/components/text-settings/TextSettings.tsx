import React, { useCallback, useEffect, useState } from "react";
import { IAllTextSettings, useTypedSelector } from "../../interfaces";
import { useDispatch } from "react-redux";
import { setCurrElemText } from "../../store/serviceReducer";

const TextSettings: React.FC = () => {
  const dispatch = useDispatch();
  const currElemId = useTypedSelector((state) => state.service.currElemId);
  const figures = useTypedSelector((state) => state.service.figures);
  const currElem = figures.find((figure) => figure.id === currElemId);

  const allTextSettings: IAllTextSettings = {
    color: currElem?.color ? currElem.color : "#000000",
    sizeText: currElem?.sizeText ? currElem.sizeText : "24",
    weight: currElem?.weight ? currElem.weight : "300",
  };

  const [textSettings, setTextSettings] = useState(allTextSettings);

  useEffect(() => {
    if (currElem) {
      setTextSettings({
        color: currElem.color || allTextSettings.color,
        sizeText: currElem.sizeText || allTextSettings.sizeText,
        weight: currElem.weight || allTextSettings.weight,
      });
    }
  }, []);

  const handleChangeTextSettings = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setTextSettings((prevState: IAllTextSettings) => ({
        ...prevState,
        [name]: value,
      }));
      dispatch(
        setCurrElemText({
          id: currElemId,
          name,
          value,
        })
      );
    },
    [currElemId]
  );

  const shapeText = document.querySelector<HTMLElement>(
    `.shape__text-${currElemId}`
  );

  useEffect(() => {
    if (shapeText) {
      shapeText.style.color = textSettings.color;
      shapeText.style.fontSize = textSettings.sizeText + "px";
      shapeText.style.fontWeight = textSettings.weight;
    }
  }, [textSettings.color, textSettings.sizeText, textSettings.weight]);

  return (
    <div className="shape-props__container">
      <div className="shape-props__form">
        <div className="shape-props__input-group">
          <label htmlFor="color" className="shape-props__input-label">
            Цвет текста
          </label>
          <input
            name="color"
            type="color"
            value={textSettings.color}
            onChange={handleChangeTextSettings}
            className="shape-props__input"
          />
        </div>
        <div className="shape-props__input-group">
          <label htmlFor="sizeText" className="shape-props__input-label">
            Размер шрифта
          </label>
          <input
            name="sizeText"
            type="number"
            value={textSettings.sizeText}
            onChange={handleChangeTextSettings}
            className="shape-props__input"
          />
        </div>
        <div className="shape-props__input-group">
          <label className="shape-props__input-label">Жирность шрифта </label>
          {Array.from({ length: 9 }, (_, index) => {
            const weight = (index + 1) * 100;
            const weightLabel =
              weight === 100
                ? "Thin"
                : weight === 200
                ? "Extra Light"
                : weight === 300
                ? "Light"
                : weight === 400
                ? "Normal"
                : weight === 500
                ? "Medium"
                : weight === 600
                ? "Semi Bold"
                : weight === 700
                ? "Bold"
                : weight === 800
                ? "Extra Bold"
                : "Black";
            return (
              <div key={weight}>
                <input
                  type="radio"
                  id={`weight-${weight}`}
                  name="weight"
                  value={weight}
                  checked={textSettings.weight === String(weight)}
                  onChange={handleChangeTextSettings}
                />
                <label htmlFor={`weight-${weight}`}>{weightLabel}</label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TextSettings;
