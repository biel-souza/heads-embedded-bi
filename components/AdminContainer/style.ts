import styled from "styled-components";

interface ContentProps {
  open: boolean;
  drawerWidth: number;
}

export const Content = styled.div<ContentProps>`
  width: 100%;
  height: 100%;
  margin-top: 64px;
  padding: 25px;
  padding-left: ${(props) => (props.open ? 25 + props.drawerWidth : 25)}px;
`;
