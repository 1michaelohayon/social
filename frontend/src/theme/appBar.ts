
import styled from "styled-components"
import theme from "."

export const Container = styled.header`
position: fixed;
top: 0;
display: grid;
grid-template-columns: 1fr 1fr 1fr;
background: ${theme.colors.primaryColor};
width: 100%;
padding: 10px;
grid-gap: 1rem;
`
export const ProfileImg = styled.img`
width 2em;
height: 2;
background-color: ${theme.colors.secondryColor};
border-radius: 50%;
cursor: pointer;
`
export const TabsContainer = styled.tbody`
display: flex;
list-style: none;



`

export const Tab = styled.tr`

`
export const TabButton = styled.button`
background: ${theme.colors.primaryColor};
font-size: 1em;
color: ${theme.colors.secondryColor};
padding: 1em 1.5em;
border: 1.5px solid ${theme.colors.secondryColor};
border-radius: ${theme.roundness};
cursor: pointer;
margin-left:10px;
margin-right: 10px;

@media (max-width: 800px) {
  border: 1px solid ${theme.colors.secondryColor};
  margin-left: 0px;
  margin-right: 0px;
  padding: 0.25em 1em;
}
`
