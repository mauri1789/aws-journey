import React, { useEffect, useState, Dispatch } from 'react';
import './Journey.scss';
import axios from 'axios';
import { journey_url } from '../../Project';
import {
  useParams
} from "react-router-dom";
import { setMainTitle } from '../../redux/actions/navigation'
import { AppActions } from '../../redux/types/actions'
import { connect } from 'react-redux';
import { topicDrawings } from './dev_cert/topic_drawings';
import { JourneyTopic } from '../../redux/types/journey';
import { JourneyMap } from './JourneyMap';

interface TopicSession {
   type: string
   session_id: string
   description: string
}
interface MainTopic {
   topic_id: string
   topic_type: string
   description: string
   title: string
   sessions: TopicSession[]
}
type Props = LinkDispatchProps
function Journey({setMainTitle}:Props) {
   let [journeyTopics, setJourneyTopics] = useState<JourneyTopic[]>([])
   let {journey_id} = useParams()
   let [mainTopic, setmainTopic] = useState<MainTopic>()

   let setTopicActive = (topic_id: string | undefined) => {
      journeyTopics = journeyTopics.map(topic => ({
         ...topic,
         selected: (topic_id == topic.topic_id)? true:false
      }))
      setJourneyTopics(journeyTopics)
   }
   
   useEffect(() => {
      let getData = async () => {
         await getJourney();
         getTopic('fundamentals', 'Fundamentals');
      }
      getData()
    },[])
    useEffect(() => {
      setTopicActive(mainTopic?.topic_id)
    },[mainTopic])
   return (
      <div className="journey">
         <JourneyMap journey_topics={journeyTopics} getTopic={getTopic} />
         <div className="topic">
            <div className="topic-title">
               {mainTopic?.title}
            </div>
            <div className="topic-description">
               {mainTopic?.description}
            </div>
         {/* {JSON.stringify(mainTopic)} */}
         </div>
      </div>
   );
   async function getTopic (topic_id:string, topic_name:string) {
      let response = await axios.get(journey_url('content', `topic/${journey_id}/${topic_id}`))
      let { data } = response;
      let {sessions, topic} = data
      topic.topic_id = topic_id
      topic.title = topic_name
      topic.sessions = sessions
      setmainTopic(topic)
   }
   async function getJourney () {
      let response = await axios.get(journey_url('content', `journey/${journey_id}`))
      let { data } = response;
      let {topics, journey} = data
      let UITopics: JourneyTopic[] = topics.map((topic: JourneyTopic) => ({
         ...topic,
         selected: false,
         ...topicDrawings[topic["topic_id"]]
      }))
      if ( setMainTitle ) {
         setMainTitle(journey.journey)
      }
      setJourneyTopics(UITopics)
      return Promise.resolve()
   }
}

interface LinkDispatchProps {
   setMainTitle?: (main_title: string) => void
}

const mapDispatchToProps = (
   dispatch: Dispatch<AppActions>,
   ownProps: {}
): LinkDispatchProps => ({
   setMainTitle: (main_title) => dispatch(setMainTitle(main_title))
});

let JourneyComponent = connect(
   null,
   mapDispatchToProps
)(Journey);
  
export default JourneyComponent;
  