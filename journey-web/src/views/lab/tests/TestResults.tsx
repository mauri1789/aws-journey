import React, { useEffect, useState } from 'react';
import './TestResults.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCog, faCheckCircle, faTimesCircle, faMinusCircle
} from '@fortawesome/free-solid-svg-icons'
import { Execution, ExecutionStep } from '../../../redux/types/execution';

interface TestResultsProps {
    execution: Execution
}
function TestResultsComponent ({execution}: TestResultsProps) {
    let selectIconStep = (status: boolean | null) => {
        if ( status == null )
            return <FontAwesomeIcon icon={faCog} spin className="in-progress-col" />
        if ( status )
            return <FontAwesomeIcon icon={faCheckCircle} className="success-col" />
        else
            return <FontAwesomeIcon icon={faTimesCircle} className="failed-col" />
    }
    let selectIconTest = (testStatus: boolean|null, stepStatus: boolean|null) => {
        if (stepStatus == null)
            return <FontAwesomeIcon icon={faCog} spin className="in-progress-col" />
        if (testStatus === undefined && stepStatus != null)
            return <FontAwesomeIcon icon={faMinusCircle} className="no-status" />
        return selectIconStep(testStatus)
    }
    let parseError = (error: string | undefined) => {
        try {
            if (error == undefined) {
                return "Unknown error"
            }
            let object_error = JSON.parse(error.replace(/'/g, '"'))
            return object_error["Message"]
        } catch (error) {
            return "Unknown error"
        }
        
    }
    let errorDisplay = (step:ExecutionStep) =>  step.error && execution.status != "IN PROGRESS"
    return (
        <div className="test-results">
            <div className="title">
                Test Details
            </div>
            {execution.steps.map((step, key) => (
                <div className={`step-block ${errorDisplay(step)?"error-block":""}`} key={`step-block-${key}`}>
                    { errorDisplay(step) &&
                        <div className="step-error">
                            <div>{parseError(step.error)}</div>
                        </div>
                    }
                    <div className="step-header">
                        {selectIconStep(step.success)} {step.description}
                    </div>
                    {step.tests.map((test, index) => (
                        <div className="test-block" key={`test-block-${index}`}>
                            {selectIconTest(test.success, step.success)} {test.description}
                        </div> 
                    ))}
                </div>
            ))}
        </div>
    )
}

export { TestResultsComponent }
