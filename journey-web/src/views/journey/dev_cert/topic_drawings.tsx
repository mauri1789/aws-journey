import React, { ReactNode } from "react"
import { BucketDrawing } from "./drawings/Bucket"
import { UITopic } from "../../../redux/types/journey"

let topicDrawings:{[name:string]: UITopic} = {
    "S3": {
        x: 575.5,
        y: 251.5,
        icon: (container:ReactNode) => <BucketDrawing container={container}/>
    },
    "fundamentals": {
        x: 325.5,
        y: 26.5,
        icon: null
    },
    "EC2": {
        x: 75.5,
        y: 251.5,
        icon: null
    },
    "lambda": {
        x: 325.5,
        y: 251.5,
        icon: null
    },
    "kinesis": {
        x: 125.5,
        y: 476.5,
        icon: null
    },
    "DynamoDB": {
        x: 325.5,
        y: 476.5,
        icon: null
    },
    "security": {
        x: 325.5,
        y: 701.5,
        icon: null
    },
    "excel_import": {
        x: 525.5,
        y: 476.5,
        icon: null
    },
    "relational_dbs": {
        x: 75.5,
        y: 701.5,
        icon: null
    },
    "accessing_cloud": {
        x: 575.5,
        y: 701.5,
        icon: null
    },
    "messaging": {
        x: 125.5,
        y: 926.5,
        icon: null
    },
    "cloudformation": {
        x: 325.5,
        y: 926.5,
        icon: null
    },
    "serverless_app": {
        x: 525.5,
        y: 926.5,
        icon: null
    },
    "elastic_beanstalk": {
        x: 75.5,
        y: 1151.5,
        icon: null
    },
    "cloudformation_project": {
        x: 325.5,
        y: 1151.5,
        icon: null
    },
    "user_management": {
        x: 575.5,
        y: 1151.5,
        icon: null
    },
    "monitoring": {
        x: 125.5,
        y: 1376.5,
        icon: null
    },
    "ci_cd": {
        x: 525.5,
        y: 1376.5,
        icon: null
    },
    "dynamodb_cache": {
        x: 225.5,
        y: 1601.5,
        icon: null
    },
    "ci_cd_project": {
        x: 425.5,
        y: 1601.5,
        icon: null
    }
}

export { topicDrawings }
