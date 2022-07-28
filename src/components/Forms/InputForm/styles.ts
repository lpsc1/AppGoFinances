import styled from "styled-components/native";

export const Container = styled.View`
    width: 100%;
`;
export const Error = styled.Text`
    font-size: 14px;
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.red_light};
    margin: 7px;
`;

