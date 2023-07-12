import React from 'react';
import Link from 'next/link';
import { fetchFromAPI } from '../utils';

async function fetchPosts() {
  const res = await fetchFromAPI('/posts', { cache: process.env.CACHE_MODE });
  const { posts } = await res.json();

  return posts;
}

const Homepage = async () => {
  const posts = await fetchPosts();

  return (
    <main className="container mx-auto py-6 space-y-6 lg:max-w-3xl">
      {posts.map((post) => (
        <article
          key={post.id}
          className="rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm"
        >
          <div className="rounded-[10px] bg-white p-4 !pt-14 sm:p-6">
            <p className="block text-xs text-gray-500">
              Posted on{' '}
              <time dateTime={post.date_created}>
                {new Date(post.date_created).toDateString()}
              </time>{' '}
              by{' '}
              <Link href={`/${post.author}`} className="font-semibold">
                {post.author}
              </Link>
            </p>

            <Link href={`/${post.author}/${post.slug}-${post.shortid}`}>
              <h3 className="mt-2 text-2xl font-bold text-gray-900">
                {post.title}
              </h3>
            </Link>

            <p>{post.summary}</p>

            <div className="mt-4 flex flex-wrap gap-1">
              {post.tags.map((tag) => (
                // TODO: Make tag a link
                <span
                  key={post.shortid + tag}
                  className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      ))}
    </main>
  );
};

export default Homepage;
