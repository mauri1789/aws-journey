import React from 'react';
import './LabMenu.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBolt, faFlask, faChartBar
} from '@fortawesome/free-solid-svg-icons'

const Lab="Lab"
const Tests = "Tests"
const Statistics = "Statistics"

interface LabMenuProps {
    currentTab: string,
    setCurrentTab: (tab: string) => void
}
function LabMenuComponent ({currentTab, setCurrentTab}: LabMenuProps){

    return (
        <div className="lab-menu">
            <div className="non-tab"></div>
            <div
                className={(currentTab==Lab)?"tab current-tab": "tab"}
                onClick={()=>setCurrentTab(Lab)}
            >
                <FontAwesomeIcon className="icon" icon={faBolt} /> {Lab}
            </div>
            <div
                className={(currentTab==Tests)?"tab current-tab": "tab"}
                onClick={()=>setCurrentTab(Tests)}
            >
                <FontAwesomeIcon className="icon" icon={faFlask} /> {Tests}
            </div>
            <div
                className={(currentTab==Statistics)?"tab current-tab": "tab"}
                onClick={()=>setCurrentTab(Statistics)}
            >
                <FontAwesomeIcon className="icon" icon={faChartBar} /> {Statistics}
            </div>
            <div className="non-tab2"></div>
        </div>
    )
}

export { LabMenuComponent, Lab, Tests, Statistics }
