import { Button } from "@components/Button";
import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ListEmpty } from "@components/ListEmpty";
import React from "react";
import { FlatList } from "react-native";
import * as S from "./styles"

import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { groupsGetAll } from "@storage/group/groupsGetAll";
import { Loading } from "@components/Loading";
import { useQuery } from "@tanstack/react-query";

export const Groups: React.FC = () => {
  const navigation = useNavigation()

	const { data, isLoading, refetch } = useQuery({ queryKey: ["groups"], queryFn: () => groupsGetAll(), staleTime: 300 })

  const handleNewGroup = () => {    
    navigation.navigate("new")
  }

  const handleOpenGroup = (group: string) => {
    navigation.navigate("players", { group })
  }

	useFocusEffect(React.useCallback(()=> {
    refetch()
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
          data={data}
          keyExtractor={ item => item }
          renderItem={({ item }) => (
            <GroupCard onPress={() => handleOpenGroup(item)} title={item} />
          )}
          contentContainerStyle={data?.length === 0 && { flex: 1 }}
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
