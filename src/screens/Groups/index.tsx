import { Button } from "@components/Button";
import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ListEmpty } from "@components/ListEmpty";
import React from "react";
import { Alert, FlatList } from "react-native";
import * as S from "./styles"

import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { groupsGetAll } from "@storage/group/groupsGetAll";
import { Loading } from "@components/Loading";

export const Groups: React.FC = () => {
	const [isLoading, setIsLoading] = React.useState(true);
  const [groups, setGroups] = React.useState<Array<string>>([])
  const navigation = useNavigation()

  const handleNewGroup = () => {    
    navigation.navigate("new")
  }

  const fetchGroups = async () => {
    try {
      setIsLoading(true)
      const data = await groupsGetAll();

      setGroups(data)
    } catch (error) {
      console.log(error)
      Alert.alert("Turmas", "Mão foi possível carregar as turmas")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenGroup = (group: string) => {
    navigation.navigate("players", { group })
  }

  useFocusEffect(React.useCallback(()=> {
    fetchGroups()
  }, []))
  
  return (
    <S.Container>
      <Header />

      <Highlight 
        title="Turmas" 
        subtitle="jogue com a sua turma"
      />

      {isLoading ? <Loading /> : (
        <FlatList 
          data={groups}
          keyExtractor={ item => item }
          renderItem={({ item }) => (
            <GroupCard onPress={() => handleOpenGroup(item)} title={item} />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty message="Que tal cadastrar a primeira turma?" />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}


      <Button 
        title="Criar nova turma" 
        onPress={handleNewGroup}
      />

    </S.Container>
  );
}
