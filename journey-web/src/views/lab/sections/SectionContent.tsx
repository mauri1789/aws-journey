import React from 'react'
import './SectionContent.scss';

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

 export { SectionContent }
