import { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import RichText from '../RichText';
import styles from './LatestBlogPosts.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../Button';
import { useState } from 'react';
import DarkElement from '../DarkElement';

export default function LatestBlogPosts({data, posts}) {

  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  }
  
  return (
    <DarkElement ignore={data.backgroundColor === 'mineral-white' || data.backgroundColor === 'white' || data.backgroundColor === 'earth-gray' || data.backgroundColor === 'lichen'}>
      <div 
        data-tina-field={tinaField(data)} 
        className={styles.latestBlogPosts}
        style={{
          backgroundColor: data.backgroundColor ? 'var(--color-'+data.backgroundColor+')' : 'var(--color-mineral-white)',
        }}
      >
        <div className={styles.intro} style={{color: data.textColor ? 'var(--color-'+data.textColor+')' : 'var(--color-morpho-teal)'}}>
          <RichText content={data.intro} />
        </div>
          {/* <pre>{JSON.stringify(posts, null, 2)}</pre> */}
        <div className={styles.posts}>
          {posts[0] &&
              <div key={0} className={styles.post_first}>
                <Link href={`/blog/${posts[0]?.filename}`}>
                  {posts[0]?.image &&
                    <figure className={styles.image}>
                      <Image 
                        src={posts[0]?.image ? posts[0].image : '' } 
                        alt={posts[0]?.title} 
                        width={657}
                        height={172}
                        sizes='(min-width: 640.1px) 52vw, 100vw'
                      />
                    </figure>
                  }
                </Link>
                <Link href={`/blog/${posts[0]?.filename}`}>
                  <h3 className={styles.title}>{posts[0]?.title ? posts[0].title : 'No title'}</h3>
                </Link>
                <Link href={`/blog/${posts[0]?.filename}`}>
                  <p className={styles.description}>{posts[0]?.description ? posts[0].description : 'No description'}</p>
                </Link>
                <div className={styles.footer}>
                  <div className={styles.meta}>
                    <span className={styles.author}>{posts[0]?.author ? posts[0].author : 'No author'}</span>
                    <span className={styles.category}>{posts[0]?.category ? posts[0].category : 'No category'}</span>
                  </div>
                  <Button variant="arrowRightMini" href={`/blog/${posts[0]?.filename}`}>Read</Button>
                </div>
              </div>
          }
          {/* Show posts 2 and 3 */}
          <div className={styles.posts_twoplus}>
            {posts && posts.length > 1 && posts.map((post, i: number) => (
                i >= 1 && i <= 2 &&
                  <div key={i} className={styles.post}>
                    <Link href={`/blog/${post.filename} ?? '#'`}>
                      <h3 className={styles.title}>{post.title ? post.title : 'No title'}</h3>
                    </Link>
                    <Link href={`/blog/${post.filename} ?? '#'`}>
                      <p className={styles.description}>{post?.description ? post.description : 'No description'}</p>
                    </Link>
                    <div className={styles.footer}>
                      <div className={styles.meta}>
                        <span className={styles.author}>{post.author ? post.author : 'No author'}</span>
                        <span className={styles.category}>{post.category ? post.category : 'No category'}</span>
                      </div>
                      <Button variant="arrowRightMini" color="mineral-white" href={`/blog/${post.filename}`}>Read</Button>
                    </div>
                  </div>
                
            ))}
            {!data.showMore &&
              <Button className={styles.cta_gotoblog} href='/blog'>Read our blog</Button>
            }
          </div>
        </div>
        { data.showMore && posts.length > 3 && isCollapsed &&
          <button className={styles.showMoreButton} onClick={toggleCollapsed}>
            {isCollapsed ?
              <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 14.958V9.73707C7 8.75452 7.79651 7.95801 8.77906 7.95801H14" stroke="#00394C" strokeWidth="1.48255"/>
                <path d="M7 0.958058V6.17895C7 7.1615 6.20349 7.95801 5.22094 7.95801H-1.22522e-05" stroke="#00394C" strokeWidth="1.48255"/>
              </svg>
              :
              <span>-</span>
            }
          </button>
        }
        {/* Show posts 4+ */}
        <div className={styles.morePosts} data-collapsed={isCollapsed}>
          {data.showMore && !isCollapsed && posts.map((post, i: number) => (
              i >= 3 &&
                <div key={i} className={styles.post}>
                  <Link href={`/blog/${post.filename} ?? '#'`}>
                    <h3 className={styles.title}>{post.title ? post.title : 'No title'}</h3>
                  </Link>
                  <div className={styles.footer}>
                    <div className={styles.meta}>
                      <span className={styles.author}>{post.author ? post.author : 'No author'}</span>
                      <span className={styles.category}>{post.category ? post.category : 'No category'}</span>
                    </div>
                    <Button className={styles.readbutton} variant="arrowRightMini" color="mineral-white" href={`/blog/${post.filename}`}>Read</Button>
                  </div>
                </div>
            ))
          }
        </div>
        {/* <pre style={{color: '#FFF', textWrap: 'wrap', width: '35em'}}>{JSON.stringify(posts, null, 2)}</pre> */}
      </div>
    </DarkElement>
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
    {
      label: 'Text Color',
      name: 'textColor',
      type: 'string',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Mineral White', value: 'mineral-white' },
        { label: 'Earth Gray', value: 'earth-gray' },
        { label: 'Morpho Teal', value: 'morpho-teal' },
        { label: 'Lichen', value: 'lichen' },
        { label: 'Fuchsia', value: 'fuchsia' },
        { label: 'Beatle', value: 'beatle' },
        { label: 'Amber', value: 'amber' },
      ]
    },
    {
      label: 'Background Color',
      name: 'backgroundColor',
      type: 'string',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Mineral White', value: 'mineral-white' },
        { label: 'Earth Gray', value: 'earth-gray' },
        { label: 'Morpho Teal', value: 'morpho-teal' },
        { label: 'Lichen', value: 'lichen' },
        { label: 'Fuchsia', value: 'fuchsia' },
        { label: 'Beatle', value: 'beatle' },
        { label: 'Amber', value: 'amber' },
      ]
    },
    {
      label: 'Show more?',
      description: 'Show more than 3 blog posts on demand',
      name: 'showMore',
      type: 'boolean'
    }
  ],
}