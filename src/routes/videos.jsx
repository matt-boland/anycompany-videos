import { Table, TableBody, TableHead, TableCell, TableRow, Pagination } from '@aws-amplify/ui-react';
// imports from Amplify library
import { API } from 'aws-amplify'
import { format } from 'date-fns';
import { Link } from "react-router-dom";

// import query definition
import * as queries from '../graphql/queries'
import React from 'react';

class Videos extends React.Component {
  pageSize = 20;

  state = {
    videoOnDemands: [],
    nextToken: null,
    currentPageIndex: 1,
    totalPages: 1,
    tokens: [null]
  };

  videoMap = {
    'BigBuckBunny1.mp4': {
      name: 'Animated Movie Clip',
      description: ''  
    },
    'BigBuckBunny2.mp4': {
      name: 'Animated Movie Clip',
      description: ''
    },
    'BigBuckBunny3.mp4': {
      name: 'Animated Movie Clip',
      description: ''
    },
    'Full_Show_Global_All-Hands_April_2022.mp4': {
      name: 'April 2022 Global All Hands',
      description: 'Q2 2022 Amazon All-Hands Meeting on April 19, 2022 in its entirety. Our host, Candi Castleberry, VP of Global Diversity, Equity, and Inclusion, will guide us through the agenda topics: Financial Update, Prime Video and Amazon Studios update and fireside chat, Amazon Care, AWS Graviton, Zoox, Awards, Employee Q&A'
    },
    'All-Hands_Q4_2021_Full_Show.mp4': {
      name: 'Q4 2021 All Hands',
      description: 'Q4 2021 Amazon All-Hands Meeting on November 16, 2021 in its entirety. During this All-Hands, we’ll hear from Andy Jassy, Amazon CEO, who will open the meeting with a personal message to Amazonians and then close it out by hosting a Q&A session. There will be updates from our CFO Brian Olsavsky, as well as from the People eXperience & Technology team, which will share how Amazon is working to make every day better for employees. The Operations leadership team will discuss how they grew over the last few years to meet customer needs. The Astro team will share how they worked backwards to launch their new household robot. We’ll learn about New World, the highest-played new game this year on Steam. Plus, we will get an update on Project Kuiper, our work to increase global broadband access through a constellation of satellites in low Earth orbit.'
    },
    'All-Hands_Q4_2019_Full_Show.mp4': {
      name: 'Q4 2019 All Hands',
      description: 'Q4 2019 Amazon All-Hands Meeting on November 14, 2019 in its entirety. Hosted by Charlie Tritschler, VP of Product Management – Lab 126. Presentations include The Climate Pledge by Kara Hurst, Director, Sustainability; Business Update on Amazon.it and Amazon.es by Mariangela Marseglia, Italy & Spain Country Manager; Amazon 4-star presented by Cameron Janes, VP, Physical Stores; Financials by Brian Olsavsky, CFO; Just Do It and Door Desk award presentations; and Employee Q&A Session with Jeff Bezos and the S-team.'
    },
    'All-Hands_Q2_2021_Full_Show.mp4': {
      name: 'Q2 2021 All Hands',
      description: 'Dave Bozeman and his team provide a run-down of some of the ways we’re innovating in transportation to deliver for our customers across the world. Brian Olsavsky, CFO, discusses our financials. Stephenie Landry, VP of F3 (Fresh/Food/Fast), and Dilip Kumar, VP of Physical Retail and Technology, show us how our grocery business has scaled and evolved, and how new technology services such as Amazon One and Dash Cart are helping customers shop more quickly and with less contact. Werner Vogels, VP and CTO, talks about delivering products and services that enable customers to build. Amit Agarwal, SVP and India Country Manager, shares how we’re creating an impact in India by continuously inventing for customers. Dr. Vin Gupta, COVID-19 Chief Medical Officer, provides an update on workplace safety and COVID-19. John Schoettler, VP of Global Real Estate and Facilities, and team will share how Amazon’s HQ2 is taking shape in Arlington, Virginia. Andy Jassy, CEO of AWS, joins Dave Bozeman for a Fireside Chat. Awards are presented, followed by an employee Q&A session with Jeff Bezos and the S-team.'
    },
    'All-Hands_Q4_2020_Full_Show.mp4': {
      name: 'Q4 2020 All Hands', 
      description: '2020 Amazon All-Hands Meeting on October 27, 2020 in its entirety. Hosted by Kara Hurst, VP of Worldwide Sustainability. Dave Clark, SVP of Worldwide Operations, and his team talk about employee safety and how we’re constantly inventing and improving processes to help associates and customers. Brian Olsavsky, CFO, discusses our financials. Kara Hurst and her team share more information about our global sustainability efforts including The Climate Pledge. Elizabeth Nieto, Director of Global Diversity and Inclusion, provides an overview of companywide commitments. Just Do It and Door Desk awards are presented, followed by an employee Q&A session with Jeff Bezos and the S-team.'
    },
    'Global_All-Hands_Meeting_October_2022.mp4': {
      name: 'October 2022 All Hands',
      description: 'Q2 2022 Amazon All-Hands Meeting on 10 October, 2022 in its entirety. Our host, Russ Grandinetti, SVP, International Stores will guide us through the agenda topics: Financial update Video: Sign Language Station Innovation across operations Amazon in Europe Supporting Ukraine Awards Employee Q&A'
    }
  };
// execute the query in componentDidMount
async componentDidMount() {
  try {
    // await this.fetchSignedCookies();
    await this.fetchVideoOnDemads(null);
    this.onNextPage = this.onNextPage.bind(this);
    this.onPreviousPage = this.onPreviousPage.bind(this);
  } catch (err) {
    console.log('error fetching talks...', err)
  }
}

// async fetchSignedCookies() {
//   const signedCookies = await API.get('signedcookie', '/signedcookie');
// }

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
  let durationInSeconds = (duration / 1000).toFixed(0);
  let durationMinutes = Math.floor(durationInSeconds / 60);
  let durationSeconds = durationInSeconds % 60;
  return durationMinutes + "m " + durationSeconds + "s";
}

randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

determineThumbNailUrl(vod) {
  console.log(vod);
  if (vod && vod.thumbNailsUrls && vod.thumbNailsUrls.length > 0) {
    const thumbnails = vod.thumbNailsUrls;
    return thumbnails[this.randomIntFromInterval(0, thumbnails.length - 1)];
  } else {
    return '';
  }
}

formatVideoName(srcVideo) {
  let videoName = 'Demo Video';
  if (this.videoMap[srcVideo] != null) {
    videoName = this.videoMap[srcVideo].name;
  }

  return videoName;
}

formatVideoDescription(srcVideo) {
  let videoDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  if (this.videoMap[srcVideo] != null && this.videoMap[srcVideo].description != '') {
    videoDescription = this.videoMap[srcVideo].description;
  }

 return videoDescription;
}

render() {
  return (
    <>
      <div className="App">
        <div className='videoListContainer'>
         <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              {/* <TableCell>Source Info</TableCell> */}
              <TableCell>Transcode Duration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
            this.state.videoOnDemands.map((videoOnDemand, index) => (
              <TableRow key={videoOnDemand.guid}>
                <TableCell>{this.calculateIndex(index)}</TableCell>
                <TableCell><Link to="/video-player" state={{videoUrl: videoOnDemand.hlsUrl, srcMediainfo: videoOnDemand.srcMediainfo}}><img width="180px" src={this.determineThumbNailUrl(videoOnDemand)}></img></Link></TableCell>
                <TableCell style={{"min-width": "300px"}} className="videoName">{this.formatVideoName(videoOnDemand.srcVideo)}</TableCell>
                <TableCell style={{"text-align": "left"}}>{this.formatVideoDescription(videoOnDemand.srcVideo)}</TableCell>
                {/* <TableCell><pre>{JSON.stringify(JSON.parse(videoOnDemand.srcMediainfo), null, 2)}</pre></TableCell> */}
                <TableCell>{this.calculateDuration(videoOnDemand.startTime, videoOnDemand.endTime)}</TableCell>
              </TableRow>
            ))
          }
          </TableBody>
        </Table>
        <div className="pagination-container">
        <Pagination
      currentPage={this.state.currentPageIndex}
      totalPages={this.state.totalPages}
      hasMorePages={this.state.nextToken != null}
      onNext={this.onNextPage}
      onPrevious={this.onPreviousPage} /></div>
      </div>
      </div>
    </>
  )
}

  }
  export default Videos;