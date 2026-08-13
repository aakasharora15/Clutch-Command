import React from 'react';
import HomeClient from './HomeClient';
import { getSortedPostsData } from '@/lib/markdown';

export default async function Page() {
  const posts = getSortedPostsData();
  
  // We only want to show the latest 3 posts on the homepage
  const latestPosts = posts.slice(0, 3);

  return <HomeClient posts={latestPosts} />;
}
