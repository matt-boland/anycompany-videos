import Videojs from '../video';

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    sources: [{
      src: 'https://d69f1z2duoru5.cloudfront.net/ce7bd76a-a11a-4b5b-9311-a2bf314f6f7e/hls/SampleVideo_1280x720_30mb.m3u8',
      type: 'application/x-mpegURL'
    }]
  };

export default function Player() {

  
  return (
    <main style={{ padding: "1rem 0" }}>
      <Videojs
        { ...videoJsOptions } />
    </main>
  );
}