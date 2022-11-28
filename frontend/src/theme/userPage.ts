

import styled from "styled-components"
import theme, {PrimaryButton} from "."


export const Button = styled.button`
${PrimaryButton}
margin: 5px;
background: ${theme.colors.accent};
color: ${theme.colors.secondryColor};
`
export const ProfileImg = styled.img`
width 9rem;
height: 9rem;
background-color: ${theme.colors.secondryColor};
border-radius: 50%;
border: 3px solid ${theme.colors.lowEmphasis};
padding: 0.2rem;
`
export const TopContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center; 
align-items: center;
text-align: center;
padding: 1rem;
`
export const MiddleContainer = styled.div`
display: flex;
flex-direction: column;
padding : 1rem;
text-align: center;

`
export const BottomContainer = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr;
padding : 1rem;
text-align: center;
`

export const Name = styled.div`
font-size: ${theme.fontSizes.subheading};
padding: 0.5rem;
`
export const ProfileName  = styled.div`
color: ${theme.colors.middleColor};
`
export const Tag = styled.div`
color: ${theme.colors.middleColor};
cursor: pointer;
:hover {
  color: ${theme.colors.primaryColor};
}
`
export const Stat = styled.p`
font-weight: ${theme.fontWeights.bold};
`