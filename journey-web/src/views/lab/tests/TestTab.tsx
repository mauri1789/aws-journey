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
import { TestResultsComponent } from './TestResults';

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
                <TestResultsComponent execution={execution} />
            }
        </div>
    )
}

export { TestTabComponent }
