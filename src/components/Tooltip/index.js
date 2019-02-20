import React from 'react';
import styled from 'styled-components';

const StyledTooltip = styled.div`
position: absolute;
color: #242424;
background: #fbfbfb;
box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.08);
border-radius: 4px;
padding: 8px 12px;
opacity: 1;
pointer-events: auto;
z-index: 300;
top: 50%;
transform: translateY(-50%);
left: 100%;
margin-left: 12px;

.Content {
  white-space: nowrap;
  font-size: 13px;
  line-height: 16px;
}
`;

const Tooltip = ({ children }) => (
<StyledTooltip className="Tooltip">
  <div className="Content">{children}</div>
</StyledTooltip>
);

export default Tooltip;