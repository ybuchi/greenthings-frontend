import React, {useEffect,useState} from "react";
import MyMap from "./myMap/MyMap"
import Container from 'react-bootstrap/Container';
import CardGroup from "./myMap/CardGroup";
import './map.css'

function Map(){

    const [outpost, setOutpost] = useState([]);
    const [leisure, setLeisure] = useState([])

    const outpostUrl = `https://secret-lowlands-44368.herokuapp.com/outpost-activities`
    const leisureUrl = `https://secret-lowlands-44368.herokuapp.com/leisure-activities`

    const getData = (url,activity) => {
        fetch(url)
        .then( res => res.json())
        .then( data => activity(data))
        .catch( error => console.log(error.message))
    }

    useEffect( () => {
        getData(outpostUrl,setOutpost)
        getData(leisureUrl,setLeisure)
    },[])

    const patchData= (url,id,body)=> {
        fetch(`${url}+${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(body)
        })
        .then( res => res.json())
        .then( data => setOutpost(outpost.map(out=>{
            if(out.id===data.id) return data
            return out
          })))
        .catch( error => console.log(error.message));
      }

      const patchLeisureData = (url,id,body) => {
        fetch(`${url}+${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(body)
        })
        .then( res => res.json())
        .then( data => setLeisure(leisure.map(le=>{
            if(le.id===data.id) return data
            return le
          })))
        .catch( error => console.log(error.message));

      }

      const deleteDataOutpost = (url,outid) => {
        fetch(`${url}+${outid}`, {
            method: "DELETE"
        })
        .then(setOutpost(outpost.filter(out=>outid!==out.id)))
        .catch( error => console.log(error.message));
      }

      const deleteDataLeisure = (url,leid) => {
        fetch(`${url}+${leid}`, {
            method: "DELETE"
        })
        .then(setLeisure(leisure.filter(le=>leid!==le.id)))
        .catch( error => console.log(error.message));
      }

      console.log('The outpost', outpost)


    return(
        <>
        <Container fluid >
                    <main>
                        <div className="cardCol"><CardGroup className='allcards' outpost={outpost} leisure={leisure} patchData={patchData} deleteDataOutpost={deleteDataOutpost} patchLeisureData={patchLeisureData}deleteDataLeisure={deleteDataLeisure}/></div>
                    </main>
                    <aside>
                        <div className="mapCol"><MyMap outpost={outpost} leisure={leisure}/></div>
                    </aside>
                </Container>
        </>
    )
}

export default Map;