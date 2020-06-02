import React, { MouseEvent, useState  } from 'react'
import './CodeBlock.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCopy
} from '@fortawesome/free-solid-svg-icons'
import { Step } from '../../../../../redux/types/sections';

interface CopyCodeProps {
    step: Step
}
function CopyCodeComponent({step}: CopyCodeProps) {
    const [displayCopyMessage, setDisplayCopyMessage] = useState<boolean>(false);
    const copyToClipboard = (e: MouseEvent) => {
        setDisplayCopyMessage(true)
        const el = document.createElement('textarea');
        el.value = step.code!;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    };
    return (
        <div className="file-button" onClick={copyToClipboard}>
            <FontAwesomeIcon icon={faCopy} /> copy
            {displayCopyMessage &&
            <div className="message">
                copied
            </div>}
        </div>
    )
}

export { CopyCodeComponent }
