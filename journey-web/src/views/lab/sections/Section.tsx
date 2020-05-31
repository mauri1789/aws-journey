import React, { useState } from 'react';
import './Section.scss';
import { SectionHeader } from './SectionHeader';
import { SectionContent } from './SectionContent';

export interface ISection {
   section: string
   title: string
   description: string
}
interface ISectionProps {
   section: ISection
   index: number
}
function Section ({section, index}:ISectionProps) {
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
            <SectionContent
               description={section.description}
               section_id={section_id}
            />
          }
       </div>
    )
}

export { Section }
