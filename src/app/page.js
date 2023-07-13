import React from 'react';
import Link from 'next/link';
import { fetchFromAPI } from '../utils';
import ProtectedWrapper from './components/ProtectedWrapper';

async function fetchPosts() {
  const res = await fetchFromAPI('/posts', { cache: process.env.CACHE_MODE });
  const { posts } = await res.json();

  return posts;
}

const Homepage = async () => {
  const posts = await fetchPosts();

  return (
    <main className="container mx-auto p-6 lg:max-w-3xl">
      <ProtectedWrapper
        className="mt-4 mb-6"
        ifHasUser={
          <Link
            href="/post/create"
            className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-8 py-2 font-medium text-lg text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          >
            Create Post
          </Link>
        }
        ifNoUser={''}
      />

      <section className="space-y-6">
        <h1 className="font-bold text-2xl">Latest posts</h1>
        {posts.map((post) => (
          <article
            key={post.id}
            className="rounded-xl p-0.5 shadow-xl border border-solid border-gray-400"
          >
            <Link href={`/${post.author}/${post.slug}-${post.shortid}`}>
              <div className="rounded-[10px] bg-white p-4 !pt-8 sm:p-6">
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

                <div className="format-sm">
                  <h3 className="mt-2 text-2xl font-bold text-gray-900">
                    {post.title}
                  </h3>

                  <p className="lead">{post.summary}</p>
                </div>

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
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Homepage;
