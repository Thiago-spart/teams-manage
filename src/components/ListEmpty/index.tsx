import { ListEmptyProps } from "./types"

import * as S from "./styles"

export const ListEmpty: React.FC<ListEmptyProps> = ({ message }) => {
	return (
		<S.Container>
			<S.Message>{message}</S.Message>
		</S.Container>
	)
}