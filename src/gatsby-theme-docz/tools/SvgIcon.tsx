import * as React from 'react';
import styled from 'styled-components';

export interface SvgIconProps {
  hoverEnabled?: boolean;
  backgroundColor?: string;
  size: number;
}

export function SvgIcon({
  hoverEnabled,
  backgroundColor,
  size,
  ...imgProps
}: SvgIconProps & React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>): JSX.Element {
  const padding = Math.round(size * 0.190983);
  return (
    <>
      <div
        style={{
          backgroundColor: backgroundColor,
          padding: padding,
          borderRadius: size,
          display: 'flex',
          ...imgProps.style,
        }}
      >
        {!hoverEnabled && <img width={size} {...imgProps} style={{}} />}
        {hoverEnabled && <StyledImg width={size} {...imgProps} style={{}} />}
      </div>
    </>
  );
}

SvgIcon.defaultProps = {
  backgroundColor: '#ffffff',
  hoverEnabled: true,
};

const StyledImg = styled.img`
  :hover {
    filter: invert(1) sepia(1000%) brightness(25%) saturate(10000%) hue-rotate(155deg);
  }
`;
