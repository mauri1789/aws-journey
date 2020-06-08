import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TestTab.scss';
import { journey_url } from '../../../Project';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCog, faCheckCircle, faTimesCircle
} from '@fortawesome/free-solid-svg-icons'
import { Execution, UserInput } from '../../../redux/types/execution';
import { TestParamsComponent } from './TestParams';
import { TestStatusComponent } from './TestStatus';

interface TestTabProps {
   lab: string
   execution: Execution | undefined
   setExecution: React.Dispatch<React.SetStateAction<Execution | undefined>>
}
function TestTabComponent ({lab, execution, setExecution}: TestTabProps){
    let [userInput, setUserInput] = useState<UserInput[]>()
    
    useEffect(() => {
      let get_execution = async () => {
         let user = "user1"
         let response = await axios.get(journey_url('validator', `execution/any`),{params: {user, lab}})
         let { data } = response;
         setExecution(data)
         setUserInput(data.user_input)
       }
       get_execution();
       
    },[])
    let selectIcon = (status: boolean | null) => {
        if ( status == null )
            return <FontAwesomeIcon icon={faCog} spin className="in-progress-col" />
        if ( status )
            return <FontAwesomeIcon icon={faCheckCircle} className="success-col" />
        else
            return <FontAwesomeIcon icon={faTimesCircle} className="failed-col" />
    }
    return (
        <div className="test-tab">
            {execution && userInput &&
                <TestStatusComponent
                    execution={execution}
                    setExecution={setExecution}
                    lab={lab}
                    user_input={userInput} />
            }
            {userInput &&
                <TestParamsComponent userInput={userInput} setUserInput={setUserInput} />
            }
            {execution && execution.steps.length != 0 &&
                <div className="test-results">
                    <div className="title">
                        Test Details
                    </div>
                    {execution.steps.map((step, key) => (
                        <div className="step-block" key={`step-block-${key}`}>
                            <div className="step-header">
                                {selectIcon(step.success)} {step.description}
                            </div>
                            {step.tests.map((test, index) => (
                                <div className="test-block" key={`test-block-${index}`}>
                                    {selectIcon(test.success)} {test.description}
                                </div> 
                            ))}
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export { TestTabComponent }
