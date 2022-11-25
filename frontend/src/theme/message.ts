
import styled from "styled-components"
import theme from "."


export const Container = styled.div`
padding:20px;
border: 1px solid ${theme.colors.middleColor};
border-radius: ${theme.roundness};
margin: 3px;
`

export const TopContainer = styled.div`

display: grid;
grid-template-columns: 1fr 1fr 1fr;
padding : 10px;
padding-bottom: 20px;
border-radius: ${theme.roundness};



`

export const MiddleContainer = styled.div`
padding : 10px;
padding-top: 20px;
padding-bottom: 20px;
border-top: 1px solid ${theme.colors.lowEmphasis};
border-bottom: 1px solid ${theme.colors.lowEmphasis};
cursor: pointer;

`

export const BottomContainer = styled.div`
display: grid;
grid-template-columns: 1fr;
gap: 10px;
padding : 10px;
text-align: center;
border-radius: ${theme.roundness};


&:hover {
  background-color: ${theme.colors.lowEmphasis};
}
`

export const Stat = styled.div`
`

export const Name = styled.div`
font-weight: ${theme.fontWeights.bold};
`
export const ProfileName  = styled.div`
color: ${theme.colors.middleColor};
cursor: pointer;
`

export const ProfileImg = styled.img`
width 3em;
height: 3em;
background-color: ${theme.colors.secondryColor};
border-radius: 50%;
cursor: pointer;
`

export const Input = styled.textarea`
padding: 10px;
height: 70px;
width: 80%;
word-break: break-word;
border: 1px solid ${theme.colors.middleColor};
border-radius: ${theme.roundness};
`
