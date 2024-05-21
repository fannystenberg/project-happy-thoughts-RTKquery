import styled from "styled-components";

const Footer = () => {
  return (
    <StyledFooter>
      <Contact aria-hidden="true">
        <p>
          CREATED BY FANNY STENBERG
          <br />
          STUDENT @ TECHNIGO 2023
        </p>
        <ContactMeBtn
          type="button"
          onClick={() => window.open("https://fannystenberg.netlify.app/")}
        >
          Contact
        </ContactMeBtn>
      </Contact>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.footer`
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: black;
  opacity: 0.6;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Contact = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin: 0;
  padding: 10px;
  color: white;
  text-align: center;
  font-weight: 600;
`;

const ContactMeBtn = styled.button`
  margin: 0 0 0 20px;
  border-radius: 15px;
  background: transparent;
  color: white;
  border: 2px solid white;
  padding: 10px;
  font-weight: 600;

  &:hover {
    background: white;
    color: black;
  }
`;
