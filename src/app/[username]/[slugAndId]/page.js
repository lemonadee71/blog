import { fetchFromAPIWithCookie } from '@/utils/server';
import Link from 'next/link';
import React from 'react';

// TODO: Add custom 404 if doesn't exist
const fetchPost = async (id) => {
  const res = await fetchFromAPIWithCookie(`/posts/${id}`);
  const { post } = await res.json();
  return post;
};

const PostPage = async ({ params: { username, slugAndId } }) => {
  const parts = slugAndId.split('-');
  const id = parts[parts.length - 1];
  const post = await fetchPost(id);

  return (
    <main className="container-auto py-16 px-4">
      <div className="flex flex-wrap gap-2 mb-4 ">
        {post.tags.map((tag) => (
          <span
            key={post.shortid + tag}
            className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-600"
          >
            {tag}
          </span>
        ))}
      </div>
      <article className="format format-sm sm:format-base lg:format-lg format-blue text-gray-700">
        <div className="mb-4">
          <div className="not-format">
            <h1 className="mb-3 font-bold text-slate-900 text-3xl lg:text-5xl lg:leading-[3.5rem]">
              {post.title}
            </h1>
            <p className="text-gray-800 text-base lg:text-lg">
              by{' '}
              <Link href={`/${username}`} className="font-semibold">
                {post.author.display_name}
              </Link>
            </p>
            <p className="block  text-gray-500 text-sm lg:text-base">
              Posted on{' '}
              <time dateTime={post.date_created}>
                {new Date(post.date_created).toDateString()}
              </time>
            </p>
          </div>
          {post.summary && <p className="lead">{post.summary}</p>}
        </div>

        <div dangerouslySetInnerHTML={{ __html: post.body_html }}></div>
      </article>
    </main>
  );
};

export default PostPage;
