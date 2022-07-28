import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface TransactionTypeProps {
    type: 'positive' | 'negative'
}

export const Container = styled.View`
    padding: 17px 24px;
    background-color: ${({ theme }) => theme.colors.shape};
    border-radius: ${RFValue(5)}px;
    margin-bottom: ${RFValue(16)}px;
`;
export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
`;
export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.text_dark};
`;
export const Amount = styled.Text<TransactionTypeProps>`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(20)}px;
    color: ${({ theme, type }) => type === 'positive' ? theme.colors.green : theme.colors.red};
    margin-top: ${RFValue(2)}px;
`;
export const Footer = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 19px;
    justify-content: space-between;
`;

export const Category = styled.View`
    flex-direction: row;
    align-items: center;
`;
export const CategoryName = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.text};
    margin-left: 10px;
`;
export const Date = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.text};

`;
