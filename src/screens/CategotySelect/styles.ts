import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import theme from "../../global/styles/theme";

interface CategoryProps {
    isActive: boolean;
}

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
`;
export const Header = styled.View`
    width: 100%;
    height: ${RFValue(113)}px;
    background-color: ${({theme}) => theme.colors.blue};
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
`;
export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
    color: ${({theme}) => theme.colors.shape};
`;

export const Category = styled.TouchableOpacity<CategoryProps>`
    width: 100%;
    padding: ${RFValue(15)}px;
    flex-direction: row;
    align-items: center;

    background-color: ${({isActive}) =>
        isActive ? theme.colors.shape : theme.colors.background
    };
`;
export const Name = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    margin-left: 16px;
`;

export const Separator = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.text};
`;

export const Footer = styled.View`
    width: 100%;
    padding: 24px;
`;


