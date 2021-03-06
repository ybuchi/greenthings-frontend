import React, { useState } from "react";
import Card from 'react-bootstrap/Card'
import './item.css'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import EditModal from "./EditModal";


function Item ({card, patchData, deleteDataOutpost}) {

  const deleteOutUrl = `https://secret-lowlands-44368.herokuapp.com/outposts-activity/`

  const defaultImage = `https://76crb34usu-flywheel.netdna-ssl.com/wp-content/uploads/2017/12/iStock-902227708.jpg"`

  const {avatar,activity_type,description, image,comment, outpost,rating} = card

  const [show, setShow] = useState(false);
  const [editShow, setEditShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEditClose = () => setEditShow(false);
  const handleEditShow = () => setEditShow(true);

  let logo;
  switch(avatar) {
    case "Deer":
      logo = <img className="form-logo-img" src={require("../images/deer.png")} alt="deer"/>
      break;
    case "Squirrel":
      logo = <img className="form-logo-img" src={require("../images/squirrel.png")} alt="squirrel"/>
      break;
    case "Falcon":
      logo = <img className="form-logo-img" src={require("../images/falcon.png")} alt="falcon"/>
      break;
    case "Pigeon":
      logo = <img className="form-logo-img" src={require("../images/pigeon.png")} alt="pigeon"/>
      break;
    case "Rat":
      logo = <img className="form-logo-img" src={require("../images/rat.png")} alt="rat"/>
      break;
    case "Coyote":
      logo = <img className="form-logo-img" src={require("../images/coyote.png")} alt="coyote"/>
      break;
    case "Raccoon":
      logo = <img className="form-logo-img" src={require("../images/raccoon.png")} alt="racoon"/>
      break;
    default:
      // code block
  }

  const handleDelete = () => {
    deleteDataOutpost(deleteOutUrl,card.id)
  }


    return (
        <>
           <Card className="mycard" id="outpostCard">
            <Card.Img className="cardImg" onClick={handleShow} variant="top" src={image?image:defaultImage} />
            <Card.Body className="cardBody">
              <Card.Title>{logo}</Card.Title>
              <Card.Text>Activity: {activity_type}</Card.Text>
              <Card.Text>Rating: {rating}/10</Card.Text>
              <Card.Text>{outpost.name}</Card.Text>
              <Button id='editbtn' onClick={handleEditShow} variant="outline-primary">Edit</Button>
              <Button id='dltbtn' onClick={handleDelete} variant="outline-secondary">Delete</Button>
            </Card.Body>
          </Card> 

          {/* Card Modal */}
          <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{activity_type}</Modal.Title>
        </Modal.Header>
        <img src={image?image:defaultImage} alt='default'/>
        <Modal.Body>
          <small>{logo} * {rating}/10</small> 
          <h5>Description</h5>
          <p>{description}</p>
          <h5>Comments</h5>
          <p>{comment}</p>
          <h5>Location</h5>
          <p>{outpost.name}</p>
        </Modal.Body>
      </Modal>
      {/* Card Modal */}

        {/* Form edit Modal */}

          <EditModal handleEditClose={handleEditClose} handleEditShow={handleEditShow} editShow={editShow} card={card} patchData={patchData}/>

        {/* Form edit Modal */}
        </>
    );
}

export default Item;