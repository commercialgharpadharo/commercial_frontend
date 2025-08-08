import React, { useCallback, useEffect, useRef, useState } from "react";
import "./multirangeslider.css";

type MultiRangeSliderProps = {
  min: number;
  max: number;
  onChange: (value: { min: number; max: number }) => void;
};

const MultiRangeSlider: React.FC<MultiRangeSliderProps> = ({
  min,
  max,
  onChange,
}) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const rangeRef = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (rangeRef.current) {
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (rangeRef.current) {
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // 🔄 Debounced change handler
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange({ min: minVal, max: maxVal });
    }, 50); // keep this small for responsiveness

    return () => clearTimeout(timeout);
  }, [minVal, maxVal, onChange]);

  return (
    <div className="w-full pb-5 relative">
      {/* Left Thumb */}
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(e) => {
          const value = Math.min(Number(e.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 100 ? 5 : undefined }}
      />

      {/* Right Thumb */}
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(e) => {
          const value = Math.max(Number(e.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className="thumb thumb--right"
      />

      {/* Slider Track */}
      <div className="slider">
        <div className="slider__track" />
        <div ref={rangeRef} className="slider__range" />
        <div className="slider__left-value">₹{minVal.toLocaleString()}</div>
        <div className="slider__right-value">₹{maxVal.toLocaleString()}</div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
