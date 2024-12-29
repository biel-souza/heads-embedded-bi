import styled from "styled-components";

interface ContentProps {
  open: boolean;
  drawerWidth: number;
}

export const Content = styled.div<ContentProps>`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  margin-top: 64px;
  margin-left: ${(props) => (props.open ? props.drawerWidth : 0)}px;
`;
