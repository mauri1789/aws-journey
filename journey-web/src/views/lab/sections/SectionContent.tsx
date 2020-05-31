import './SectionContent.scss';
import React, { useEffect, useState, Dispatch } from 'react';
import axios from 'axios';
import { journey_url } from '../../../Project';
import { connect } from "react-redux";
import { AppState } from '../../../redux/store';
import { Section } from '../../../redux/types/sections';
import { AppActions } from '../../../redux/types/actions';
import { addSections, addSteps } from '../../../redux/actions/sections';
import { Step } from '../../../redux/types/sections';

interface IStep {
   step: string;
   text: string;
   comments?: string;
   code?: string;
   code_url: string;
   list: string[];
}
interface SectionContentProps {
    description: string;
    section_id: string;
 }

type Props = SectionContentProps & LinkDispatchProps

function SectionContentC ({description, section_id, addSections}: Props) {
    
   const [steps, setSteps] = useState<IStep[]>([]);
   useEffect(() => {
     let get_journey = async () => {
         let response = await axios.get(journey_url('content', `section/${section_id}`))
         let { data } = response;
         setSteps(data["steps"])
         console.log(data["steps"])
         let sec: Section[] = [{
            description: "hi world"
         }]
         addSections!(sec)
     }
     get_journey();
  },[])
    return (
       <div className="section-content">
          {description}
       </div>
    )
 }

interface LinkDispatchProps {
   addSections?: (sections: Section[]) => void;
   addSteps?: (steps:Step[], section_index:number) => void;
}

const mapDispatchToProps = (
   dispatch: Dispatch<AppActions>,
   ownProps: SectionContentProps
): LinkDispatchProps => ({
   addSections: (sections) => dispatch(addSections(sections)),
   addSteps: (steps:Step[], section_index:number) => dispatch(addSteps(steps, section_index))
});

let SectionContentComponent = connect(
   null,
   mapDispatchToProps
)(SectionContentC);

export { SectionContentComponent }
