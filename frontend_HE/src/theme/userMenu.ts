

import styled from "styled-components"
import theme, { PrimaryButton } from "."


export const Container = styled.div`
top: 3.7em;
display:flex;
flex-direction: column;
justify-content: center;
text-align: center;
background-color: ${theme.colors.lowEmphasis};
z-index: 0.9;
width: 100%;
height: 100%
padding: 50px;
position: fixed;
`


export const Button = styled.button`
${PrimaryButton}
background: ${theme.colors.accent};
color: ${theme.colors.secondryColor};
`
export const SecondryButton = styled.button`
background-color: #D3D3D3;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
${PrimaryButton}
`


export const SearchItem = styled.div`
display: grid;
text-align: center;
grid-template-columns: 1fr 1fr;
align-items: center;
color: ${theme.colors.primaryColor};
padding: 15px;
border: 1px solid ${theme.colors.middleColor};
background-color: ${theme.colors.lowEmphasis};
`

export const ProfileImg = styled.img`
width 3em;
height: 3em;
background-color: ${theme.colors.secondryColor};
border-radius: 50%;
`

export const SearchedContainer = styled.div`
left: 0;
right: 0;
position: fixed;
z-index: 0.9;
text-align: center;

`

export const UserContainer = styled.div`
cursor: pointer;
`

export const MessageContainer = styled.div`
cursor: pointer;

`