import React from "react";
import { useState, useEffect } from "react";
import "./Box.css";
import { DataGrid } from '@mui/x-data-grid';
import { db } from "../../firebase"
import { collection, getDocs } from  "firebase/firestore"


const Box = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState([]);

    const handleReload = () => {
      window.location.reload();
    };
  

  const columns = [
     { field: 'id', headerName: 'ID', width: 100 },
    { field: "name", headerName: "Username", width: 150 },
    { field: "value", headerName: "Bet", width: 100 },
    { field: "point", headerName: "Multiplier", width: 100 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const postsRef = collection(db, "posts");
      const querySnapshot = await getDocs(postsRef);
      const documents = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setData(documents);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Set the first link as active
    setActiveIndex(0);
  }, []);

  const handleLinkClick = (index) => {
    setActiveIndex(index);
  };
  return (
    <div>
      <div className="cont">
        <nav className="navbar">
          <ul>
            <li>
              <a
                href="#"
                className={activeIndex === 0 ? "active" : ""}
                onClick={() => handleLinkClick(0)}
              >
                All Bets
              </a>
            </li>
            <li>
              <a
                href="#"
                className={activeIndex === 1 ? "active" : ""}
                onClick={() => handleLinkClick(1)}
              >
                My Bets
              </a>
            </li>
            <li>
              <a
                href="#"
                className={activeIndex === 2 ? "active" : ""}
                onClick={() => handleLinkClick(2)}
              >
                Top
              </a>
            </li>
          </ul>
        </nav>
        <button onClick={handleReload} className="reload">Reload</button>
        <div className="container">
          <div className="card" style={{ backgroundColor: "black" }}>
            <div className="card-title"></div>
            <div className="card-body">
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={data}
                  columns={columns}
                  licenseKey=""
                  style={{ color: "#fff", backgroundColor: "#101010" }}
                  checkboxSelection
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Box;
