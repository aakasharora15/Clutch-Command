import { getPostData, getSortedPostsData } from '@/lib/markdown';
import React from 'react';
import SectionHeader from '@/components/SectionHeader';
import Image from 'next/image';
import Link from 'next/link';

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const postData = await getPostData(resolvedParams.slug);

  return (
    <div className="page-wrapper" style={{ paddingTop: '140px', paddingBottom: '140px', background: 'var(--bg-light)' }}>
      <article className="wrap" style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '40px', color: 'var(--text-muted)', fontSize: '14px', textDecoration: 'none', fontWeight: 500 }}>
          &larr; Back to Home
        </Link>

        <div style={{ marginBottom: '24px' }}>
          <span style={{ background: 'var(--bg-dark)', color: '#fff', fontSize: '11px', padding: '4px 12px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {postData.category}
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(40px, 5vw, 56px)', lineHeight: 1.1, marginBottom: '32px', color: '#111' }}>
          {postData.title}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', position: 'relative' }}>
            <Image src={postData.authorImage} alt={postData.author} fill style={{ objectFit: 'cover' }} />
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '15px' }}>{postData.author}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{postData.date}</div>
          </div>
        </div>

        <div style={{ width: '100%', height: '400px', position: 'relative', borderRadius: '24px', overflow: 'hidden', marginBottom: '64px' }}>
          <Image src={postData.thumbnail} alt={postData.title} fill style={{ objectFit: 'cover' }} />
        </div>

        <div 
          className="markdown-content"
          style={{ fontSize: '18px', lineHeight: 1.7, color: '#333' }}
          dangerouslySetInnerHTML={{ __html: postData.content }} 
        />
        
      </article>
    </div>
  );
}
