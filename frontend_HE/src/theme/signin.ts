

import styled from "styled-components"
import theme, { PrimaryButton } from "."

export const Container = styled.header`
width: 100%;
overflow: hidden;
display: flex;
text-align: center;
justify-content: center;
top: 0;
padding-top 2rem;
padding-bottom 2rem;
position: fixed;
z-index: 1;
backdrop-filter: blur(7px) brightness(0.7);
height: 100%
`

export const Input = styled.input`
direction: rtl;
border-radius: ${theme.roundness};
padding: 14px;
font-size: 17px;
margin-top: 5px;
border-color: ${theme.colors.primaryColor};
margin-bottom: 30px;
`

export const Button = styled.button`
${PrimaryButton}
margin: 5px;
background: ${theme.colors.accent};
color: ${theme.colors.secondryColor};
`
export const SecondryButton = styled.button`
${PrimaryButton}
`