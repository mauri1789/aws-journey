import React, { ReactNode } from 'react';
import './Journey.scss';
import { Lines } from './drawings/Lines'
import { TopicDrawing, TOPIC_IN_PROGRESS, TOPIC_UNDONE, TOPIC_DONE } from './drawings/Topic';
import { BucketDrawing } from './drawings/Bucket'

function Journey() {
   let topics = [
      {
         title: "Fundamentals",
         x: "325.5",
         y: "26.5",
         status: TOPIC_DONE,
         selected: true,
         type: "chapter",
         icon: null
      },
      {
         title: "Traditional Computing",
         x: "75.5",
         y: "251.5",
         status: TOPIC_DONE,
         selected: false,
         type: "chapter",
         icon: null
      },
      {
         title: "Serverless Compute",
         x: "325.5",
         y: "251.5",
         status: TOPIC_DONE,
         selected: false,
         type: "chapter",
         icon: null
      },
      {
         title: "Object Storage",
         x: "575.5",
         y: "251.5",
         status: TOPIC_DONE,
         selected: false,
         type: "chapter",
         icon: (container:ReactNode) => <BucketDrawing container={container}/>
      },
      {
         title: "Kinesis",
         x: "125.5",
         y: "476.5",
         status: TOPIC_DONE,
         selected: false,
         type: "chapter",
         icon: null
      },
      {
         title: "DynamoDB",
         x: "325.5",
         y: "476.5",
         status: TOPIC_IN_PROGRESS,
         selected: false,
         type: "chapter",
         icon: null
      },
      {
         title: "Excel Import",
         x: "525.5",
         y: "476.5",
         status: TOPIC_IN_PROGRESS,
         selected: false,
         type: "chapter",
         icon: null
      },
      {
         title: "Relational Databases",
         x: "75.5",
         y: "701.5",
         status: TOPIC_IN_PROGRESS,
         selected: false,
         type: "chapter",
         icon: null
      },
      {
         title: "Security",
         x: "325.5",
         y: "701.5",
         status: TOPIC_IN_PROGRESS,
         selected: false,
         type: "chapter",
         icon: null
      },
      {
         title: "Accessing the cloud",
         x: "575.5",
         y: "701.5",
         status: TOPIC_IN_PROGRESS,
         selected: false,
         type: "chapter",
         icon: null
      },
      {
         title: "Messaging",
         x: "125.5",
         y: "926.5",
         status: TOPIC_IN_PROGRESS,
         selected: false,
         type: "chapter",
         icon: null
      },
      {
         title: "CloudFormation",
         x: "325.5",
         y: "926.5",
         status: TOPIC_IN_PROGRESS,
         selected: false,
         type: "chapter",
         icon: null
      },
      {
         title: "Serverless App",
         x: "525.5",
         y: "926.5",
         status: TOPIC_IN_PROGRESS,
         selected: false,
         type: "chapter",
         icon: null
      },
      {
         title: "Elastic BeanStalk",
         x: "75.5",
         y: "1151.5",
         status: TOPIC_IN_PROGRESS,
         selected: false,
         type: "chapter",
         icon: null
      },
      {
         title: "CF Serverless App",
         x: "325.5",
         y: "1151.5",
         status: TOPIC_UNDONE,
         selected: false,
         type: "chapter",
         icon: null
      },
      {
         title: "User Management",
         x: "575.5",
         y: "1151.5",
         status: TOPIC_UNDONE,
         selected: false,
         type: "chapter",
         icon: null
      },
      {
         title: "Monitoring",
         x: "125.5",
         y: "1376.5",
         status: TOPIC_UNDONE,
         selected: false,
         type: "chapter",
         icon: null
      },
      {
         title: "CI/CD",
         x: "525.5",
         y: "1376.5",
         status: TOPIC_UNDONE,
         selected: false,
         type: "chapter",
         icon: null
      },
      {
         title: "DynamoDB Cache",
         x: "225.5",
         y: "1601.5",
         status: TOPIC_UNDONE,
         selected: false,
         type: "chapter",
         icon: null
      },
      {
         title: "CI/CD Project",
         x: "425.5",
         y: "1601.5",
         status: TOPIC_UNDONE,
         selected: false,
         type: "chapter",
         icon: null
      }
   ]
   return (
      <div className="journey">
         <div className="map">
            <svg viewBox="0 0 800 1800">
               {topics.map((topic, index) =>
                  <TopicDrawing
                     x={+topic.x}
                     y={+topic.y}
                     status={topic.status}
                     selected = {topic.selected}
                     text={topic.title}
                     icon={topic.icon}
                     type={topic.type}
                  />
               )}
               <Lines />
            </svg>
         </div>
         <div className="topic">
         topic
         </div>
      </div>
   );
  }
  
  export default Journey;
  