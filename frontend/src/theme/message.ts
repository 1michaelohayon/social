
import styled from "styled-components"
import theme, {PrimaryButton} from "."


export const Container = styled.div`
padding-left: 15px;
padding-right: 15px;
border: 1px solid ${theme.colors.middleColor};
border-radius: ${theme.roundness};
margin: 3px;
`

export const TopContainer = styled.div`

display: grid;
grid-template-columns: 1fr 1fr 1fr;
padding : 10px;
border-radius: ${theme.roundness};



`

export const MiddleContainer = styled.div`
display: flex;
padding : 10px;
padding-top: 20px;
padding-bottom: 20px;
border-top: 1px solid ${theme.colors.lowEmphasis};
border-bottom: 1px solid ${theme.colors.lowEmphasis};
cursor: pointer;
word-break: break-all;
`

export const BottomContainer = styled.div`
display: grid;
grid-template-columns: 1fr;
gap: 10px;
padding : 10px;
text-align: center;
border-radius: ${theme.roundness};



`

export const Stat = styled.div`
`

export const Name = styled.div`
font-weight: ${theme.fontWeights.bold};
align-self: center;

`
export const ProfileName = styled.div`
color: ${theme.colors.middleColor};
align-self: center;
cursor: pointer;
`

export const ProfileImg = styled.img`
width 3em;
height: 3em;
background-color: ${theme.colors.secondryColor};
border-radius: 50%;
cursor: pointer;
border: 1px solid ${theme.colors.lowEmphasis};
padding: 0.2rem;
&:hover, &:focus & {
  -webkit-filter: brightness(80%);
}

`

export const Input = styled.textarea`
padding: 10px;
height: 70px;
width: 80%;
word-break: break-word;
border: 1px solid ${theme.colors.middleColor};
border-radius: ${theme.roundness};
`

export const InputContainer = styled.div`
text-align: center;

`

export const ReplyContainer = styled.div`
background-color: ${theme.colors.lowEmphasis};
display:flex;
flex-direction: column;

`

export const MainMessageContainer = styled.div`
`
export const Button = styled.button`
${PrimaryButton}
background: ${theme.colors.accent};
color: ${theme.colors.secondryColor};
`
export const SecondryButton = styled.button`
${PrimaryButton}
padding: 0.5rem;
`

export const ReplyTo = styled.div`
text-align: center;
cursor: pointer;
color: ${theme.colors.middleColor};
`
