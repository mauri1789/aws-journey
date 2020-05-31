import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCaretRight
} from '@fortawesome/free-solid-svg-icons'
import './SectionHeader.scss';

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

export { SectionHeader }
