import { Editor as TinyEditor } from '@tinymce/tinymce-react';

// TinyMCE so the global var exists
// eslint-disable-next-line no-unused-vars
import tinymce from 'tinymce/tinymce';
// DOM model
import 'tinymce/models/dom/model';
// Theme
import 'tinymce/themes/silver';
// Toolbar icons
import 'tinymce/icons/default';
// Editor styles
import 'tinymce/skins/ui/oxide/skin.min.css';

// importing the plugin js.
// if you use a plugin that is not listed here the editor will fail to load
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/autosave';
import 'tinymce/plugins/charmap';
// import 'tinymce/plugins/code';
import 'tinymce/plugins/codesample';
// import 'tinymce/plugins/directionality';
// import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/help';
import 'tinymce/plugins/image';
// import 'tinymce/plugins/importcss';
// import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
// import 'tinymce/plugins/media';
// import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/pagebreak';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/quickbars';
import 'tinymce/plugins/save';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/table';
// import 'tinymce/plugins/template';
// import 'tinymce/plugins/visualblocks';
// import 'tinymce/plugins/visualchars';
import 'tinymce/plugins/wordcount';

// importing plugin resources
// import 'tinymce/plugins/emoticons/js/emojis';

// Content styles, including inline UI like fake cursors
/* eslint import/no-webpack-loader-syntax: off */
import contentCss from '!!raw-loader!tinymce/skins/content/default/content.min.css';
import contentUiCss from '!!raw-loader!tinymce/skins/ui/oxide/content.min.css';
import flowbiteTypographyStyles from '!!raw-loader!../../public/flowbite-typography.css';

export default function PostEditor(props) {
  const { init, ...rest } = props;
  // note that skin and content_css is disabled to avoid the normal
  // loading process and is instead loaded as a string via content_style
  return (
    <TinyEditor
      init={{
        ...init,

        skin: false,
        content_css: false,
        body_class:
          'max-w-none p-4 format format-sm sm:format-base lg:format-lg format-blue text-gray-700',
        content_style: [
          contentCss,
          contentUiCss,
          flowbiteTypographyStyles,
          init.content_style || '',
        ].join('\n'),

        height: 700,
        placeholder: 'Type here...',

        plugins: [
          'advlist',
          'anchor',
          'autolink',
          'autoresize',
          'autosave',
          'charmap',
          'codesample',
          'fullscreen',
          'help',
          'image',
          'link',
          'lists',
          'pagebreak',
          'preview',
          'quickbars',
          'save',
          'searchreplace',
          'table',
          'wordcount',
        ],

        menubar: true,
        quickbars_selection_toolbar:
          'blocks | forecolor backcolor removeformat | quicklink blockquote',
        quickbars_insert_toolbar: 'quickimage quicktable hr',
        toolbar: [
          'undo redo save preview',
          'blocks',
          'bold italic underline strikethrough codesample',
          'bullist numlist',
          'forecolor backcolor removeformat',
          'alignleft aligncenter alignright alignjustify',
          'outdent indent',
        ].join(' | '),
        toolbar_sticky: true,

        autosave_interval: '20s',
        automatic_uploads: false,

        image_caption: true,
        image_uploadtab: true,
        images_upload_url: process.env.NEXT_PUBLIC_API_URL + '/images',
        images_upload_base_path: process.env.NEXT_PUBLIC_API_URL,
        images_upload_credentials: true,
      }}
      {...rest}
    />
  );
}
