import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, Title } from "./styles";
import { Feather } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import theme from "../../../global/styles/theme";


interface Props extends TouchableOpacityProps {
    title: string;
    type: 'up' | 'down';
    isActive: boolean;
}
const icon = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle'
}
const iconColor = {
    up: theme.colors.green,
    down: theme.colors.red
}

export function TransactionTypeButton({title, type, isActive, ...rest}: Props) {
    return(
        <Container {...rest} isActive={isActive} type={type} >
            <Feather name={icon[type]} size={RFValue(24)} color={iconColor[type]}/>

            <Title>
                {title}
            </Title>

        </Container>
    )
}