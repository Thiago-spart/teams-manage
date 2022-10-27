import { Button } from "@components/Button"
import { ButtonIcon } from "@components/ButtonIcon"
import { Filter } from "@components/Filter"
import { Header } from "@components/Header"
import { Highlight } from "@components/Highlight"
import { Input } from "@components/Input"
import { ListEmpty } from "@components/ListEmpty"
import { Loading } from "@components/Loading"
import { PlayerCard } from "@components/PlayerCard"
import { useRoute, useNavigation } from "@react-navigation/native"
import { groupRemoveByName } from "@storage/group/groupRemoveByName"
import { playerAddByGroup } from "@storage/player/playerAddByGroup"
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup"
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam"
import { PlayerStorageDTO } from "@storage/player/playerStorageDTS"
import { AppError } from "@utils/AppError"
import React from "react"
import { Alert, FlatList, TextInput } from "react-native"
import * as S from "./styles"
import { RoutesProps } from "./types"

export const Players: React.FC = () => {
	const [isLoading, setIsLoading] = React.useState(true);
	const [newPlayerName, setNewPlayerName] = React.useState("")
	const [team, setTeam] = React.useState<string>("Time A")
	const [players, setPlayers] = React.useState<Array<PlayerStorageDTO>>([])
	const navigation = useNavigation()

	const newPlayerNameInputRef = React.useRef<TextInput>(null)
	
	const route = useRoute()
	
	const { group } = route.params as RoutesProps

	const handleAddPlayer = async () => {
		if(newPlayerName.trim() === "") {
			return Alert.alert("Nova pessoa", "informe o nome da pessoa para adicionar")
		}

		const newPlayer = {
			name: newPlayerName,
			team,
		}

		try {
			await playerAddByGroup(newPlayer, group);

			newPlayerNameInputRef.current?.blur();
			
			setNewPlayerName("")
			fetchPlayersByTeam()
		} catch (error) {
			if(error instanceof AppError) {
				Alert.alert("Nova pessoa", error.message);
			} else {
				console.log(error);
				Alert.alert("Nova pessoa", "Não foi possível adicionar.")
			}
		}
	}

	const fetchPlayersByTeam = async () => {
		try {
			setIsLoading(true)
			const playersByTeam = await playersGetByGroupAndTeam(group, team);
			setPlayers(playersByTeam)
		} catch(error) {
			console.log(error)
			Alert.alert("Pessoas", "Não foi possível carregar as pessoas do time selecionado.");
		} finally {
			setIsLoading(false)
		}
	}

	const handleRemovePlayer = async (playerName: string) => {
		try {
			await playerRemoveByGroup(playerName, group);
			fetchPlayersByTeam()
		} catch (error) {
			console.log(error)
			Alert.alert("Remover pessoa", "Não foi possível remover pessoa.")
		}
	}

	const groupRemove = async () => {
		try {
			await groupRemoveByName(group)

			navigation.navigate("groups")
		} catch (error) {
			console.log(error)

			Alert.alert("Remover grupo", "Não foi possível remover o grupo.")
		}
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

	React.useEffect(() => {
		fetchPlayersByTeam()
	}, [team])

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
							onPress={() => setTeam(item)}
						/>
					)}
					horizontal
				/>
				
				<S.NumberOfPlayers>
					{players.length}
				</S.NumberOfPlayers>
			</S.HeaderList>

			{isLoading ? <Loading /> : (
				<FlatList
					data={players}
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
						players.length === 0 && { flex: 1 },
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