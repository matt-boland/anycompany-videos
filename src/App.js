import './App.css';
import { Flex } from '@aws-amplify/ui-react';
import { Ampligram, NavBar, SideBar, AmpligramCollection} from './ui-components';
// import Videojs from './video.js'


function App() {

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    sources: [{
      src: 'https://d69f1z2duoru5.cloudfront.net/ce7bd76a-a11a-4b5b-9311-a2bf314f6f7e/hls/SampleVideo_1280x720_30mb.m3u8',
      type: 'application/x-mpegURL'
    }]
  };

  return (
    <div className="App">
      <NavBar overrides={{"Logo29767075": {children: "Any Company"}}} />
      <Flex direction="row">
        <SideBar />
        <AmpligramCollection />
        {/* <Videojs
        { ...videoJsOptions } /> */}
      </Flex>
    </div>
  );
}

export default App;
