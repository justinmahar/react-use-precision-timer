/** Name of your repository */
const repoName = 'react-library-starter';
/** URL to public assets such as images */
const publicUrl = `/${repoName}/public`;

/**
 * Configuration for additions to the default Docz theme.
 * Includes Google Analytics, favicon, a footer, and feedback forms.
 */
export const themeAdditionsConfig = {
  /** Name of the project */
  projectName: repoName,
  /** Google Analytics tracking ID */
  gaTrackingId: 'UA-148090679-9',
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
    authorName: 'DevBoldly',
    /** URL to author's page */
    authorUrl: 'https://devboldly.com/',
    /** Set to true if you're a grumpy person :) */
    hideEmoji: false,
    /** Hide the "Created with <3 by name" author text from footer. */
    hideAuthor: false,
    /** Holidays like New Year's Day and Pi Day are announced for fun. It's an easter egg. Hide if you want. */
    hideHolidays: false,
    /** Shoutout to what's powering this project. */
    poweredByName: `react${'-'}library${'-'}starter`,
    /** Link for shoutout. */
    poweredByUrl: `https://github.com/devboldly/react${'-'}library${'-'}starter`,
    /** Hide the "powered by" text from footer. */
    hidePoweredBy: false,
  },
  feedbackForm: {
    /** Set to false to disable "was this page helpful?" feedback forms for whole site. */
    enabled: true,
    /** Site name submitted along with form, so you can track multiple sites with one form. Not shown to user. */
    siteName: repoName,
    /**
     * Create and inspect your google form (i.e. in Chrome dev tools) and retrieve the form action URL.
     * IMPORTANT: Be sure none of the fields have validation or your submits will fail!
     */
    formActionUrl:
      'https://docs.google.com/forms/u/0/d/e/123abc456def789ghi_0123_a-bcdefg1234567HIJKLMNoqrs123yz/formResponse',
    /** Form field name for the yes/no text field */
    yesNoFieldName: 'entry.123456789',
    /** Form field name for the feedback message text field */
    feedbackFieldName: 'entry.234567890',
    /** Form field name for the site name text field */
    siteFieldName: 'entry.345678901',
    /** Form field name for the page URL text field */
    pageUrlFieldName: 'entry.456789012',
    /**
     * Page paths to exclude the feedback form from.
     * Automatically uses repo name above to exclude in gh-pages as well.
     */
    excludedPaths: ['/', '/mit-license', '/code-of-conduct'],
  },
};
