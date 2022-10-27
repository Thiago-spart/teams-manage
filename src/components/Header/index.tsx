import * as S from "./styles"

import logoImg from "@assets/logo.png"
import { HeaderProps } from "./types"
import { useNavigation } from "@react-navigation/native"

export const Header: React.FC<HeaderProps> = ({ showBackButton = false }) => {
	const navigation = useNavigation()
	
	const handleGoBack = () => {
		navigation.navigate("groups")
	}
	
	return (
		<S.Container>
			{showBackButton && (
				<S.BackButton onPress={handleGoBack}>
					<S.BackIcon />
				</S.BackButton>
			)}
			
			<S.Logo source={logoImg} />
		</S.Container>
	)
}