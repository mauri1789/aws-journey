import React, { useState } from 'react';
import axios from 'axios';
import './TestStatus.scss';
import { journey_url } from '../../../Project';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCog
} from '@fortawesome/free-solid-svg-icons'
import { Execution, UserInput } from '../../../redux/types/execution';


interface TestStatusProps {
    execution: Execution
    user_input: UserInput[]
    lab: string
    setExecution: React.Dispatch<React.SetStateAction<Execution | undefined>>
}
function TestStatusComponent ({execution, lab, user_input, setExecution}: TestStatusProps) { 
   const [inProgress, setInProgress] = useState(false)
   let toDashCase = (str:string) => {
        return str.toLowerCase().split(" ").join("-")
    }
    let checkExecution = (time: number, execution_id: string) => {
        let getExecution = async () => {
            let user = "user1"
            let response = await axios.get(
                journey_url('validator', `execution/${execution_id}`),
                {params: { lab, user }}
            )
            let { data: new_execution } = response;
            setExecution(new_execution)
            if (time < 8000 && new_execution.status == "IN PROGRESS") {
                setTimeout(checkExecution, time, time*2, execution_id)
            } else {
                setInProgress(false)
            }
        }
        setTimeout(getExecution, 1000) 
    }
    let testLab = () => {
        setInProgress(true)
        let testLabRequest = async () => {
            let user = "user1"
            let object_user_input: {[key:string]:string} = {}
            user_input.forEach(
                user_in => object_user_input[user_in.key] = user_in.value
            )
            let response = await axios.post(
                journey_url('validator', `validate`),
                {
                    lab,
                    user,
                    user_input: object_user_input
                }
            )
            let { data } = response;
            setExecution({
                steps: data,
                user_input,
                status:"IN PROGRESS" 
            })
            let execution_id = (data.length==0)?"any": data[0].execution_id
            checkExecution(1000, execution_id)
        }
        testLabRequest();
    }
    let isInProgress = () => execution.status == "IN PROGRESS" || inProgress
    return (
        <div className="test-status">
            <div className="status-cont">
                <div className="label">Status:&nbsp;&nbsp;</div>
                <div className={`status ${toDashCase(execution!.status)}`}>
                    {execution?.status}
                </div>
            </div>
            <div className={
                `test-button ${(isInProgress())?"test-loading":""}`
            } onClick={()=>testLab()}>
                {!isInProgress() &&
                    <div>Test Lab</div>
                }
                {isInProgress() &&
                    <FontAwesomeIcon icon={faCog} spin />
                }
            </div>
        </div>
    )
}

export { TestStatusComponent }
