import React from 'react';

async function fetchPosts() {
  const res = await fetch(`${process.env.API_URL}/posts`);
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
          class="rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm"
        >
          <div class="rounded-[10px] bg-white p-4 !pt-20 sm:p-6">
            <time datetime="2022-10-10" class="block text-xs text-gray-500">
              {post.date_created}
            </time>

            <a href="#">
              <h3 class="mt-2 text-2xl font-bold text-gray-900">
                {post.title}
              </h3>
            </a>

            <p>{post.summary}</p>

            <div class="mt-4 flex flex-wrap gap-1">
              {post.tags.map((tag) => (
                // TODO: Make tag a link
                <span
                  key={post.shortid + tag}
                  class="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600"
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
