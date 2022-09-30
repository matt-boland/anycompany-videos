import Videojs from '../video';
import { useLocation } from "react-router-dom";
import React from 'react';


  const videoJsOptions = {
    autoplay: true,
    controls: true,
    sources: [{
      src: 'https://d69f1z2duoru5.cloudfront.net/ce7bd76a-a11a-4b5b-9311-a2bf314f6f7e/hls/SampleVideo_1280x720_30mb.m3u8',
      type: 'application/x-mpegURL'
    }]
  };

export default function Player() {
  const location = useLocation();
  videoJsOptions.sources[0].src = location.state.videoUrl;
  console.log(location.state);
  

  
  return (
    <main style={{ padding: "1rem 0" }}>
      <Videojs
        { ...videoJsOptions } />
    </main>
  );
}
