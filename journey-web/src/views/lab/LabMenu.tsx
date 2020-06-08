import React from 'react';
import './LabMenu.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBolt, faFlask, faChartBar, faCog
} from '@fortawesome/free-solid-svg-icons'
import { Execution } from '../../redux/types/execution';

const Lab="Lab"
const Tests = "Tests"
const Statistics = "Statistics"

interface LabMenuProps {
    execution: Execution | undefined
    currentTab: string,
    setCurrentTab: (tab: string) => void
}
function LabMenuComponent ({currentTab, setCurrentTab, execution}: LabMenuProps){

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
                {execution && execution.status == "IN PROGRESS" &&
                    <FontAwesomeIcon className="icon" icon={faCog} spin /> 
                }
                {execution == null &&
                    <FontAwesomeIcon className="icon" icon={faFlask} /> 
                }
                {execution && execution.status != "IN PROGRESS" &&
                    <FontAwesomeIcon className="icon" icon={faFlask} /> 
                }
                {Tests}
                
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
