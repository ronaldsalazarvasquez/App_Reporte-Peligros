import React from 'react';

function VideoPlayer() {
  return (
    <div className="flex items-center justify-center">
      <div className="mt-0 w-[900px] h-[600px]">
        <iframe 
          className="w-full h-full aspect-video rounded-lg shadow-lg p-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500"
          src="https://www.youtube.com/embed/2Xu7vL0hu1Q"
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default VideoPlayer;
