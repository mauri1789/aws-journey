import React, { ReactNode } from 'react';
import './LambdaDrawing.scss';
interface LambdaDrawingProps {
    container:ReactNode
}
function LambdaDrawing ({container}:LambdaDrawingProps) {
    return (
        <g className="lambda">
            {container}
            <g className="lambda-cylinder">
                <g className="cylinder-side">
                    <path className="st7" d="M409.02,328.55l8.82-5.12c0,0,1.49-1.32,4.49,0.27s6.81,6.88,6.34,10.83c-0.39,3.21-2.37,4.18-2.37,4.18
                        l-8.67,5.06c0,0,5.01-3.47-0.9-11.68C412.15,325.7,409.02,328.55,409.02,328.55z"/>
                </g>
                <g className="cylinder-front">
                    <path className="st8" d="M413.64,328.75c-3.42-1.97-6.2-0.39-6.21,3.54c-0.01,3.93,2.75,8.72,6.17,10.69
                        c3.42,1.98,6.2,0.39,6.21-3.54C419.83,335.51,417.06,330.72,413.64,328.75z"/>
                </g>
            </g>
            <g className="lambda-cube">
                <g className="cube-side">
                    <polygon className="st9" points="385.02,249.7 384.84,265.94 396.11,263.15 396.29,246.91 			"/>
                </g>
                <g className="cube-back">
                    <polygon className="st10" points="382.38,243 371.1,245.79 385.02,249.7 396.29,246.91 			"/>
                </g>
                <g className="cube-front">
                    <polygon className="st11" points="371.1,245.79 370.93,262.03 384.84,265.94 385.02,249.7 			"/>
                </g>
            </g>
            <g className="lambda-inner">
                <polygon className="st13" points="375.43,290.17 424.55,290.17 424.55,338.97 393.47,338.59 393.47,319.35 375.36,319.35 		"/>
            </g>
            <g className="lambda-cog">
                <path className="st14" d="M418.58,317.04v-4.45l-4.62-0.65c-0.35-1.55-0.98-3-1.83-4.3l2.8-3.65l-3.22-3.14l-3.74,2.73
                    c-1.33-0.83-2.82-1.44-4.41-1.78l-0.67-4.51h-4.55l-0.67,4.51c-1.59,0.34-3.08,0.95-4.41,1.78l-3.74-2.73l-3.22,3.14l2.8,3.65
                    c-0.85,1.3-1.48,2.75-1.83,4.3l-4.62,0.65v4.45l4.62,0.65c0.35,1.55,0.98,3,1.83,4.3l-2.8,3.65l3.22,3.14l3.74-2.73
                    c1.33,0.83,2.82,1.44,4.41,1.78l0.67,4.51h4.55l0.67-4.51c1.59-0.34,3.08-0.95,4.41-1.78l3.74,2.73l3.22-3.14l-2.8-3.65
                    c0.85-1.3,1.48-2.75,1.83-4.3L418.58,317.04z M400.62,322.23c-4.19,0-7.59-3.32-7.59-7.41c0-4.09,3.4-7.41,7.59-7.41
                    s7.59,3.32,7.59,7.41C408.21,318.91,404.81,322.23,400.62,322.23z"/>
            </g>
            <g className="lambda-outer">
                <path className="st15" d="M399.99,282.42v-4.2L368,276.28v70.13h63.34v-63.66L399.99,282.42z M421.76,336.33h-28.3v-16.98h-15.85
                    v-27.16h44.14V336.33z"/>
            </g>
            <g className="lambda-back">
                <rect x="370.26" y="321.05" className="st0" width="20.94" height="23.77"/>
            </g>
            <g className="lambda-icon">
                <polygon className="st16" points="388.92,338.3 386.96,334.78 385.31,335.69 380.01,322.82 374.23,322.82 374.23,326.86 
                    377.31,326.86 378.5,329.75 372.53,339.08 375.93,341.26 380.38,334.3 383.31,341.42 		"/>
            </g>
        </g>
    )
}

export { LambdaDrawing }
