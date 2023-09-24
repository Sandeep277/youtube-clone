import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Box } from '@mui/material'

import { Videos, ChannelCard } from './';
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetail = () => {
  const {id} = useParams();
  const [channelDetail, setChannelDetail] = useState(null)
  const [videos, setVideos] = useState(null)

  useEffect(() => {
    const fetchResults = async () => {
      const data = await fetchFromAPI(`channels?part=snippet&id=${id}`);

      setChannelDetail(data?.items[0]);

      const videosData = await fetchFromAPI(`search?channelId=${id}&part=snippet%2Cid&order=date`);

      setVideos(videosData?.items);
    };

    fetchResults();
  }, [id]);

  return (
    <Box minHeight='95vh'>
      <Box>
        <div style={{
          background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(30,30,223,1) 55%, rgba(0,212,255,1) 100%)",
          zIndex: '10',
          height: '300px'
        }}>
          <ChannelCard marginTop={'93px'} channelDetail={channelDetail}/>
        </div>
      </Box>
      <Box display='flex' p='2'>
        <Box sx={{ mr: {sm: '100px' }}} />
          <Videos videos={videos} />
      </Box>
    </Box>
  )
}

export default ChannelDetail
