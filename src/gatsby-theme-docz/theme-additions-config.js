/** Name of your repository */
const repoName = 'react-use-precision-timer';
/** URL to public assets such as images */
const publicUrl = `/${repoName}/public`;

/**
 * Configuration for additions to the default Docz theme.
 * Includes Google Analytics, favicon, a footer, and more.
 */
export const themeAdditionsConfig = {
  /** Name of the project */
  projectName: repoName,
  /** Google Analytics tracking ID */
  gaTrackingId: 'UA-148090679-15',
  /** Used to ensure site runs */
  repoName: repoName,
  /** URL to public assets, such as images. */
  publicUrl,
  /** Location of the favicon. Set to undefined for no favicon. */
  faviconUrl: `${publicUrl}/favicon.ico`,
  /** Image URL for a header logo image. Set to undefined for no logo image. */
  logoImageUrl: `${publicUrl}/favicon.png`,
  /** Footer settings */
  footer: {
    /** Set to false to disable the author/"powered by" footer. */
    enabled: true,
    /** Name of project author */
    authorName: 'Justin Mahar',
    /** URL to author's page */
    authorUrl: 'https://github.com/justinmahar/',
    /** Set to true if you're a grumpy person :) */
    hideEmoji: false,
    /** Hide the "Created with <3 by name" author text from footer. */
    hideAuthor: false,
    /** Holidays like New Year's Day and Pi Day are announced for fun. It's an easter egg. Hide if you want. */
    hideHolidays: false,
    /** Shoutout to what's powering this project. */
    poweredByName: `React${' '}Kindling`,
    /** Link for shoutout. */
    poweredByUrl: `https://github.com/justinmahar/react-kindling`,
    /** Hide the "powered by" text from footer. */
    hidePoweredBy: false,
  },
};
