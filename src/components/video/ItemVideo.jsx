import React, { useEffect, useRef } from "react";
import { Box, Heading, Link } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export const ItemVideo = ({ video }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (window.YT) {
      loadVideo();
    } else {
      window.onYouTubeIframeAPIReady = loadVideo;
    }

    function loadVideo() {
      playerRef.current = new window.YT.Player(videoRef.current, {
        videoId: video.videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
        },
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [video.videoId]);

  const handleMouseEnter = () => {
    if (playerRef.current) {
      playerRef.current.playVideo();
    }
  };

  const handleMouseLeave = () => {
    if (playerRef.current) {
      playerRef.current.pauseVideo();
    }
  };

  return (
    <MotionBox
      minWidth="300px"
      mr="4"
      bg="white"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      whileHover={{ scale: 1.05 }}
      cursor="pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box position="relative" paddingTop="56.25%" overflow="hidden">
        <div ref={videoRef} style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}></div>
      </Box>
      <Box p="4">
        <Heading as="h2" size="md" mb="2">{video.title}</Heading>
        <Link href={`https://www.youtube.com/watch?v=${video.videoId}`} color="teal.500" isExternal>
          Watch Video
        </Link>
      </Box>
    </MotionBox>
  );
};
