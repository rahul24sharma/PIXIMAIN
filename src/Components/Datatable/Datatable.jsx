import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { DataGrid } from '@mui/x-data-grid';
import './Datatable.css'
const Datatable = () => {
  const [data,dataChange] = useState([])
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  
  
  const columns = [
     { field: 'id', headerName: 'ID', width: 100 },
     { field: 'name', headerName: 'Username', width: 250 },
     { field: 'value', headerName: 'First Bet', width: 200 },
     { field: 'value2', headerName: 'Second Bet', width: 200 },
     { field: 'point', headerName: 'Multiplier', width: 200 },
     { field: 'cash', headerName: 'Cashout', width: 200 },
     { field: 'cash2', headerName: 'Cashout2', width: 200 },
   ];

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }
  useEffect(()=>{
    fetch("http://localhost:8000/posts").then((res)=>{
      return res.json()
    }).then((resp)=>{
      dataChange(resp)
    }).catch((err)=>{
      console.log(err.message)
    })
  },[])

  
  return (
    <>
    {values.map((v, idx) => (
      <button style={{position:'absolute',borderRadius:'8px',marginTop:'-37px',color:'black' ,margin:"-38px 65px", backgroundColor:'#6c757d' ,border:'1px #fff'}} key={idx} className="results" onClick={() => handleShow(v)}>
        Results
        {typeof v === 'string' && `below ${v.split('-')[0]}`}
      </button>
    ))}
    <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title ></Modal.Title>
      </Modal.Header >
      <Modal.Body>
                <div className="card-body">
                    <div style={{ height: 700, width: '100%'}}>
                
      <DataGrid
        rows={data}
        columns={columns}
        style={{color:'black',backgroundColor:'white'}}
        checkboxSelection
      />
    </div>
                </div>
      </Modal.Body>
    </Modal>
  </>
);
}




export default Datatable;
