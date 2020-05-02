import { DoczFooter, DoczFeedbackForm } from '@devboldly/react-devboldly-tools';
import { MainContainer as OriginalMainContainer } from 'gatsby-theme-docz/src/components/MainContainer/index';
import React from 'react';
import { themeAdditionsConfig } from '../../theme-additions-config';
import { useScrollTo } from 'react-use-window-scroll';

export const MainContainer = ({ children, ...rest }) => {
  const scrollTo = useScrollTo();
  let showFeedbackForm = typeof window !== 'undefined' && themeAdditionsConfig.feedbackForm.enabled;
  if (showFeedbackForm) {
    for (let i = 0; i < themeAdditionsConfig.feedbackForm.excludedPaths.length; i++) {
      const trimSlashesRegex = /^\/|\/$/g; // Use to remove leading and trailing slashes
      const excludedPath = themeAdditionsConfig.feedbackForm.excludedPaths[i].replace(trimSlashesRegex, '');
      const currentPath = window.location.pathname.replace(trimSlashesRegex, '');
      // Exclude in domain root and of the repo folder (for gh-pages)
      if (
        currentPath === excludedPath ||
        currentPath === themeAdditionsConfig.repoName ||
        currentPath === `${themeAdditionsConfig.repoName}/${excludedPath}`
      ) {
        showFeedbackForm = false;
        break;
      }
    }
  }
  return (
    <OriginalMainContainer {...rest}>
      {children}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={e => scrollTo({ left: 0, top: 0, behavior: 'smooth' })}>⬆ Scroll To Top</button>
      </div>
      {showFeedbackForm && (
        <div
          style={{
            border: 'solid 1px #bdcee2',
            padding: '20px',
            marginTop: '50px',
          }}
        >
          <DoczFeedbackForm
            formActionUrl={themeAdditionsConfig.feedbackForm.formActionUrl}
            siteName={themeAdditionsConfig.feedbackForm.siteName}
            pageUrl={window.location.href}
            yesNoFieldName={themeAdditionsConfig.feedbackForm.yesNoFieldName}
            feedbackFieldName={themeAdditionsConfig.feedbackForm.feedbackFieldName}
            siteFieldName={themeAdditionsConfig.feedbackForm.siteFieldName}
            pageUrlFieldName={themeAdditionsConfig.feedbackForm.pageUrlFieldName}
          />
        </div>
      )}
      {themeAdditionsConfig.footer.enabled && (
        <DoczFooter
          hideAuthor={themeAdditionsConfig.footer.hideAuthor}
          authorName={themeAdditionsConfig.footer.authorName}
          authorUrl={themeAdditionsConfig.footer.authorUrl}
          hideEmoji={themeAdditionsConfig.footer.hideEmoji}
          hideHolidays={themeAdditionsConfig.footer.hideHolidays}
          hidePoweredBy={themeAdditionsConfig.footer.hidePoweredBy}
          poweredByName={themeAdditionsConfig.footer.poweredByName}
          poweredByUrl={themeAdditionsConfig.footer.poweredByUrl}
        />
      )}
    </OriginalMainContainer>
  );
};
