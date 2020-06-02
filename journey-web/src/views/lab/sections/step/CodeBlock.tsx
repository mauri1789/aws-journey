import React from 'react'
import './CodeBlock.scss';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faDownload,
  faCopy
} from '@fortawesome/free-solid-svg-icons'
import { Step } from '../../../../redux/types/sections';

interface CodeBlockProps {
    step: Step
}
function CodeBlockComponent({step}: CodeBlockProps) {
    return (
        <div className="code-block">
            <div className="code-header">
                <div className="file-name">
                    {step.code_file_name}
                </div>
                <div className="file-options">
                    <div className="file-button">
                        <FontAwesomeIcon icon={faDownload} /> download
                    </div>
                    <div className="file-button">
                        <FontAwesomeIcon icon={faCopy} /> copy
                    </div>
                </div>
            </div>
            <SyntaxHighlighter
                className="code"
                showLineNumbers={true}
                language={step.code_extension || "json"}
                style={atomOneLight}
            >
                {step.code}
            </SyntaxHighlighter>
        </div> 
    )
}

export { CodeBlockComponent }
