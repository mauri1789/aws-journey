import React from 'react'
import './CodeBlock.scss';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Step } from '../../../../../redux/types/sections';
import { DownloadCodeComponent } from './DownloadCode';
import { CopyCodeComponent } from './CopyCode';

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
                    <DownloadCodeComponent step={step} />
                    <CopyCodeComponent step={step} />
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
