import { RFValue } from "react-native-responsive-fontsize";
import { RectButton} from 'react-native-gesture-handler'
import styled from "styled-components/native";

export const Container = styled(RectButton).attrs({
    activeOpacity: 0.7
})`
    background-color: ${({theme}) => theme.colors.shape};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    margin-top: 16px;
    padding: 18px 16px;

`;
export const Category = styled.Text`
    font-family:${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color:${({theme}) => theme.colors.text_dark};
`;
