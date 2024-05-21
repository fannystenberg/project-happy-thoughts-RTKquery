import { keyframes, styled } from "styled-components";

interface SkeletonLoaderProps {
  mode: "circular" | "rectangular";
  height?: string;
  width?: string;
}

const pulsatingAnimation = keyframes`
    0% {
        background-color: #eee;
    }
    50% {
        background-color: #ccc;
    }
    100% {
        background-color: #eee;
    }
`;

export const SkeletonLoader = styled.div<SkeletonLoaderProps>`
  height: ${(props) => props.height || "100px"};
  width: ${(props) => props.width || "100px"};
  animation: ${pulsatingAnimation} 6s ease-in-out infinite;
  border-radius: ${(props) => (props.mode === "circular" ? "50%" : "6px")};
`;
