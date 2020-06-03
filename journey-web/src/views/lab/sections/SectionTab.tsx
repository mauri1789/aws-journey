import React, { useState, useEffect, Dispatch } from 'react';
import axios from 'axios';
import './SectionTab.scss';
import { journey_url } from '../../../Project';
import { SectionComponent } from './../sections/Section';
import { AppState } from '../../../redux/store';
import { AppActions } from '../../../redux/types/actions';
import { Section, Step } from '../../../redux/types/sections';
import { addSections } from '../../../redux/actions/sections';
import { connect } from "react-redux";

interface Lab {
  description: string
}
interface SectionTabProps {
    lab_id: string
}

type Props = SectionTabProps & LinkStateProps & LinkDispatchProps

function SectionTabC({addSections, sections, lab_id}: Props) {
   const [lab, setLab] = useState<Lab>()
   useEffect(() => {
      let get_lab = async () => {
         let response = await axios.get(journey_url('content', `lab/${lab_id}`))
         let { data } = response;
         setLab(data["lab"])
         addSections!(data["sections"])
      }
      get_lab();
      
   },[])

   return (
    <div className="sections">
        <p>{lab?.description}</p>
        {sections!.map((section, index) =>
        <SectionComponent
            section={section}
            index={index}
            key={index}
        />
        )}
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
   ownProps: SectionTabProps
 ): LinkStateProps => ({
   sections: state.sections
 });

const mapDispatchToProps = (
   dispatch: Dispatch<AppActions>,
   ownProps: SectionTabProps
): LinkDispatchProps => ({
   addSections: (sections) => dispatch(addSections(sections))
});

let SectionTabComponent = connect(
   mapStateToProps,
   mapDispatchToProps
 )(SectionTabC);

export { SectionTabComponent }
