
import styled from "styled-components"
import theme from "."

export const Container = styled.header`
position: fixed;
top: 0;
display: grid;
grid-template-columns: 1fr 1fr 1fr;
background:linear-gradient(90deg, rgba(255,244,239,1) 0%, rgba(223,222,220,1) 100%);
;
width: 100%;
padding: 15px;
grid-gap: 1rem;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2), 0px 8px 30px rgba(0, 0, 0, 0.1);

`
export const ProfileImg = styled.img`
width 2em;
height:2em;
background-color: ${theme.colors.secondryColor};
border-radius: 50%;
padding: 0.2rem;
background: ${theme.colors.lowEmphasis};
border: 1px solid ${theme.colors.middleColor};
cursor: pointer;
&:hover, &:focus {
  -webkit-filter: brightness(80%);
}
`
export const Title = styled.div`
text-align: center;
font-size: ${theme.fontSizes.subheading};
background: ${theme.colors.accent};
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
cursor: pointer;
&:hover, &:focus {
  -webkit-filter: brightness(120%);
}

`
export const Input = styled.input`
direction: rtl;
border: 1px solid ${theme.colors.middleColor};
border-radius: ${theme.roundness};
padding: 0.5rem;
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
