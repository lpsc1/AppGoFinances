import styled , { css } from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

interface ContainerProps {
    isActive: boolean;
    type: 'up' |'down';
}

export const Container = styled(RectButton)<ContainerProps>`
    width: 48%;
    flex-direction: row;
    align-items: center;
    border: ${({isActive}) => isActive ? 0 : 1.5}px;
    border-style: solid;
    border-color: ${({theme}) => theme.colors.text};
    border-radius: 5px;
    padding: 16px;
    justify-content: center;

    ${({ isActive, type }) => isActive && type === 'up' && css`
        background-color: ${({theme}) => theme.colors.green_light};
    `};
    ${({ isActive, type }) => isActive && type === 'down' && css`
        background-color: ${({theme}) => theme.colors.red_light};
    `}
`;
export const Title = styled.Text`
    font-family: ${({theme})=> theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.colors.title};
    margin-left: 12px;
`;