import { ButtonIcon } from "@components/ButtonIcon"
import { LightSpeedInLeft, Layout, LightSpeedOutRight } from "react-native-reanimated"
import * as S from "./styles"
import { PlayerCardProps } from "./types"

export const PlayerCard: React.FC<PlayerCardProps> = ({ name, onRemove }) => {
	return (
		<S.Container
			entering={LightSpeedInLeft}
			layout={Layout.springify()}
			exiting={LightSpeedOutRight}
		>
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