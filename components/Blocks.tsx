import React from 'react'
import { HeroHome } from './blocks/HeroHome'

export const Blocks = (props) => {
  return (
    <>
    { props.blocks 
      ? props.blocks.map((block, i) => {
        if (block.__typename === "PageBlocksHeroHome") {
          return (
            <React.Fragment key={i + block.__typename}>
              <HeroHome data={block} />
            </React.Fragment>
          )
        }
      }) 
      : null
    }
    </>
  )
}