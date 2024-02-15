import React from 'react'
import { HeroHome } from './blocks/HeroHome'
import ContentFullSizeImgBg from './blocks/ContentFullSizeImgBg'
import ContentTextAndImage from './blocks/ContentTextAndImage'
import HomeFounders from './blocks/HomeFounders'
import HeroMission from './blocks/HeroMission'

export const Blocks = (props) => {
  return (
    <>
    { props.blocks 
      ? props.blocks.map((block, i) => {
        switch (block.__typename) {
          case "PageBlocksHeroHome":
            return (
              <React.Fragment key={i + block.__typename}>
                <HeroHome data={block} />
              </React.Fragment>
            )
          case "PageBlocksContentFullSizeImgBg":
            return (
              <React.Fragment key={i + block.__typename}>
                <ContentFullSizeImgBg data={block} />
              </React.Fragment>
            )
          case "PageBlocksContentTextAndImg":
            return (
              <React.Fragment key={i + block.__typename}>
                <ContentTextAndImage data={block} />
              </React.Fragment>
            )
          case "PageBlocksHomeFounders":
            return (
              <React.Fragment key={i + block.__typename}>
                <HomeFounders data={block} />
              </React.Fragment>
            )
          case "PageBlocksHeroMission":
            return (
              <React.Fragment key={i + block.__typename}>
                <HeroMission data={block} />
              </React.Fragment>
            )
        }
      }) 
      : null
    }
    </>
  )
}