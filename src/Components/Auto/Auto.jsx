import React, { useState } from "react";
import "./Auto.css";
import { ToastContainer, toast } from "react-toastify";
import { faMinusSquare, faPlusSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Auto = () => {
  const [flipped, setFlipped] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [value, setValue] = useState(1.0);
  const [sliderValue, setSliderValue] = useState(false);

  const handleSliderChange = () => {
    setSliderValue(!sliderValue);
  };

  const handleClick = () => {
    if (!isClicked) {
      setIsClicked(true);
    }
    setFlipped(!flipped);
    if (!flipped) {
      toast("Bet placed successfully");
    } else {
      toast("Cashout succesful");
    }
  };

  const handleIncrement = () => {
    setValue((prevValue) => parseFloat((prevValue + 0.01).toFixed(2)));
  };

  const handleDecrement = () => {
    if (value > 1.0) {
      setValue((prevValue) => parseFloat((prevValue - 0.01).toFixed(2)));
    }
  };

  const handleValueButton = (val) => {
    setValue(val);
  };

  return (
    <div className="auto">
      <div className="main">
        <button
          className={`flip-button ${flipped ? "flipped" : ""}`}
          onClick={handleClick}
        >
          <div className="flip-front">Bet</div>
          <div className="flip-back">Cashout</div>
        </button>
      </div>
      <ToastContainer />
      <div className="wrap">
        <FontAwesomeIcon
          className="inc"
          onClick={handleIncrement}
          style={{
            backgroundColor: "black",
            color: "#282828",
            fontSize: "22px",
            outline: "none",
          }}
          icon={faPlusSquare}
        />
        <div className="multiplier">{value.toFixed(2)}</div>

        <FontAwesomeIcon
          className="inc2"
          onClick={handleDecrement}
          style={{
            backgroundColor: "black",
            color: "#282828",
            fontSize: "22px",
            outline: "none",
            margin: "0px 5px",
          }}
          icon={faMinusSquare}
        />
      </div>
      <div className="buttonsauto">
        <button onClick={() => handleValueButton(1)} className="dollarauto">
          1$
        </button>
        <button onClick={() => handleValueButton(2)} className="dollarauto">
          2$
        </button>
        <br />
        <div className="third">
          <button className="dollarauto" onClick={() => handleValueButton(5)}>
            5$
          </button>
          <button onClick={() => handleValueButton(10)} className="dollarauto">
            10$
          </button>
        </div>
      </div>
      <hr style={{ borderTop: "2px solid black", margin: "3.8rem 0" }} />
      <button className="autoplay">AutoPlay</button>
      <div className="auca">
        <p>Auto Cashout</p>
        <label className="switch">
          <input
            type="checkbox"
            checked={sliderValue}
            onChange={handleSliderChange}
          />
          <span className="slider round"></span>
        </label>
        <input className="number" type="text" defaultValue="1.10"/>
        <FontAwesomeIcon
          className="cross"
          style={{
            backgroundColor: "black",
            fontSize: "10px",
            outline: "none",
            margin: "0px 5px",
          }}
          icon={faXmark}
        />

      </div>
    </div>
  );
};

export default Auto;
