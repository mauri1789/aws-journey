import './SectionContent.scss';
import React, { useEffect, useState, Dispatch } from 'react';
import axios from 'axios';
import { journey_url } from '../../../Project';
import { connect } from "react-redux";
import { AppState } from '../../../redux/store';
import { Section } from '../../../redux/types/sections';
import { AppActions } from '../../../redux/types/actions';
import { addSteps } from '../../../redux/actions/sections';
import { Step } from '../../../redux/types/sections';

interface SectionContentProps {
   description: string;
   section_index: number;
   section_id: string;
 }

type Props = SectionContentProps & LinkDispatchProps & LinkStateProps

function SectionContentC ({
   description,
   section_index,
   section_id,
   addSteps,
   sections
}: Props) {
   const [steps, setSteps] = useState<Step[]>([]);
   useEffect(() => {
      let get_journey = async () => {
         let response = await axios.get(journey_url('content', `section/${section_id}`))
         let { data } = response;
         setSteps(data["steps"])
         addSteps!(data["steps"], section_index)
      }
      if (sections!.length > 0) {
         let section_steps = sections![section_index].steps
         if (section_steps) {
            setSteps(section_steps)
         } else {
            get_journey();
         }
     }
  },[sections])
    return (
      <div className="section-content">
         {description}
         {JSON.stringify(steps)}
      </div>
    )
}

interface LinkStateProps {
   sections?: Section[]
}

const mapStateToProps = (
   state: AppState,
   ownProps: SectionContentProps
): LinkStateProps => ({
   sections: state.sections
});

interface LinkDispatchProps {
   addSteps?: (steps:Step[], section_index:number) => void;
}

const mapDispatchToProps = (
   dispatch: Dispatch<AppActions>,
   ownProps: SectionContentProps
): LinkDispatchProps => ({
   addSteps: (steps:Step[], section_index:number) => dispatch(addSteps(steps, section_index))
});

let SectionContentComponent = connect(
   mapStateToProps,
   mapDispatchToProps
)(SectionContentC);

export { SectionContentComponent }
