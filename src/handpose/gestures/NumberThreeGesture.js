import * as fp from "fingerpose"

const numberThreeGesture = new fp.GestureDescription("three");

//index
numberThreeGesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);
numberThreeGesture.addCurl(fp.Finger.Index, fp.Finger.NoCurl);
//middle
numberThreeGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.VerticalUp, 1.0);
numberThreeGesture.addCurl(fp.Finger.Middle, fp.Finger.NoCurl);
//ring
numberThreeGesture.addDirection(fp.Finger.Ring, fp.FingerDirection.VerticalUp, 1.0);
numberThreeGesture.addCurl(fp.Finger.Ring, fp.Finger.NoCurl);

for(let finger of [fp.Finger.Pinky,fp.Finger.Thumb]){
    numberThreeGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    numberThreeGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
}

export default numberThreeGesture;