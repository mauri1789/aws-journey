import './Step.scss';
import React, { useEffect, useState, Dispatch } from 'react';
import { Step } from '../../../redux/types/sections';
import { parse } from '../../../lib/parser';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

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
                    <SyntaxHighlighter language="json" style={docco}>
                        {step.code}
                  </SyntaxHighlighter>
                }
            </div>
        </div>
    )
}


export { StepComponent }
