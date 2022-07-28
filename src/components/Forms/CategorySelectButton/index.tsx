import React from "react";

import { Container, Category } from "./styles";
import { Feather } from '@expo/vector-icons';
import theme from "../../../global/styles/theme";
import { RFValue } from "react-native-responsive-fontsize";


interface CategoryTypeProps {
    title: string;
    onPress: () => void;
}

export function CategorySelectButton({ title, onPress } : CategoryTypeProps) {
    return(
        <Container onPress={onPress}>
            <Category>{title}</Category>
            <Feather name='chevron-down' size={RFValue(20)} color={theme.colors.text}/>
        </Container>
    )
}