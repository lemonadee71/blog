'use client';
import React, { useRef, useState } from 'react';
import Alert from '@/app/components/Alert';
import PostEditor from '@/app/components/PostEditor';
import { getFormData, useRedirect } from '@/utils/client';
import { fetchFromAPI } from '@/utils';

// TODO: Add keyboard shortcut for preview
const CreatePost = ({ init }) => {
  const [content, setContent] = useState(init?.content);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState();
  const editorRef = useRef(null);
  const formRef = useRef(null);
  const postId = useRef(null);
  const redirect = useRedirect();

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

  const createPost = async (isDraft) => {
    const data = getFormData(formRef.current);
    data.body = editorRef.current.getContent();
    data.published = !isDraft;

    if (isDraft && !data.title) {
      data.title = `Draft ${new Date().toISOString()}`;
    }

    const path = postId.current ? `/posts/${postId.current}` : '/posts';
    const method = postId.current ? 'PUT' : 'POST';

    const res = await fetchFromAPI(path, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result.post) {
      postId.current = result.post.shortid;
      setError(null);

      if (!isDraft) redirect('/');
    } else {
      if (Array.isArray(result.errors)) {
        setError(result.errors);
      } else {
        setError(
          Object.entries(result.errors).reduce((arr, curr) => {
            return [...arr, `${curr[0]}: ${curr[1]}`];
          }, [])
        );
      }
    }
  };

  const save = (isDraft = true) => {
    if (editorRef.current) {
      editorRef.current.uploadImages().then(() => {
        setContent(editorRef.current.getContent());
        createPost(isDraft);
      });
    }
  };

  return (
    <>
      {error && <Alert type="danger" message={error} />}

      <h1 className="text-3xl text-gray-900 font-bold mb-5">Create post</h1>

      <form
        ref={formRef}
        className="space-y-3 mb-3"
        id="post"
        onSubmit={(e) => {
          e.preventDefault();
          save(false);
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
          onInit={(_, e) => (editorRef.current = e)}
          initialValue={content}
          init={{ save_onsavecallback: () => save(true) }}
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
    </>
  );
};

export default CreatePost;
