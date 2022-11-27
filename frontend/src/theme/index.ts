import styled from "styled-components"

const theme = {
  roundness: "0.36rem",
  shadow: "1.0px 1.0px 3px black",
  colors: {
    primaryColor: "#000001",
    secondryColor: "#ffffff ",
    middleColor: "#808080",
    accent: "linear-gradient(-15deg, rgba(90,156,255,1) 0%, rgba(109,199,255,1) 100%);",
    lowEmphasis: "#e6e2d8",
    error: "#f7401c",
    info: "#d19844",
    success: "#009e81",
  },
  fontSizes: {
    small: "0.8em",
    body: "1em",
    subheading: "1.5em",
  },
  font: "Arial",
  fontWeights: {
    normal: '400',
    bold: '700',
  },
}

export const PrimaryButton = `
padding: 10px;
padding-left: 20px;
padding-right: 20px;
border-radius: ${theme.roundness};
border: 0px;
color: ${theme.colors.primaryColor};
cursor: pointer;
margin-top: 5px;
margin-bottom: 5px;
color: ${theme.colors.primaryColor};
font-weight: ${theme.fontWeights.bold};

&:hover, &:focus {
  -webkit-filter: brightness(120%);

}


`


export default theme

export const AppContainer = styled.div`
background: ${theme.colors.secondryColor}; 
`

export const MainContainer = styled.div`
margin-top:55px;
`