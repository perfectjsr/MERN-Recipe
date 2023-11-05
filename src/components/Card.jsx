import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './Reducer';
import { Modal, show, Button } from 'react-bootstrap';

const Card = (props) => {
    let dispatch = useDispatchCart();
    let data = useCart();

    const priceRef = useRef();
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    let options = props.options;
    let priceOptions = Object.keys(options);
    let [qty, setQty] = useState(1);
    let [size, setSize] = useState("");

    const handleAddtoCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;

                break;
            }
        }
        if (food != []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc })
                console.log("Size different so simply ADD one more to the list")
                return
            }
            return
        }

        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })

        // await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
        // console.log(data)
    }

    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value);
    }, [])

    return (

        <div>
            <div className="card mt-3 mx-2" style={{ width: "16rem", maxHeight: "360px" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="Card Image" style={{ height: "130px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className='container w-100'>
                        <select className=' h-100 m-2 bg-success rounded' onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>
                        <select className=' h-100 m-2 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {priceOptions.map((data) => {
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>
                        <div className='d-inline ms-2 h-100 fs-5'>
                            ₹{finalPrice}/-
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className={`col text-start btn btn-success justify-center ms-2`} onClick={handleAddtoCart}>Add to Cart</div>
                        <div className={`col text-end btn btn-success justify-center ms-2`} onClick={handleShow}>View Recipe</div>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title className="text-uppercase text-success">{props.foodItem.name}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <div className="d-flex justify-content-center">
                            <img src={props.foodItem.img} className="card-img-top  mx-auto" alt="Card Image" style={{ height: "30vh", width:"80%" }} />
                            </div>
                                <br></br><hr />
                                <h3 className="text-center text-success">Ingredients</h3>
                                <p>{props.foodItem.ingredients.split(', ').map((ingredient, index) => (
                                    <span key={index}>
                                        {index + 1}. {ingredient}
                                        {index !== props.foodItem.ingredients.split(', ').length - 1 && <br />}
                                    </span>
                                ))}</p>
                                <hr />
                                <h3 className="text-center text-success">Instructions</h3>
                                <p>{props.foodItem.instruction.split('. ').map((instructions, index) => (
                                    <span key={index}>
                                        {index + 1}. {instructions}
                                        {index !== props.foodItem.instruction.split('. ').length - 1 && <br />}
                                    </span>
                                ))}</p>
                            </Modal.Body>
                            <Modal.Footer >
                                <Button variant="secondary" onClick={handleClose}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
