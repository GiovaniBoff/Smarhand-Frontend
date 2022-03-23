import React,{useEffect, useRef, useState} from "react"
import * as tf from "@tensorflow/tfjs"
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";
import Webcam from "react-webcam";
import { drawHand } from "../utils/HandUtilities";
import thumbsDownGesture from "./gestures/ThumbsDownGesture";

export const Handpose = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

  const [emoji,setEmoji] = useState(null)
  const emojis = { thumbs_up: "👍", victory: "✌️", thumbs_down: "👎" }
   useEffect(()=>{
      runHandpose();
    });


    const runHandpose = async () => {
        const net = await handpose.load();
        setInterval(() => {
            detect(net);
        }, 10/30);
      };

   

    const detect = async (net)=>{
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
          ) {
            // Get Video Properties
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;
      
            // Set video width
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;
      
            // Set canvas height and width
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;
      
            // Make Detections
            const hand = await net.estimateHands(video);
            //console.log(hand);

            if(hand.length >0){
              const GE = new fp.GestureEstimator([
                fp.Gestures.VictoryGesture,
                fp.Gestures.ThumbsUpGesture,
                thumbsDownGesture
              ]);
              const gesture = await GE.estimate(hand[0].landmarks, 9);
              
              //console.log(gesture.gestures.length)

              if(gesture.gestures !== undefined && gesture.gestures.length > 0){

                const result = gesture.gestures.reduce((p, c) => { 
                  return (p.score > c.score) ? p : c;
                });
                console.log(result)
                setEmoji(result.name);
                console.log(emoji);
              }
            }      
            //Draw mesh
            const ctx = canvasRef.current.getContext("2d");
            drawHand(hand, ctx);
          }
    }
    


    return<>
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginTop:100,
            margin: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
            ref={canvasRef}
            style={{
            position: "absolute",
            margin: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
         {emoji !== null ? (
          <div
            
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 400,
              bottom: 500,
              right: 0,
              textAlign: "center",
              fontSize: 100
            }}
          >{emojis[emoji]}</div>
        ) : (
          ""
        )}
            
    </>;
}