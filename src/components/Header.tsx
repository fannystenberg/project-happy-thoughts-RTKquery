import styled, { keyframes } from "styled-components";

const Header = () => {
  return (
    <StyledHeader>
      <PageTitle>Happy thoughts</PageTitle>
    </StyledHeader>
  );
};

export default Header;

const PageTitle = styled.h1`
  font-family: "Chewy", system-ui;
  font-size: 46px;
  text-transform: uppercase;
  background: url("https://images.unsplash.com/photo-1550684848-fac1c5b4e853?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzk0ODY5Njg&ixlib=rb-4.0.3&q=80&w=400");
  background-position: center;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const bounce = keyframes`
  0% {
    animation-timing-function: ease-in;
    opacity: 1;
    transform: translateY(-45px);
  }

  24% {
    opacity: 1;
  }

  40% {
    animation-timing-function: ease-in;
    transform: translateY(-24px);
  }

  65% {
    animation-timing-function: ease-in;
    transform: translateY(-12px);
  }

  82% {
    animation-timing-function: ease-in;
    transform: translateY(-6px);
  }

  93% {
    animation-timing-function: ease-in;
    transform: translateY(-4px);
  }

  25%, 55%, 75%, 87% {
    animation-timing-function: ease-out;
    transform: translateY(0px);
  }

  100% {
    animation-timing-function: ease-out;
    opacity: 1;
    transform: translateY(0px);
  }
`;

const StyledHeader = styled.header`
  padding: 30px 30px 15px 30px;
  text-align: center;
  margin: 0 auto;
  animation: ${bounce} 2s ease-in 0s 1 normal forwards;
`;
