import styles from './VideoBlock.module.css';

export default function VideoBlock({data}) {
  return (
    <>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <video width="1920" height="1080" controls preload="metadata" playsInline className={styles.video}>
        <source src={`${data.url || ''}#t=0.1`} type="video/mp4" />
      </video>
    </>
  )
}

export const videoBlockSchema = {
  name: 'videoBlock',
  label: 'Video Block',
  type: 'object',
  fields: [
    {
      name: 'url',
      label: 'URL',
      type: 'string',
    },
  ]
}