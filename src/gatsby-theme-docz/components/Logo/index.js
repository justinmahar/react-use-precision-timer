/** @jsx jsx */
import { jsx, Flex } from 'theme-ui';
import { Link, useConfig } from 'docz';
import { themeAdditionsConfig } from '../../theme-additions-config';

import * as styles from 'gatsby-theme-docz/src/components/Logo/styles';

export const Logo = () => {
  const config = useConfig();
  let logoImageUrl = themeAdditionsConfig.logoImageUrl;
  // Allow us to see the logo when developing locally
  if (typeof window !== 'undefined' && typeof logoImageUrl === 'string' && window.location.host.includes('localhost')) {
    logoImageUrl = logoImageUrl.replace(themeAdditionsConfig.publicUrl, '/public');
  }
  return (
    <Flex alignItems="center" sx={styles.logo} data-testid="logo">
      <Link to="/" sx={styles.link}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {logoImageUrl ? (
            <img
              src={logoImageUrl}
              style={{
                width: '24px',
                marginRight: '10px',
                userSelect: 'none',
                filter:
                  'drop-shadow(1px 1px 0 black) drop-shadow(-1px -1px 0 black) drop-shadow(-1px 1px 0 black) drop-shadow(1px -1px 0 black)',
              }}
            />
          ) : (
            undefined
          )}
          {config.title}
        </div>
      </Link>
    </Flex>
  );
};
