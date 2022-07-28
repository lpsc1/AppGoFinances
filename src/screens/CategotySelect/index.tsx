import React from "react";
import { FlatList } from "react-native";
import { categories } from "../../utils/categories";
import { Feather } from '@expo/vector-icons';


import { Container, Header, Title, Category, Name, Separator, Footer} from "./styles";
import { RFValue } from "react-native-responsive-fontsize";
import theme from "../../global/styles/theme";
import { Button } from "../../components/Forms/Button";

interface CategoryProps {
    key: string;
    name: string;
}

interface Props {
    category: CategoryProps;
    setCategory: (category: CategoryProps) => void;
    closeSelectCategory: () => void;
}

export function CategorySelect({ category, setCategory, closeSelectCategory }: Props) {

    function handleCategorySelect(category: CategoryProps) {
        setCategory(category);
    }

    return (
        <Container>
            <Header>
                <Title>Categoria</Title>

            </Header>

            <FlatList
                data={categories}
                style={{ flex: 1, width: '100%' }}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                    <Category
                        onPress={() => handleCategorySelect(item)}
                        isActive={category.key === item.key }
                    >
                        <Feather name={item.icon} size={RFValue(20)} color={theme.colors.text} />
                        <Name>{item.name}</Name>
                    </Category>
                )}
                ItemSeparatorComponent={() => <Separator />}
            />

            <Footer>
                <Button 
                title="Selecionar"
                onPress={closeSelectCategory}
                />
            </Footer>
        </Container>

    )
}