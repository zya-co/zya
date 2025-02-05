import React from 'react'
import { HeroHome } from './blocks/HeroHome'
import ContentFullSizeImgBg from './blocks/ContentFullSizeImgBg'
import ContentTextAndImage from './blocks/ContentTextAndImage'
import ContentText from './blocks/ContentText'
import HomeFounders from './blocks/HomeFounders'
import HeroMission from './blocks/HeroMission'
import HeroApproach from './blocks/HeroApproach'
import Comparison from './blocks/Comparison'
import HeroTeam from './blocks/HeroTeam'
import AdvisoryTeam from './blocks/AdvisoryTeam'
import Affiliation from './blocks/Affiliation'
import {DynamicBlock} from './blocks/DynamicBlock'
import LatestBlogPosts from './blocks/LatestBlogPosts'
import Media_Articles from './blocks/Media_Articles'
import HeroConvero from './blocks/HeroConvero'
import Conversion_Graphic from './blocks/Conversion_Graphic'
import { Footer } from './footer/Footer'
import { ContactFormBlock } from './blocks/ContactFormBlock'

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
          case "PageBlocksContentText":
            return (
              <React.Fragment key={i + block.__typename}>
                <ContentText data={block} />
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
          case "PageBlocksHeroApproach":
            return (
              <React.Fragment key={i + block.__typename}>
                <HeroApproach data={block} />
              </React.Fragment>
            )
          case "PageBlocksComparison":
            return (
              <React.Fragment key={i + block.__typename}>
                <Comparison data={block} />
              </React.Fragment>
            )
          case "PageBlocksHeroTeam":
            return (
              <React.Fragment key={i + block.__typename}>
                <HeroTeam data={block} />
              </React.Fragment>
            )
          case "PageBlocksAdvisoryTeam":
            return (
              <React.Fragment key={i + block.__typename}>
                <AdvisoryTeam data={block} />
              </React.Fragment>
            )
          case "PageBlocksAffiliation":
            return (
              <React.Fragment key={i + block.__typename}>
                <Affiliation data={block} />
              </React.Fragment>
            )
          case "PageBlocksDynamicBlock":
            return (
              <React.Fragment key={i + block.__typename}>
                <DynamicBlock data={block} />
              </React.Fragment>
            )
          case "BlogpostBlocksDynamicBlock":
            return (
              <React.Fragment key={i + block.__typename}>
                <DynamicBlock data={block} />
              </React.Fragment>
            )
          case "PageBlocksLatestBlogPosts":
            return (
              <React.Fragment key={i + block.__typename}>
                <LatestBlogPosts data={block} posts={props.latestposts ? props.latestposts : []} />
              </React.Fragment>
            )
          case "PageBlocksMediaArticles":
            return (
              <React.Fragment key={i + block.__typename}>
                <Media_Articles data={block} />
              </React.Fragment>
            )
          case "PageBlocksHeroConvero":
            return (
              <React.Fragment key={i + block.__typename}>
                <HeroConvero data={block} />
              </React.Fragment>
            )
          case "PageBlocksConversionGraphic":
            return (
              <React.Fragment key={i + block.__typename}>
                <Conversion_Graphic data={block} />
              </React.Fragment>
            )
          case "PageBlocksFooter":
            return (
              <React.Fragment key={i + block.__typename}>
                <Footer data={block} navdata={props.navdata} />
              </React.Fragment>
            )
          case "PageBlocksContactFormBlock":
            return (
              <React.Fragment key={i + block.__typename}>
                <ContactFormBlock data={block} />
              </React.Fragment>
            )
          
        }
      }) 
      : null
    }
    </>
  )
}