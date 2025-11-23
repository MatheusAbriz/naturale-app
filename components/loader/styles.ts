import { styled } from 'styled-components/native';
export const Content = styled.View`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1060;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.9);

    svg {
        width: 72px;
        height: 72px;
        position: relative;
        top: 40%;
        left: 50%;
        transform: translateX(-50%);
        margin: auto;
    }
`;