import { DoczFooter } from "../../tools/DoczFooter";
import { MainContainer as OriginalMainContainer } from "gatsby-theme-docz/src/components/MainContainer/index";
import React from "react";
import { themeAdditionsConfig } from "../../theme-additions-config";
import { useScrollTo } from "react-use-window-scroll";

export const MainContainer = ({ children, ...rest }) => {
  const scrollTo = useScrollTo();
  return (
    <OriginalMainContainer {...rest}>
      {children}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={(e) => scrollTo({ left: 0, top: 0, behavior: "smooth" })}
        >
          ⬆ Scroll To Top
        </button>
      </div>
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
