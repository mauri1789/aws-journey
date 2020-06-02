import './Step.scss';
import React, { useEffect, useState, MouseEvent } from 'react';
import { Step } from '../../../../redux/types/sections';
import { parse } from '../../../../lib/parser';
import { CodeBlockComponent } from './code_block/CodeBlock'

interface StepProps {
    step: Step
    index: number
}
function StepComponent({step, index}: StepProps) {
    return (
        <div className="step">
            <div className="step-index">
                {index+1}.
            </div>
            <div className="step-content">
                <div>{parse(step.text)}</div>
                {step.code &&
                    <CodeBlockComponent step={step} />
                }
                {step.images &&
                    <img className="step-image" src={step.images[0]} />                  
                }
                {step.list &&
                    step.list.map(item => <div><b>-</b> {item}</div>)
                }
            </div>
        </div>
    )
}


export { StepComponent }
