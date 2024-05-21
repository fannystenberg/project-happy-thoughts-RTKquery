import styled, { keyframes } from "styled-components";

const smileysArray = [
  "😃",
  "😍",
  "😊",
  "🥳",
  "🤩",
  "😃",
  "😍",
  "😊",
  "🥳",
  "🤩",
];

const Background = () => {
  return (
    <>
      {smileysArray.map((smiley, index) => (
        <Smiley key={index} $index={index}>
          {smiley}
        </Smiley>
      ))}
    </>
  );
};

export default Background;

const animationDelays = [
  "0.6s",
  "3s",
  "2s",
  "5s",
  "1s",
  "7s",
  "6s",
  "8s",
  "6s",
  "4s",
];

const animate = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  70% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(-800px) rotate(360deg);
    opacity: 0;
  }
`;

const Smiley = styled.span<{ $index: number }>`
  position: fixed;
  bottom: -80px;
  animation: ${animate} 10s linear infinite;
  font-size: 60px;
  z-index: -1;
  left: ${({ $index }) => ($index + 1) * 10}%;
  animation-delay: ${({ $index }) => animationDelays[$index]};
`;
