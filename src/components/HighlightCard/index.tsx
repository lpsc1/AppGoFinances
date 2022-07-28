import React from 'react';
import{ Feather} from '@expo/vector-icons';
import { Container, Header, Title, Footer, Amount, LastTransaction } from './styles';
import { RFValue } from 'react-native-responsive-fontsize';

interface HighlightCardProps {
    title: string;
    amount: string;
    lastTransaction: string;
    type: 'up' | 'down' | 'total';
    color: 'green' | 'red' | 'white'
}

const icon = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
    total: 'dollar-sign'
}

export function HighlightCard({ title, amount, lastTransaction, type, color }: HighlightCardProps) {
    return (
        <Container type={type}>
            <Header>
                <Title type={type}>{title}</Title> 

                <Feather name={icon[type]} size={RFValue(40)} color={color} />


            </Header>
            <Footer>
                <Amount type={type}>
                    {amount}
                </Amount>
                <LastTransaction type={type}>
                    {lastTransaction}
                </LastTransaction>
            </Footer>
        </Container>
    )
}