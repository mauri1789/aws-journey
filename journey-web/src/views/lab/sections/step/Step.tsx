import './Step.scss';
import React, { useEffect, useState, Dispatch } from 'react';
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
            </div>
        </div>
    )
}


export { StepComponent }
