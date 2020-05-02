/**
 * Docz Project Configuration.
 *
 * See: https://www.docz.site/docs/project-configuration
 */
const docsConfig = {
  /** The base URL the site will be deployed at. It should always start and end with a slash. */
  base: '/react-library-starter/',
  /** Define the source folder of your components. Only the files in this folder will be parsed. */
  src: './src',
  // /** Glob pattern used to find your files. By default, Docz finds all files inside the source folder that have a .mdx extension. */
  // files: '**/*.{md,markdown,mdx}',
  /** Option used to ignore files to be parsed by docz. */
  ignore: ['README.md', 'README.template.md'],
  // /** Specify the output directory for `docz build` */
  // dest: '.docz/dist',
  // /** The title for your site. This will be the prefix for all page titles and displayed in the sidebar in the default theme. */
  // title: 'Project Name',
  // /** The description for the site. It will be rendered as a <meta> tag in the page HTML. */
  // description: 'Project description.',
  /** This option is used if you need to import Typescript components inside your .mdx files. */
  typescript: true,
  // /** You can disable parsing for performance reasons by setting to false. */
  // propsParser: true,
  // /** Use this option to change the filepath of Docz config file. */
  // config: 'my-docz-config.js',
  // /** Option used to set a public folder of your project */
  // public: '/public',
  // /** Use this setting to debug your application and remove all progress bar from bundler. */
  // debug: false,
  // /** Branch used to edit your document when clicking on Github button. */
  // editBranch: 'master',
  // /** Specify the host to use for the dev server. */
  // host: '127.0.0.1',
  // /** Specify the port to use for the dev server. */
  // port: 3000,
  // /** This is the config that you can use to customize your theme. */
  // themeConfig: {},
  // /** Use this option to specify the order of your documents in the menu. */
  menu: ['Home', { name: 'Components' }, { name: 'Hooks' }, 'Code of Conduct', 'MIT License'],
  /** Specify an array of plugins that you want to use. */
  // plugins: [],
  // /** Array of remark plugins to manipulate the MDXAST */
  // mdPlugins: [],
  // /** Array of rehype plugins to manipulate the MDXHAST */
  // hastPlugins: [],
};

export default docsConfig;
