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


type Props = LinkDispatchProps
function Journey({setMainTitle}:Props) {
   let [Journeytopics, setJourneyTopics] = useState<JourneyTopic[]>([])
   let {journey_id} = useParams()
   useEffect(() => {
      let get_journey = async () => {
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
       }
       get_journey();
    },[])
   return (
      <div className="journey">
         <JourneyMap journey_topics={Journeytopics} />
         <div className="topic">
         topic
         </div>
      </div>
   );
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
  