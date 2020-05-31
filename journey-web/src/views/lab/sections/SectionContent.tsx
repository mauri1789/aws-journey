import './SectionContent.scss';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { journey_url } from '../../../Project';

interface IStep {
   step: string;
   text: string;
   comments?: string;
   code?: string;
   code_url: string;
   list: string[];
}
interface ISectionContentProps {
    description: string;
    section_id: string;
 }
 function SectionContent ({description, section_id}: ISectionContentProps) {
    
   const [steps, setSteps] = useState<IStep[]>([]);
   useEffect(() => {
     let get_journey = async () => {
        let response = await axios.get(journey_url('content', `section/${section_id}`))
        let { data } = response;
        setSteps(data["steps"])
        console.log(data["steps"])
     }
     get_journey();
  },[])
    return (
       <div className="section-content">
          {description}
       </div>
    )
 }

 export { SectionContent }
