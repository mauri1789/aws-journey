import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Lab.scss';
import { journey_url } from '../../Project';
import { Section, ISection } from './sections/Section';
import {
  useParams
} from "react-router-dom";

interface ILab {
  description: string
}

function Lab() {
   let {lab_id, topic_id} = useParams()
   const [lab, setLab] = useState<ILab>();
   let [sections, setSections] = useState<ISection[]>([]);
   useEffect(() => {
      let get_journey = async () => {
         let response = await axios.get(journey_url('content', `lab/${lab_id}`))
         let { data } = response;
         setLab(data["lab"])
         setSections(data["sections"])
      }
      get_journey();
   },[])

   return (
      <div className="lab">
         <h1>S3 Static Website</h1>
         <p>{lab?.description}</p>
         <div className="sections">
            {sections.map((section, index) =>
               <Section section={section} index={index} key={index} />
            )}
         </div>
      </div>
   );
}

export { Lab }
