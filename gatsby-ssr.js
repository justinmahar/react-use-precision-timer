import React from 'react';

// Google site verification for Docz
const googleSiteVerification = 'm3gim8TmX19i4PGPoMR4_6j4eSThtszNtFH9QRBKQlY';

export const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  if (googleSiteVerification) {
    const headComponents = getHeadComponents();
    headComponents.push(
      <meta key="google-site-verification" name="google-site-verification" content={googleSiteVerification} />
    );
    replaceHeadComponents(headComponents);
  }
};
