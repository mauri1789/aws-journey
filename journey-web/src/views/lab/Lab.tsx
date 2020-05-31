import React, { useState, useEffect, Dispatch } from 'react';
import axios from 'axios';
import './Lab.scss';
import { journey_url } from '../../Project';
import { SectionComponent } from './sections/Section';
import {
  useParams
} from "react-router-dom";
import { AppState } from '../../redux/store';
import { AppActions } from '../../redux/types/actions';
import { Section, Step } from '../../redux/types/sections';
import { addSections } from '../../redux/actions/sections';
import { connect } from "react-redux";

interface Lab {
  description: string
}
interface LabProps {}

type Props = LabProps & LinkStateProps & LinkDispatchProps

function LabC({addSections, sections}: Props) {
   let {lab_id, topic_id} = useParams()
   const [lab, setLab] = useState<Lab>();
   const [labSections, setLabSections] = useState<Section[]>([]);
   useEffect(() => {
      let get_lab = async () => {
         let response = await axios.get(journey_url('content', `lab/${lab_id}`))
         let { data } = response;
         setLab(data["lab"])
         setLabSections(data["sections"])
         addSections!(data["sections"])
      }
      get_lab();
      
   },[])

   return (
      <div className="lab">
         <h1>S3 Static Website</h1>
         <p>{lab?.description}</p>
         <div className="sections">
            {labSections.map((section, index) =>
               <SectionComponent section={section} index={index} key={index} />
            )}
         </div>
      </div>
   );
}

interface LinkDispatchProps {
   addSections?: (sections: Section[]) => void;
   addSteps?: (steps:Step[], section_index:number) => void;
}
interface LinkStateProps {
   sections?: Section[]
}

const mapStateToProps = (
   state: AppState,
   ownProps: LabProps
 ): LinkStateProps => ({
   sections: state.sections
 });

const mapDispatchToProps = (
   dispatch: Dispatch<AppActions>,
   ownProps: LabProps
): LinkDispatchProps => ({
   addSections: (sections) => dispatch(addSections(sections))
});

let LabComponent = connect(
   mapStateToProps,
   mapDispatchToProps
 )(LabC);

export { LabComponent }
