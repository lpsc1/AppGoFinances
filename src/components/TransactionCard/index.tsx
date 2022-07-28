import React, { useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import theme from "../../global/styles/theme";

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  CategoryName,
  Date,
  Header,
} from "./styles";
import { categories } from "../../utils/categories";
import { BorderlessButton } from "react-native-gesture-handler";

export interface DataProps {
  id: string;
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface TransactionsCardProps {
  data: DataProps;
  handleRemoveTransaction: () => void;
}

export function TransactionCard({ data, handleRemoveTransaction }: TransactionsCardProps) {
  const [category] = categories.filter((item) => item.key === data.category);
 
  return (
    <Container>
      <Header>
        <Title>{data.name}</Title>
        <BorderlessButton onPress={handleRemoveTransaction}>
          <Feather
            name='trash'
            size={RFValue(19)}
            color={theme.colors.text}
          /></BorderlessButton>
        

      </Header>
      

      <Amount type={data.type}>
        {data.type === "negative" && "- "}
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Feather
            name={category.icon}
            size={RFValue(19)}
            color={theme.colors.text}
          />
          <CategoryName>{category.name}</CategoryName>
        </Category>

        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
