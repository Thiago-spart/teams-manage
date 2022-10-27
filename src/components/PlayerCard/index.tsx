import { ButtonIcon } from "@components/ButtonIcon"
import * as S from "./styles"
import { PlayerCardProps } from "./types"

export const PlayerCard: React.FC<PlayerCardProps> = ({ name, onRemove }) => {
	return (
		<S.Container>
			<S.Icon name="person" />
			
			<S.Name>{name}</S.Name>

			<ButtonIcon 
				icon="close" 
				type="SECONDARY"
				onPress={onRemove}
			/>
		</S.Container>
	)
}