import * as fp from "fingerpose";

const middleFingerGesture = new fp.GestureDescription("middle_finger");

// index:
middleFingerGesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);
middleFingerGesture.addCurl(fp.Finger.Index, fp.Finger.NoCurl);

for ( let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    middleFingerGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    middleFingerGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
}

export default middleFingerGesture;





