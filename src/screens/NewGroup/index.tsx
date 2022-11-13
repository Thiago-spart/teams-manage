import { Button } from "@components/Button"
import { Header } from "@components/Header"
import { Highlight } from "@components/Highlight"
import { Input } from "@components/Input"
import { useNavigation } from "@react-navigation/native"
import { groupCreate } from "@storage/group/groupCreate"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AppError } from "@utils/AppError"
import React from "react"
import { Alert } from "react-native"
import * as S from "./styles"

export const NewGroup: React.FC = () => {
	const [group, setGroup] = React.useState("")
	const navigation = useNavigation() 
	const queryClient = useQueryClient()

	const groupMutation = useMutation((newGroup: string) => {
		return groupCreate(newGroup)		
	}, { onError(error) {
		if(error instanceof AppError) {
			Alert.alert("Novo Grupo", error.message);
		} else {
			Alert.alert("Novo Grupo", "Não foi possível criar um novo grupo.");
			console.log(error)
		}
	}, onSuccess() {
		queryClient.invalidateQueries(['groups'])
		navigation.navigate("players", { group })
	},})
	
	const handleNew = async () => {
		if (group.trim() === "") {
			return Alert.alert("Novo Grupo", "Informe o nome da turma.");
		}

		groupMutation.mutate(group)
	}
	
	return (
		<S.Container>
			<Header showBackButton />

			<S.Content>
				<S.Icon />

				<Highlight
					title="Nova turma"
					subtitle="crie a turma para adicionar as pessoas"
				/>

				<Input
					placeholder="Nome da turma"
					value={group}
					onChangeText={setGroup}
				/>

				<Button 
					title="Criar"
					onPress={handleNew}
					style={{ marginTop: 20 }}
				/>
			</S.Content>
		</S.Container>
	)
}