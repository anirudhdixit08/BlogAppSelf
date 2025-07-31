import React from 'react';
import Hero from '../Home/Hero';
import Trending from '../Home/Trending';
import Technical from '../Home/Technical';
import Cultural from '../Home/Cultural';
import PopularCreators from '../Home/PopularCreators';
function Home() {
  return (
    <div>
      <Hero />
      <Trending />
      <Technical />
      <Cultural />
      <PopularCreators />
    </div>
  )
}

export default Home