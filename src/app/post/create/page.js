'use client';
import React, { useRef, useState } from 'react';
import PostEditor from '@/components/PostEditor';
import { getFormData, useRedirect } from '@/utils/client';

// TODO: Add keyboard shortcut for preview
// Behavior:
// If body is saved with content, we will save a draft
// basically creating a post so any subsequent actions
// will count as edit so method should be 'PUT'
// Extra:
// If no other fields are filled and body went from with content to none
// it should delete the draft that we made
// so new content saved will make a new post entry
const CreatePost = () => {
  const [content, setContent] = useState(initContent);
  const [tags, setTags] = useState([]);
  const redirect = useRedirect();
  const editorRef = useRef(null);
  const formRef = useRef(null);

  // TODO: Consider limiting input to alphanumeric
  const addTag = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      const newTag = e.target.value.trim().replace(' ', '_').toLowerCase();
      setTags((prev) => {
        if (prev.includes(newTag)) return prev;
        return [...prev, newTag];
      });

      e.target.value = '';
    }
  };

  const removeTag = (e) => {
    // Need to store this so we don't get null
    const value = e.currentTarget.dataset.value;
    setTags((prev) => prev.filter((tag) => tag !== value));
  };

  const createPost = async (e) => {
    const data = getFormData(e.currentTarget);

    const res = await fetchFromAPI('/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
  };

  // TODO: Make this save a draft
  const save = () => {
    if (editorRef.current) {
      editorRef.current.uploadImages().then(() => {
        setContent(editorRef.current.getContent());
        console.log('Images uploaded');
      });
    }
  };

  return (
    <main>
      <section className="container max-w-4xl mx-auto my-8 py-2 px-6">
        <h1 className="text-3xl text-gray-900 font-bold mb-5">Create post</h1>
        <form
          ref={formRef}
          className="space-y-3 mb-3"
          id="post"
          onSubmit={(e) => {
            e.preventDefault();
            createPost(e);
          }}
        >
          <div>
            <label
              htmlFor="title"
              className="block text-lg font-bold text-gray-700 mb-2"
            >
              Title
            </label>

            <input
              type="text"
              id="title"
              name="title"
              required
              className="w-full rounded-md border-gray-200 bg-white text-gray-700 shadow-sm"
            />
          </div>

          <div>
            <label
              htmlFor="summary"
              className="block text-lg font-bold text-gray-700 mb-2"
            >
              Summary
            </label>

            <textarea
              name="summary"
              id="summary"
              className="w-full rounded-md border-gray-200 bg-white text-gray-700 shadow-sm"
              rows="5"
            ></textarea>
          </div>

          <textarea
            name="body"
            id="body"
            className="hidden"
            defaultValue={content}
            readOnly
          ></textarea>

          <select
            name="tags"
            id="tags"
            className="hidden"
            multiple
            value={tags}
            readOnly
          >
            {tags.map((tag, i) => (
              <option key={tag + i} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </form>

        {/* TinyMCE editor */}
        <div className="mt-3">
          <p className="block text-lg font-bold text-gray-700 mb-2">Body</p>
          <PostEditor
            onInit={(_, editor) => (editorRef.current = editor)}
            initialValue={content}
            init={{ save_onsavecallback: save }}
          />
        </div>

        {/* Tags */}
        <div className="mt-3">
          <div>
            <label
              htmlFor="tags"
              className="block text-lg font-bold text-gray-700 mb-2"
            >
              Tags
            </label>

            <input
              type="text"
              id="tags"
              name="tags"
              className="max-w-xl rounded-md border-gray-200 bg-white text-gray-700 shadow-sm"
              placeholder="e.g. coding, webdev etc."
              onKeyUp={addTag}
            />
          </div>

          <div className="mt-2 flex flex-wrap gap-1">
            {tags.map((tag, i) => (
              <span
                key={tag + i}
                className="inline-flex items-center justify-center rounded-full bg-purple-100 px-2.5 py-0.5 text-purple-700"
              >
                <p className="whitespace-nowrap text-sm">{tag}</p>

                <button
                  className="-me-1 ms-1.5 inline-block rounded-full bg-purple-200 p-0.5 text-purple-700 transition hover:bg-purple-300"
                  data-value={tag}
                  onClick={removeTag}
                >
                  <span className="sr-only">Remove tag</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-3 w-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        </div>

        <button
          type="submit"
          form="post"
          className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 mt-12 font-medium text-lg text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
        >
          Create Post
        </button>
      </section>
    </main>
  );
};

const initContent = `
<p class="lead">Flowbite is an open-source library of UI components built with the utility-first
classes from Tailwind CSS. It also includes interactive elements such as dropdowns, modals,
datepickers.</p>
<p>Before going digital, you might benefit from scribbling down some ideas in a sketchbook. This way,
you can think things through before committing to an actual design project.</p>
<p>But then I found a <a href="https://flowbite.com">component library based on Tailwind CSS called
    Flowbite</a>. It comes with the most commonly used UI components, such as buttons, navigation
bars, cards, form elements, and more which are conveniently built with the utility classes from
Tailwind CSS.</p>
<figure><img src="https://flowbite.s3.amazonaws.com/typography-plugin/typography-image-1.png" alt="">
<figcaption>Digital art by Anonymous</figcaption>
</figure>
<h2>Getting started with Flowbite</h2>
<p>First of all you need to understand how Flowbite works. This library is not another framework.
Rather, it is a set of components based on Tailwind CSS that you can just copy-paste from the
documentation.</p>
<p>It also includes a JavaScript file that enables interactive components, such as modals, dropdowns,
and datepickers which you can optionally include into your project via CDN or NPM.</p>
<p>You can check out the <a href="https://flowbite.com/docs/getting-started/quickstart/">quickstart
    guide</a> to explore the elements by including the CDN files into your project. But if you want
to build a project with Flowbite I recommend you to follow the build tools steps so that you can
purge and minify the generated CSS.</p>
<p>You'll also receive a lot of useful application UI, marketing UI, and e-commerce pages that can help
you get started with your projects even faster. You can check out this <a
    href="https://flowbite.com/docs/components/tables/">comparison table</a> to better understand
the differences between the open-source and pro version of Flowbite.</p>
<h2>When does design come in handy?</h2>
<p>While it might seem like extra work at a first glance, here are some key moments in which prototyping
will come in handy:</p>
<ol>
<li><strong>Usability testing</strong>. Does your user know how to exit out of screens? Can they
    follow your intended user journey and buy something from the site you’ve designed? By running a
    usability test, you’ll be able to see how users will interact with your design once it’s live;
</li>
<li><strong>Involving stakeholders</strong>. Need to check if your GDPR consent boxes are displaying
    properly? Pass your prototype to your data protection team and they can test it for real;</li>
<li><strong>Impressing a client</strong>. Prototypes can help explain or even sell your idea by
    providing your client with a hands-on experience;</li>
<li><strong>Communicating your vision</strong>. By using an interactive medium to preview and test
    design elements, designers and developers can understand each other — and the project — better.
</li>
</ol>
<h3>Laying the groundwork for best design</h3>
<p>Before going digital, you might benefit from scribbling down some ideas in a sketchbook. This way,
you can think things through before committing to an actual design project.</p>
<p>Let's start by including the CSS file inside the <code>head</code> tag of your HTML.</p>
<h3>Understanding typography</h3>
<h4>Type properties</h4>
<p>A typeface is a collection of letters. While each letter is unique, certain shapes are shared across
letters. A typeface represents shared patterns across a collection of letters.</p>
<h4>Baseline</h4>
<p>A typeface is a collection of letters. While each letter is unique, certain shapes are shared across
letters. A typeface represents shared patterns across a collection of letters.</p>
<h4>Measurement from the baseline</h4>
<p>A typeface is a collection of letters. While each letter is unique, certain shapes are shared across
letters. A typeface represents shared patterns across a collection of letters.</p>
<h3>Type classification</h3>
<h4>Serif</h4>
<p>A serif is a small shape or projection that appears at the beginning or end of a stroke on a letter.
Typefaces with serifs are called serif typefaces. Serif fonts are classified as one of the
following:</p>
<h4>Old-Style serifs</h4>
<ul>
<li>Low contrast between thick and thin strokes</li>
<li>Diagonal stress in the strokes</li>
<li>Slanted serifs on lower-case ascenders</li>
</ul><img src="https://flowbite.s3.amazonaws.com/typography-plugin/typography-image-2.png" alt="">
<ol>
<li>Low contrast between thick and thin strokes</li>
<li>Diagonal stress in the strokes</li>
<li>Slanted serifs on lower-case ascenders</li>
</ol>
`;

export default CreatePost;
