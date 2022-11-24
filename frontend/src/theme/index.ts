import styled from "styled-components"

const theme = {
  roundness: "0.36rem",
  colors: {
    primaryColor: "#000001",
    secondryColor: "#ffffff ",
    middleColor: "#808080",
    lowEmphasis: "gray",
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

export default theme

export const AppContainer = styled.div`
background: ${theme.colors.secondryColor}; 

`
