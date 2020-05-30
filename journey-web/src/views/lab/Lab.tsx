import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Lab.scss';
import {journey_url} from '../../Project';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCaretRight
} from '@fortawesome/free-solid-svg-icons'
import {
  useParams
} from "react-router-dom";

interface ISection {
  section: string
  title: string
  description: string
}
interface ILab {
  description: string
}

function Lab() {
   const [lab, setLab] = useState<ILab>();
   let [sections, setSections] = useState<ISection[]>([]);
   useEffect(() => {
      let get_journey = async () => {
         let response = await axios.get(journey_url('content', 'lab/S3_static_website'))
         let { data } = response;
         setLab(data["lab"])
         setSections(data["sections"])
      }
      get_journey();
   },[])

   let {lab_id, topic_id} = useParams()
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
interface ISectionProps {
   section: ISection
   index: number
}
function Section ({section, index}:ISectionProps) {
   const first_section = (index==0)?true:false
   const [sectionOpen, setSectionOpen] = useState<boolean>(first_section);
   let toggleSection = () => setSectionOpen(!sectionOpen)
   return (
      <div className="section">
         <SectionHeader
            title={section!.title}
            toggleSection={toggleSection}
         />
         {sectionOpen &&
            <SectionContent description={section.description} />
         }
      </div>
   )
}

interface ISectionHeaderProps {
   title: string
   toggleSection: () => void
}
function SectionHeader ({title, toggleSection}:ISectionHeaderProps) {
   return (
      <div className="section-header">
         <div className="section-open" onClick={toggleSection}>
            <FontAwesomeIcon icon={faCaretRight} />
         </div>
         <div className="section-title" onClick={toggleSection}>
            {title}
         </div>
      </div>
   )
}
interface ISectionContentProps {
   description: string;
}
function SectionContent ({description}: ISectionContentProps) {
   return (
      <div className="section-content">
         {description}
      </div>
   )
}

export default Lab;