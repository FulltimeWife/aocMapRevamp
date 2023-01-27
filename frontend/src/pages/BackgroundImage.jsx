import React from 'react'

function importAll(r) {
  let images = []
  r.keys().map((item, index) => { images.push(r(item))})
  return images;
}


function BackgroundImage() {
  const backgroundImages = importAll(require.context("../media", false, /\.(png|jpe?g|svg)$/));
  const i = Math.floor(Math.random() * backgroundImages.length)
    return (
      <div style={{ backgroundImage: `url(${backgroundImages[i]}`, backgroundSize: "cover", height: "950px", width: "100%"}}></div>
    )
}

export default BackgroundImage


