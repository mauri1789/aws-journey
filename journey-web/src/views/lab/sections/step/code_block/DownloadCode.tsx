import React, { MouseEvent, useState  } from 'react'
import './Buttons.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faDownload
} from '@fortawesome/free-solid-svg-icons'
import { Step } from '../../../../../redux/types/sections';

interface DownloadButtonProps {
    step: Step
}
function DownloadCodeComponent({step}: DownloadButtonProps) {
    let downloadFile = async (e: MouseEvent) => {
        const element = document.createElement("a");
        const file = new Blob([step.code!], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = step.code_file_name!;
        document.body.appendChild(element);
        element.click();
    }
    return (
        <div className="file-button" onClick={downloadFile}>
            <FontAwesomeIcon icon={faDownload} /> download
        </div>
    )
}

export { DownloadCodeComponent }
