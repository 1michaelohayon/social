

import styled from "styled-components"
import theme from "."

export const Container = styled.header`
overflow: hidden;
display: flex;
text-align: center;
padding-top 2rem;
padding-bottom 2rem;
position: fixed;
z-index: 1;
backdrop-filter: blur(7px);
width: 100%;
height: 100%
`

export const Input = styled.input`
border-radius: ${theme.roundness};
padding: 14px;
font-size: 17px;
margin-top: 5px;
border-color: ${theme.colors.primaryColor};
margin-bottom: 30px;
`

export const Button = styled.button`
background: ${theme.colors.secondryColor};
font-size: 1em;
padding: 15px;
border: 2px solid ${theme.colors.primaryColor};
font-color: ${theme.colors.primaryColor};
border-radius: ${theme.roundness};
cursor: pointer;
`