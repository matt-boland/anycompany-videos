import Videojs from '../video';
import { useLocation } from "react-router-dom";
import React from 'react';
import { Link } from "react-router-dom";


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
  const backText = '<- Back to video list';

  
  return (
    <main style={{ padding: "1rem 1rem" }}>
      <div style={{ padding: "0 0 1rem 0" }}><Link to="/">{backText}</Link></div>
      <Videojs
        { ...videoJsOptions } />
      <pre>
        {location.state.srcMediainfo}
      </pre>
    </main>
  );
}
