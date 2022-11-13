import { ButtonIcon, Button, Filter, Header, Highlight, Input, ListEmpty, Loading, PlayerCard } from "@components/index"

import { DeletePlayerParamsProps, NewPlayerParamsProps, RoutesProps } from "./types"

import { useRoute, useNavigation } from "@react-navigation/native"
import React from "react"
import { Alert, FlatList, TextInput } from "react-native"
import { useMutation, useQuery } from "@tanstack/react-query"

import { groupRemoveByName } from "@storage/group/groupRemoveByName"
import { playerAddByGroup } from "@storage/player/playerAddByGroup"
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup"
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam"
import { AppError } from "@utils/AppError"

import * as S from "./styles"
import { queryClient } from "@services/queryClient"

export const Players: React.FC = () => {
	const [newPlayerName, setNewPlayerName] = React.useState("")
	const [team, setTeam] = React.useState<string>("Time A")
	const navigation = useNavigation()

	const newPlayerNameInputRef = React.useRef<TextInput>(null)
	
	const { data, isLoading, refetch } = useQuery(["players"], () => playersGetByGroupAndTeam(group, team))
	
	const route = useRoute()
	
	const { group } = route.params as RoutesProps

	const addPlayerMutation = useMutation((newPlayerData: NewPlayerParamsProps) => {
		return playerAddByGroup(newPlayerData.newPlayer, newPlayerData.group);
	}, { onError(error) {
		if(error instanceof AppError) {
			Alert.alert("Nova pessoa", error.message);
		} else {
			Alert.alert("Nova pessoa", "Não foi possível adicionar.")
		}
	}, onSuccess() {
			newPlayerNameInputRef.current?.blur();
			
			setNewPlayerName("")
			refetch()
	},})

	const removePlayerMutation = useMutation((newPlayerData: DeletePlayerParamsProps) => {
		return playerRemoveByGroup(newPlayerData.playerName, newPlayerData.group)
	}, { onError: () => {
		Alert.alert("Remover pessoa", "Não foi possível remover pessoa.")
	}, onSuccess: () => {
		refetch()
	},})

	const removeGroupMutation = useMutation((group: string) => {
		return groupRemoveByName(group)
	}, { onError: () => {
		Alert.alert("Remover grupo", "Não foi possível remover o grupo.")
	}, onSuccess: () => {
		navigation.navigate("groups")
	}})
	
	const handleAddPlayer = async () => {
		if(newPlayerName.trim() === "") {
			return Alert.alert("Nova pessoa", "informe o nome da pessoa para adicionar")
		}

		const newPlayerData = {
			newPlayer: {
				name: newPlayerName,
				team,
			},
			group
		}

		addPlayerMutation.mutate(newPlayerData)
	}

	const handleRemovePlayer = async (playerName: string) => {
		removePlayerMutation.mutate({
			playerName,
			group
		})
	}

	const handleSwitchTeam = (currentTime: string) => {
		setTeam(currentTime)

		refetch()
	}

	const groupRemove = async () => {
		removeGroupMutation.mutate(group)
	}

	const handleRemoveGroup = () => {
		Alert.alert(
			"Remover",
			"Deseja remover o time?",
			[
				{ text: "Não", style: "cancel" },
				{ text: "Sim", onPress: () => groupRemove() },
			]
		)
	}

	return (
		<S.Container>
			<Header showBackButton />

			<Highlight
				title={group}
				subtitle="adicione a galera e separe os times"
			/>

			<S.Form>
				<Input 
					placeholder="Nome da Pessoa"
					autoCorrect={false}
					value={newPlayerName}
					onChangeText={setNewPlayerName}
					inputRef={newPlayerNameInputRef}
					onSubmitEditing={handleAddPlayer}
					returnKeyType="done"
				/>

				<ButtonIcon icon="add" onPress={handleAddPlayer} />
			</S.Form>

			<S.HeaderList>
				<FlatList
					data={["Time A", "Time B"]}
					keyExtractor={item => item}
					renderItem={({ item }) => (
						<Filter
							title={item}
							isActive={item === team}
							onPress={() => handleSwitchTeam(item)}
						/>
					)}
					horizontal
				/>
				
				<S.NumberOfPlayers>
					{data?.length}
				</S.NumberOfPlayers>
			</S.HeaderList>

			{isLoading ? <Loading /> : (
				<FlatList
					data={data}
					keyExtractor={item => item.name}
					renderItem={({ item }) => (
						<PlayerCard
							name={item.name}
							onRemove={() => handleRemovePlayer(item.name)}
						/>
					)}
					ListEmptyComponent={() => (
						<ListEmpty
							message="Não há pessoas nesse time."
						/>
					)}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={[
						{ paddingBottom: 100 },
						data?.length === 0 && { flex: 1 },
					]}
				/>
			)}

			<Button 
				title="Remover turma" 
				type="SECONDARY" 
				onPress={handleRemoveGroup}
			/>

		</S.Container>
	)
}