import React from 'react';

// Google site verification for Docz
const googleSiteVerification = undefined; //'abcdefg123456789hijk_0a9b8c7d6e5f4g3h2i1j0k';

export const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  if (googleSiteVerification) {
    const headComponents = getHeadComponents();
    headComponents.push(
      <meta key="google-site-verification" name="google-site-verification" content={googleSiteVerification} />
    );
    replaceHeadComponents(headComponents);
  }
};
