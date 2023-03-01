import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import moment from "moment/moment"

const Bill = () => {

    const [bill, setBill] = useState({ number: "", name: "", date: "", type: "", itemname: "", qty: "", rate: "", amt: "" })
    const [allBill, setAllBill] = useState([]);
    const [isEdit, setIsEdit] = useState(false)

    const ref = useRef(null)
    const refclose = useRef(null)

    const handleChange = (e) => {
        setBill({ ...bill, [e.target.name]: e.target.value })
    }

    const saveData = (e) => {
        if (isEdit) {
            let update = (JSON.parse(localStorage.getItem('billData')))

            for (let index = 0; index < update.length; index++) {
                if (index === bill.index) {
                    update[index].number = bill.number;
                    update[index].name = bill.name;
                    update[index].date = bill.date;
                    update[index].type = bill.type;
                    update[index].itemname = bill.itemname;
                    update[index].qty = bill.qty;
                    update[index].rate = bill.rate;
                    update[index].amt = bill.amt;
                }
                localStorage.setItem('billData', JSON.stringify(update));
                setAllBill(update)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Your bill has been updated',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  
            }
        } else {
            setBill({ number: "", name: "", date: "", type: "", itemname: "", qty: "", rate: "", amt: "" })
            let billDetails = [...allBill, bill]
            setAllBill(billDetails)
            localStorage.setItem('billData', JSON.stringify(billDetails))
            console.log(billDetails);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your bill has been saved',
                showConfirmButton: false,
                timer: 1500
              })
              
        }
        refclose.current.click()
    }

    const addData = () => {
        ref.current.click();
        setBill({ number: "", name: "", date: "", type: "", itemname: "", qty: "", rate: "", amt: "" })
        setIsEdit(false);
    }

    const updateData =(currentValue,index)=>{
        ref.current.click();
         setBill({index,number:currentValue.number , name:currentValue.name , date:currentValue.date , type:currentValue.type , itemname:currentValue.itemname , qty:currentValue.qty , rate:currentValue.rate , amt:currentValue.amt })
         setIsEdit(true)
    }

    const deleteData = (index) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                allBill.splice(index, 1)
                localStorage.setItem('billData', JSON.stringify(allBill));
                setAllBill(JSON.parse(localStorage.getItem('billData')))        
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
          

    }

    const getData = () =>{
        const lsData  = JSON.parse(localStorage.getItem("billData"))
        if(lsData!=null)
        {
            setAllBill(lsData)
        }
    }
    
    useEffect (()=>{
        getData()
    },[])


    return (
        <div>
            <div className="container my-2">
                    <div className='d-flex justify-content-between'>
                    <h1 className='text-center'>Bill Book</h1>
                        <button type='button' className='btn btn-warning' onClick={addData}><i className="fa-sharp fa-solid fa-plus"></i></button>
                    </div>
                     <hr />
                    <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Launch demo modal
                    </button>

                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">{isEdit ? "Update Data" : "Add Data"}</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="card p-4">
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="number" className="form-label fs-5">Invoice Number</label>
                                            <input type="text" className="form-control" id="number" name='number' value={bill.number} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label fs-5">Customer Name</label>
                                            <input type="text" className="form-control" id="name" name='name' value={bill.name} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="date" className="form-label fs-5">Date</label>
                                            <input type="date" className="form-control" id="date" name='date' value={bill.date} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="type" className="form-label fs-5">Payment Type</label>
                                            <select id="type" name='type' className='form-select' value={bill.type} onChange={handleChange} required>
                                                <option value="" disabled>Select Payment Type</option>
                                                <option value="Credit Card">Credit Card</option>
                                                <option value="Debit Card">Debit Card</option>
                                                <option value="Gpay">Gpay</option>
                                                <option value="Cash">Cash</option>
                                                <option value="Paytm">Paytm</option>
                                                <option value="Cheque">Cheque</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="itemname" className="form-label fs-5">Item Name</label>
                                            <input type="text" className="form-control" id="itemname" name='itemname' value={bill.itemname} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="qty" className="form-label fs-5">Quantity</label>
                                            <input type="text" className="form-control" id="qty" name='qty' value={bill.qty} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="rate" className="form-label fs-5">Rate</label>
                                            <input type="text" className="form-control" id="rate" name='rate' value={bill.rate} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="amt" className="form-label fs-5">Amount</label>
                                            <input type="text" className="form-control" id="amt" name='amt' value={bill.amt} onChange={handleChange} />
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refclose}>Close</button>
                                    <button type="button" className="btn btn-primary" disabled={bill.number==="" || bill.name==="" || bill.itemname==="" || bill.date==="" || bill.type==="" || bill.qty==="" || bill.rate==="" || bill.amt===""} onClick={saveData} >{isEdit ? "Update Data" : "Add Data"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <h1>Details</h1>
                <div className="row">
                    {allBill.map((det,index)=>{
                    return <div className="col-4 my-2" key={index}>
                         <div className="card">
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                  <h5 className="card-title"><b>Invoice Number:</b> {det.number} </h5>
                                <div>
                                   <i className="fa-solid fa-file-pen text-success mx-2 fs-4" style={{cursor:"pointer"}} onClick={()=>updateData(det,index)}></i>
                                   <i className="fa-solid fa-trash text-danger fs-4" style={{cursor:"pointer"}} onClick={() => deleteData(index)}></i>
                               </div>
                                </div> 
                                <h6 className="card-subtitle mb-2 text-muted"><b>Date:</b> {moment(det.date).format("L")} </h6>
                                <p className="card-text"> <b> Name:</b> {det.name}</p>
                                <p className="card-text"> <b>Item Name:</b> {det.itemname} </p>
                                <p className="card-text"> <b>Payment Type:</b> {det.type} </p>
                                <p className="card-text"> <b>Amount:</b> {det.amt} </p>
                            </div>
                        </div>
                    </div>
                        })}
                </div>
            </div>
        </div>
    )
}

export default Bill
