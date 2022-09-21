import './App.css';
import { Flex, Table, TableBody, TableHead, TableCell, TableRow, Pagination } from '@aws-amplify/ui-react';
import { Ampligram, NavBar, SideBar, AmpligramCollection} from './ui-components';
import Videojs from './video'
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
// imports from Amplify library
import { API, graphqlOperation } from 'aws-amplify'
import { format } from 'date-fns';

// import query definition
import * as queries from './graphql/queries'
import React from 'react';

class App extends React.Component {
  pageSize = 5;

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

render() {
  return (
    <>
      <div className="App">
       <NavBar overrides={{"Logo29767075": {children: "Any Company"}}} />
       {/* <Flex direction="row"> */}
         {/* <SideBar /> */}
         <Pagination
      currentPage={this.state.currentPageIndex}
      totalPages={this.state.totalPages}
      hasMorePages={this.state.nextToken != null}
      onNext={this.onNextPage}
      onPrevious={this.onPreviousPage} />
         <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Start time</TableCell>
              <TableCell>End time</TableCell>
              <TableCell>Duration (s)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
            this.state.videoOnDemands.map((videoOnDemand, index) => (
              <TableRow key={videoOnDemand.guid}>
                <TableCell>{this.calculateIndex(index)}</TableCell>
                <TableCell><a href={videoOnDemand.hlsUrl} target="_blank">{videoOnDemand.srcVideo}</a></TableCell>
                <TableCell>{this.formatDataTime(videoOnDemand.startTime)}</TableCell>
                <TableCell>{this.formatDataTime(videoOnDemand.endTime)}</TableCell>
                <TableCell>{this.calculateDuration(videoOnDemand.startTime, videoOnDemand.endTime)}</TableCell>
              </TableRow>
            ))
          }
          </TableBody>
        </Table>
         {/* {
            this.state.videoPosts.map((videoPost, index) => (
              <div key={index}>
                <h3>{videoPost.guid}</h3>
              </div>
             
            ))
          } */}
       {/* </Flex> */}
     </div>
      
    </>
  )
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
