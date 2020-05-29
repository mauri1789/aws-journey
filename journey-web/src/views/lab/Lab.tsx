import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Lab.scss';
import {journey_url} from '../../Project';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCoffee,
  faCaretRight
} from '@fortawesome/free-solid-svg-icons'
import {
  useParams
} from "react-router-dom";

interface Section {
  section: string;
  title: string;
  description: string;
}
interface Lab {
  description: string;
}

function Lab() {
  const [lab, setLab] = useState<Lab>();
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
    <div className="section">
      <div className="section-header">
        <div className="section-open">
          <FontAwesomeIcon icon={faCaretRight} />
        </div>
        <div className="section-title">
          {section!.title}
        </div>
      </div>
    </div>
  )

  let {lab_id, topic_id} = useParams()
    return (
      <div className="lab">
        <h1>S3 Static Website</h1>
        <p>{lab?.description}</p>
        <div className="sections">
          {section_group}
        </div>
      </div>
    );
  }
  
  export default Lab;