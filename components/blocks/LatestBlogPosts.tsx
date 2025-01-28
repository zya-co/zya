import { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import RichText from '../RichText';
import styles from './LatestBlogPosts.module.css';
import Image from 'next/image';
import Button from '../Button';

export default function LatestBlogPosts({data, posts}) {
  
  return (
    <div data-tina-field={tinaField(data)} className={styles.latestBlogPosts}>
      <div className={styles.intro}>
        <RichText content={data.intro} />
      </div>
      <div className={styles.posts}>
        {posts &&
          <div key={0} className={styles.post_first}>
            <figure className={styles.image}>
              <Image 
                src={posts[0].image ? posts[0].image : '' } 
                alt={posts[0].title} 
                width={657}
                height={172}
                sizes='(min-width: 640.1px) 52vw, 100vw'
              />
            </figure>
            <h3 className={styles.title}>{posts[0].title ? posts[0].title : 'No title'}</h3>
            <p className={styles.description}>{posts[0].description ? posts[0].description : 'No description'}</p>
            <div className={styles.footer}>
              <div className={styles.meta}>
                <span className={styles.author}>{posts[0].author ? posts[0].author : 'No author'}</span>
                <span className={styles.category}>{posts[0].category ? posts[0].category : 'No category'}</span>
              </div>
              <Button variant="arrowRightMini" href={`/blog/${posts[0].filename}`}>Read</Button>
            </div>
          </div>
        }
        <div className={styles.posts_twoplus}>
          {posts && posts.map((post, i: number) => (
               i >= 1 &&
                <div key={i} className={styles.post}>
                  <h3 className={styles.title}>{post.title ? post.title : 'No title'}</h3>
                  <div className={styles.footer}>
                    <div className={styles.meta}>
                      <span className={styles.author}>{post.author ? post.author : 'No author'}</span>
                      <span className={styles.category}>{post.category ? post.category : 'No category'}</span>
                    </div>
                    <Button variant="arrowRightMini" color="mineral-white" href={`/blog/${post.filename}`}>Read</Button>
                  </div>
                </div>
              
          ))}
          <Button className={styles.cta_gotoblog} href='/blog'>Read our blog</Button>
        </div>
      </div>
      {/* <pre style={{textWrap: 'wrap', width: '35em'}}>{JSON.stringify(posts, null, 2)}</pre> */}
    </div>
  );
}

export const latestBlogPostsSchema: Template = {
  name: 'latestBlogPosts',
  label: 'Latest Blog Posts',
  fields: [
    {
      name: 'intro',
      label: 'Title',
      type: 'rich-text',
    }, 
  ],
}