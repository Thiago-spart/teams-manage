import * as S from "./styles"
import { ButtonProps } from "./types"

export const Button: React.FC<ButtonProps> = ({ title, type = "PRIMARY", ...rest }) => {
	return (
		<S.Container type={type} {...rest}>
			<S.Title>{title}</S.Title>
		</S.Container>
	)
}