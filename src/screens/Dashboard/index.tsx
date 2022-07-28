import React, { useCallback, useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton,
  LoadContainer,
} from "./styles";
import theme from "../../global/styles/theme";
import { RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, DataProps } from "../../components/TransactionCard";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";
import { useAuth } from "../../hooks/auth";

export interface DataListProps extends DataProps {
  id: string;
}
interface HighlightProps {
  amount: string;
  lastTransaction: string;
}
interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [isLoading, setisLoading] = useState(true);
  const theme = useTheme();
  const { signOut, user } = useAuth();

  function getLasTransactionDate(
    collection: DataListProps[],
    type: "positive" | "negative"
  ) {
    const collectionFilttered = collection.filter(
      (transaction) => transaction.type === type
    );
    if (collectionFilttered.length === 0) {
      return 0;
    }

    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collectionFilttered.map((transaction) =>
          new Date(transaction.date).getTime()
        )
      )
    );

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      "pt-BR",
      {
        month: "long",
      }
    )}`;
  }

  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );
  async function loadTransaction() {
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type === "positive") {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        };
      }
    );

    setTransactions(transactionsFormatted);

    const lastTransactionEntries = getLasTransactionDate(
      transactions,
      "positive"
    );
    const lastTransactionExpensives = getLasTransactionDate(
      transactions,
      "negative"
    );
    const totalInterval =
      lastTransactionExpensives === 0
        ? `Não há transações`
        : `01 a ${lastTransactionExpensives}`;

    const total = entriesTotal - expensiveTotal;
    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:
          lastTransactionEntries === 0
            ? `Não há transações`
            : `Última entrada dia ${lastTransactionEntries}`,
      },
      expensives: {
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:
          lastTransactionExpensives === 0
            ? `Não há transações`
            : `Última saída dia ${lastTransactionExpensives}`,
      },

      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: totalInterval,
      },
    });
    setisLoading(false);
  }

  useEffect(() => {
    loadTransaction();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransaction();
    }, [])
  );

  async function handleRemoveTransaction(id: string) {
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const transaction = response ? JSON.parse(response) : [];

    const data = transaction.filter((item: DataListProps) => item.id !== id);
    AsyncStorage.setItem(`@gofinances:transactions_user:${user.id}`, JSON.stringify(data));
    setTransactions(data);
    loadTransaction();
  }

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.blue} />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: user.photo,
                  }}
                />
                <User>
                  <UserGreeting>Olá, </UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <>
                <LogoutButton onPress={signOut}>
                  <Ionicons
                    name="power"
                    size={RFValue(30)}
                    color={theme.colors.red}
                  />
                </LogoutButton>
              </>
            </UserWrapper>
          </Header>
          <HighlightCards>
            <HighlightCard
              title="Entrada"
              amount={highlightData.entries.amount}
              lastTransaction={highlightData.entries.lastTransaction}
              type="up"
              color="green"
            />
            <HighlightCard
              title="Saída"
              amount={highlightData.expensives.amount}
              lastTransaction={highlightData.expensives.lastTransaction}
              type="down"
              color="red"
            />
            <HighlightCard
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
              type="total"
              color="white"
            />
          </HighlightCards>
          <Transactions>
            <Title>Listagem</Title>

            <TransactionsList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TransactionCard
                  data={item}
                  handleRemoveTransaction={()=> handleRemoveTransaction(item.id)}
                /> 
              )}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
