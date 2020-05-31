import React, { useState } from 'react';
import './Section.scss';
import { SectionHeader } from './SectionHeader';
import { SectionContentComponent } from './SectionContent';
import { Section } from '../../../redux/types/sections';

interface SectionProps {
   section: Section
   index: number
}
type Props = SectionProps
function SectionComponent ({section, index}:Props) {
   const first_section = (index==0)?true:false
   const [sectionOpen, setSectionOpen] = useState<boolean>(first_section);
   let toggleSection = () => setSectionOpen(!sectionOpen)

   const section_id = section.section_id!.split('-')[1]

   return (
      <div className="section">
         <SectionHeader
         title={section.title!}
         toggleSection={toggleSection}
         />
         {sectionOpen &&
         <SectionContentComponent
            description={section.description}
            section_index={index}
            section_id={section_id}
         />
         }
      </div>
   )
}

export { SectionComponent }
