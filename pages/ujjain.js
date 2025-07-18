import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Blogs.module.css';

// Import all blog posts
import blogOne from '../blogs/blogOne';
import blogTwo from '../blogs/blogTwo'; 
import blogThree from '../blogs/blogThree';
import blogFour from '../blogs/blogFour';
import blogFive from '../blogs/blogFive';
import blogSix from '../blogs/blogSix';
import blogSeven from '../blogs/blogSeven';
import blogEight from '../blogs/blogEight';
import blogNine from '../blogs/blogNine';
import blogTen from '../blogs/blogTen';

const blogs = [
  blogOne,
  blogTwo,
  blogThree, 
  blogFour,
  blogFive,
  blogSix,
  blogSeven,
  blogEight,
  blogNine,
  blogTen
];

export default function Blogs() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Our Blog Posts</h1>
      <div className={styles.blogGrid}>
        {blogs.map((blog, index) => (
          <Link href={`/blogs/blog${index + 1}`} key={index}>
            <div className={styles.blogCard}>
              <div className={styles.imageWrapper}>
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={300}
                  height={200}
                  objectFit="cover"
                />
              </div>
              <h2 className={styles.blogTitle}>{blog.title}</h2>
              <p className={styles.blogDescription}>
                {blog.description.length > 50 
                  ? `${blog.description.substring(0, 50)}...` 
                  : blog.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
