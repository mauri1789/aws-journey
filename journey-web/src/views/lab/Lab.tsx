import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Lab.scss';
import {journey_url} from '../../Project';
import {
  useParams
} from "react-router-dom";

interface Section {
  section: string;
  title: string;
  description: string;
}

function Lab() {
  const [lab, setLab] = useState();
  let [sections, setSections] = useState<Section[]>([]);
  useEffect(() => {
    let get_journey = async () => {
      let response = await axios.get(journey_url('content', 'lab/S3_static_website'))
      let { data } = response;
      setLab(data["lab"])
      setSections(data["sections"])
    }
    get_journey();
  },[])

  let section_group = sections.map((section) => 
    <div>{section!.title}</div>
  )

  let {lab_id, topic_id} = useParams()
    return (
      <div className="lab">
        <h1>S3 Static Website</h1>
        <p>Static websites are a great addition to your web toolkit</p>
        <div className="sections">
          {section_group}
        </div>
      </div>
    );
  }
  
  export default Lab;