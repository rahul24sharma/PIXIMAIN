import React, { useState, useEffect } from "react";
import "./Controls.css";
import { faMinusSquare, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { point } from "../Canvas/Canvas";
import Datatable from "../Datatable/Datatable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import Auto from "../Auto/Auto";

const Control = () => {
  const [value, setValue] = useState(1.0);
  const [value2, setValue2] = useState(1.0);
  const [show, setShow] = useState(true);
  const [flipped, setFlipped] = useState(false);
  const [fliped, setFliped] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [number, setNumber] = useState(1.0);
  const [number2, setNumber2] = useState(1.0);

  const cash = number.toFixed(2);
  const cash2 = number2.toFixed(2);

  const [isClicked, setIsClicked] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      const intervalId = setInterval(() => {
        setNumber((prevNumber) => {
          const newNumber = prevNumber + 0.01;
          if (newNumber >= point) {
            clearInterval(intervalId);
            return point;
          }
          return newNumber;
        });
      }, 100);

      return () => clearInterval(intervalId);
    }, 6000);

    return () => clearTimeout(timerId);
  }, []);

  useEffect(() => {
    const timerId2 = setTimeout(() => {
      const intervalId2 = setInterval(() => {
        setNumber2((prevNumber2) => {
          const newNumber2 = prevNumber2 + 0.01;
          if (newNumber2 >= point) {
            clearInterval(intervalId2);
            return point;
          }
          return newNumber2;
        });
      }, 100);

      return () => clearInterval(intervalId2);
    }, 6000);

    return () => clearTimeout(timerId2);
  }, []);

  const handleIncrement = () => {
    setValue((prevValue) => parseFloat((prevValue + 0.01).toFixed(2)));
  };

  const handleDecrement = () => {
    if (value > 1.0) {
      setValue((prevValue) => parseFloat((prevValue - 0.01).toFixed(2)));
    }
  };

  const handleIncrement2 = () => {
    setValue2((prevValue) => parseFloat((prevValue + 0.01).toFixed(2)));
  };

  const handleDecrement2 = () => {
    if (value > 1.0) {
      setValue2((prevValue) => parseFloat((prevValue - 0.01).toFixed(2)));
    }
  };
  const handleValueButton = (val) => {
    setValue(val);
  };
  const handleValueButton2 = (val) => {
    setValue2(val);
  };

  const handleClick = () => {
    if (!isClicked) {
      setCount1(count1 + 1);
      setIsClicked(true);
    }
    setFlipped(!flipped);
    if (!flipped) {
      toast("Bet placed successfully");
    } else {
      toast("Cashout succesful");
    }
  };

  const clicked = () => {
    if (!isClicked2) {
      setCount2(count2 + 1);
      setIsClicked2(true);
    }
    setFliped(!fliped);
    if (!fliped) {
      toast("Bet placed successfully");
    } else {
      toast("Cashout succesful");
    }
  };

  const handleToggleChange = () => {
    setToggle(!toggle);
  };
  const handleToggleChange2 = () => {
    setToggle2(!toggle2);
  };

  const [name, nameChange] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, value, value2, point, cash, cash2 };

    try {
      const postsRef = collection(db, "posts");
      const q = query(
        postsRef,
        where("name", "==", name),
        where("value", "==", value),
        where("value2", "==", value2),
        where("point", "==", point)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length > 0) {
        const existingData = querySnapshot.docs[0];
        await updateDoc(existingData.ref, {
          cash,
          cash2,
        });
        console.log("Data updated successfully");
      } else {
        await addDoc(postsRef, {
          ...data,
          timestamp: serverTimestamp(),
        });
        console.log("Data saved successfully");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="b1">
      <div className="con">
        <div className="box">
          <FontAwesomeIcon
            className="plus"
            onClick={() => setShow(!show)}
            style={{
              color: "black",
              fontSize: "23px",
              position: "absolute",
              marginLeft: "370px",
              marginTop: "10px",
            }}
            icon={faPlusSquare}
          />
          <div>
            <div className="toggle-container" onClick={handleToggleChange}>
              <div className={`toggle-btn ${!toggle ? "disable" : ""}`}>
                {toggle ? "Auto" : "Bet"}
              </div>
            </div>
            {toggle ? (
              <div className="auto-container">
                <Auto />
              </div>
            ) : (
              <div className="bet-container">
                <form onSubmit={handleSubmit}>
                  <div className="betxx">
                    <button
                      className={`flip-button ${flipped ? "flipped" : ""}`}
                      onClick={handleClick}
                    >
                      <div className="flip-front">Bet</div>
                      <div className="flip-back">
                        Cashout
                        <br />
                        {cash + "x"}
                      </div>
                    </button>
                  </div>
                  <ToastContainer />
                  <div className="wrapper">
                    <div className="multiplier">{value.toFixed(2)}</div>
                    <FontAwesomeIcon
                      className="inc"
                      onClick={handleIncrement}
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        fontSize: "23px",
                        outline: "none",
                      }}
                      icon={faPlusSquare}
                    />
                    <FontAwesomeIcon
                      className="inc2"
                      onClick={handleDecrement}
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        fontSize: "23px",
                        outline: "none",
                        margin: "0px 5px",
                      }}
                      icon={faMinusSquare}
                    />
                  </div>
                </form>
                <div className="buttons">
                  <button
                    onClick={() => handleValueButton(1)}
                    className="dollar"
                  >
                    1$
                  </button>
                  <button
                    onClick={() => handleValueButton(2)}
                    className="dollar"
                  >
                    2$
                  </button>
                  <br />
                  <div className="third">
                    <button
                      className="dollar"
                      onClick={() => handleValueButton(5)}
                    >
                      5$
                    </button>
                    <button
                      onClick={() => handleValueButton(10)}
                      className="dollar"
                    >
                      10$
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {show && (
          <div className="box" id="box2">
            <FontAwesomeIcon
              className="plus"
              onClick={() => setShow(!show)}
              style={{
                color: "black",
                fontSize: "23px",
                position: "absolute",
                marginLeft: "370px",
                marginTop: "10px",
              }}
              icon={faMinusSquare}
            />
            <div>
              <div className="toggle-container2" onClick={handleToggleChange2}>
                <div className={`toggle-btn2 ${!toggle2 ? "disable2" : ""}`}>
                  {toggle2 ? "Auto" : "Bet"}
                </div>
              </div>
              {toggle2 ? (
                <div className="auto-container">
                  <Auto />
                </div>
              ) : (
                <div className="bet-container">
                  <form onSubmit={handleSubmit}>
                    <div className="betx">
                      <button
                        style={{ borderRadius: "5px", marginTop: "-10px" }}
                        className={`flip-button ${fliped ? "fliped" : ""}`}
                        onClick={clicked}
                      >
                        <div className="flip-front">Bet</div>
                        <div
                          style={{ borderRadius: "5px" }}
                          className="flip-back"
                        >
                          Cashout <br />
                          {cash2 + "x"}
                        </div>
                      </button>
                    </div>
                    <ToastContainer />
                    <div className="wrapper">
                      <div className="multiplier">{value2.toFixed(2)}</div>
                      <FontAwesomeIcon
                        className="inc"
                        onClick={handleIncrement2}
                        style={{
                          backgroundColor: "black",
                          color: "white",
                          fontSize: "23px",
                          outline: "none",
                        }}
                        icon={faPlusSquare}
                      />
                      <FontAwesomeIcon
                        className="inc"
                        onClick={handleDecrement2}
                        style={{
                          backgroundColor: "black",
                          color: "white",
                          fontSize: "23px",
                          margin: "0px 5px",
                          outline: "none",
                        }}
                        icon={faMinusSquare}
                      />
                    </div>
                  </form>
                  <div className="buttons">
                    <button
                      onClick={() => handleValueButton2(1)}
                      variant="secondary"
                      className="dollar"
                      size="sm"
                    >
                      1$
                    </button>
                    <button
                      onClick={() => handleValueButton2(2)}
                      variant="secondary"
                      className="dollar"
                      size="sm"
                    >
                      2$
                    </button>
                    <br />
                    <div className="third">
                      <button
                        onClick={() => handleValueButton2(5)}
                        className="dollar"
                      >
                        5$
                      </button>
                      <button
                        onClick={() => handleValueButton2(10)}
                        className="dollar"
                      >
                        10$
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="formitems">
        <div className="bets">
          <p className="bet">
            Total Bets :{" "}
            <span style={{ color: "#00ced1" }}>{count1 + count2}</span>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="col-md-10">
            <input
              className="form-control"
              type="text"
              name="name"
              value={name}
              onChange={(e) => nameChange(e.target.value)}
              placeholder="Username"
            />
          </div>
          <div className="form-button">
            <button className="play" id="submit" type="submit">
              Play
            </button>
          </div>
        </form>
        <div className="datatable">
          <Datatable />
        </div>
      </div>
    </div>
  );
};

export default Control;
