import React from 'react';
import './LabMenu.scss';

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
                {Lab}
            </div>
            <div
                className={(currentTab==Tests)?"tab current-tab": "tab"}
                onClick={()=>setCurrentTab(Tests)}
            >
                {Tests}
            </div>
            <div
                className={(currentTab==Statistics)?"tab current-tab": "tab"}
                onClick={()=>setCurrentTab(Statistics)}
            >
                {Statistics}
            </div>
            <div className="non-tab2"></div>
        </div>
    )
}

export { LabMenuComponent, Lab, Tests, Statistics }
