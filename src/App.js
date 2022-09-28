import './App.css';
import { Flex, Table, TableBody, TableHead, TableCell, TableRow, Pagination } from '@aws-amplify/ui-react';
import { Ampligram, NavBar, SideBar, AmpligramCollection} from './ui-components';
import Videojs from './video'
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
// imports from Amplify library
import { API, graphqlOperation } from 'aws-amplify'
import { format } from 'date-fns';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import About from "./routes/about";
import Videos from "./routes/videos";
import Player from "./routes/player";

// import query definition
import * as queries from './graphql/queries'
import React from 'react';
import { render } from '@testing-library/react';

class App extends React.Component {
  pageSize = 20;

  state = {
    videoOnDemands: [],
    nextToken: null,
    currentPageIndex: 1,
    totalPages: 1,
    tokens: [null]
  };
// execute the query in componentDidMount
async componentDidMount() {
  try {
    await this.fetchSignedCookies();
    await this.fetchVideoOnDemads(null);
    this.onNextPage = this.onNextPage.bind(this);
    this.onPreviousPage = this.onPreviousPage.bind(this);
  } catch (err) {
    console.log('error fetching talks...', err)
  }
}

async fetchSignedCookies() {
  const signedCookies = await API.get('signedcookie', '/signedcookie');
}

async fetchVideoOnDemads(token) {
  const videoOnDemandsData = await API.graphql({
    query: queries.listVideoOnDemands,
    variables: {
      nextToken: token,
      limit: this.pageSize
    }
  });
  const items = videoOnDemandsData.data.listVideoOnDemands.items;
  const nextToken = videoOnDemandsData.data.listVideoOnDemands.nextToken;
  let tokens = [...this.state.tokens, nextToken];
  this.setState({
    videoOnDemands: items,
    nextToken: nextToken,
    tokens: tokens
  });
}

async onNextPage() {
  await this.fetchVideoOnDemads(this.state.nextToken);
  this.setState({
    totalPages: this.state.totalPages + 1,
    currentPageIndex: this.state.currentPageIndex + 1,
  })
}

async onPreviousPage() {
  await this.fetchVideoOnDemads(this.state.tokens[this.state.currentPageIndex - 2]);
  this.setState({
    totalPages: this.state.totalPages - 1,
    currentPageIndex: this.state.currentPageIndex - 1
  })
}

calculateIndex(localIndex) {
  return 1 + localIndex + (this.state.currentPageIndex - 1) * this.pageSize;
}

formatDataTime(dateTime) {
  var date = new Date(dateTime);
  var formattedDate = format(date, "MMMM do, yyyy H:mma");
  return formattedDate;
}

calculateDuration(startTime, endTime) {
  var start = new Date(startTime);
  var end = new Date(endTime);
  var duration = end.getTime() - start.getTime();
  return (duration / 1000).toFixed(1);
}

// render() {
//   return (
//     <>
//       <div className="App">
//          <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Item</TableCell>
//               <TableCell></TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Start time</TableCell>
//               <TableCell>End time</TableCell>
//               <TableCell>Duration (s)</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//           {
//             this.state.videoOnDemands.map((videoOnDemand, index) => (
//               <TableRow key={videoOnDemand.guid}>
//                 <TableCell>{this.calculateIndex(index)}</TableCell>
//                 <TableCell><a href={videoOnDemand.hlsUrl} target="_blank"><img width="180px" src={videoOnDemand.thumbNailsUrls[0]}></img></a></TableCell>
//                 <TableCell><a href={videoOnDemand.hlsUrl} target="_blank">{videoOnDemand.srcVideo}</a></TableCell>
//                 <TableCell>{this.formatDataTime(videoOnDemand.startTime)}</TableCell>
//                 <TableCell>{this.formatDataTime(videoOnDemand.endTime)}</TableCell>
//                 <TableCell>{this.calculateDuration(videoOnDemand.startTime, videoOnDemand.endTime)}</TableCell>
//               </TableRow>
//             ))
//           }
//           </TableBody>
//         </Table>
//         <div class="pagination-container">
//         <Pagination
//       currentPage={this.state.currentPageIndex}
//       totalPages={this.state.totalPages}
//       hasMorePages={this.state.nextToken != null}
//       onNext={this.onNextPage}
//       onPrevious={this.onPreviousPage} /></div>
//       </div>
//     </>
//   )
// }

render() {
  return (
    <Router>
      <div className='navbar'>
        <h1>Any Company Videos</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/videos">Videos</Link>
          </li>
        </ul>
      </div>
      <div>
        <Routes>
          <Route path="about" element={<About />} />
          <Route path="videos" element={<Videos />} />
          <Route path="video-player" element={<Player />} />
        </Routes>
      </div>
    </Router>
  );
}
}


export default App;

// function App({ signOut, user }) {

//   const videoJsOptions = {
//     autoplay: true,
//     controls: true,
//     sources: [{
//       src: 'https://d69f1z2duoru5.cloudfront.net/ce7bd76a-a11a-4b5b-9311-a2bf314f6f7e/hls/SampleVideo_1280x720_30mb.m3u8',
//       type: 'application/x-mpegURL'
//     }]
//   };

//   return (
//     <div className="App">
//       <NavBar overrides={{"Logo29767075": {children: "Any Company"}}} />
//       <Flex direction="row">
//         <SideBar />
//         <AmpligramCollection />
//         <Videojs
//         { ...videoJsOptions } />
//       </Flex>
//     </div>
//   );
// }

// export default withAuthenticator(App);
