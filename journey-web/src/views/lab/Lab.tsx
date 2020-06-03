import React, { useState } from 'react';
import './Lab.scss';
import { LabMenuComponent, Lab, Tests, Statistics } from './LabMenu';
import {
  useParams
} from "react-router-dom";
import { SectionTabComponent } from './sections/SectionTab';

function LabComponent() {
   const [currentTab, setCurrentTab] = useState("Lab")
   let {lab_id, topic_id} = useParams()

   return (
      <div className="lab">
         <div className="lab-header">
            <h1 className="lab-title">S3 Static Website</h1>
            <LabMenuComponent
               setCurrentTab={setCurrentTab}
               currentTab={currentTab}
            />
         </div>
         <div className="lab-content">
            {currentTab==Lab &&
               <SectionTabComponent lab_id={lab_id} />
            }
         </div>
      </div>
   );
}


export { LabComponent }
