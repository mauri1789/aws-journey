import React, { useState } from 'react';
import './Section.scss';
import { SectionHeader } from './SectionHeader';
import { SectionContentComponent } from './SectionContent';
import { connect } from "react-redux";
import { AppState } from '../../../redux/store';
import { Section } from '../../../redux/types/sections';

export interface ISection {
   section: string
   title: string
   description: string
}
interface SectionProps {
   section: ISection
   index: number
}
type Props = SectionProps & LinkStateProps
function SectionC ({section, index, sections}:Props) {
   console.log(sections)
   const first_section = (index==0)?true:false
   const [sectionOpen, setSectionOpen] = useState<boolean>(first_section);
   let toggleSection = () => setSectionOpen(!sectionOpen)

   const section_id = section.section.split('-')[1]

   return (
      <div className="section">
         <SectionHeader
         title={section!.title}
         toggleSection={toggleSection}
         />
         {sectionOpen &&
         <SectionContentComponent
            description={section.description}
            section_id={section_id}
         />
         }
      </div>
   )
}
interface LinkStateProps {
   sections?: Section[]
}

const mapStateToProps = (
   state: AppState,
   ownProps: SectionProps
 ): LinkStateProps => ({
   sections: state.sections
 });

let SectionComponent = connect(
   mapStateToProps,
   null
 )(SectionC);

export { SectionComponent }
