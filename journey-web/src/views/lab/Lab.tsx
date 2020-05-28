import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Lab.scss';
import {journey_url} from '../../Project';
import {
  useParams
} from "react-router-dom";

function Lab() {
  const [labData, setLabData] = useState();
  useEffect(() => {
    let get_journey = async () => {
      let response = await axios.get(journey_url('content', 'lab/S3_static_website'))
      let { data } = response;
      setLabData(data)
    }
    get_journey();
  },[])

  let {lab_id} = useParams()
    return (
      <div className="lab">
        {lab_id}
        {JSON.stringify(labData)}
      </div>
    );
  }
  
  export default Lab;