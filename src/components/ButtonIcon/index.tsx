import * as S from './styles'
import { ButtonProps } from './types'

export const ButtonIcon: React.FC<ButtonProps> = ({ type = "PRIMARY", icon, ...rest}) => {
	return (
		<S.Container
			{...rest}
		>
			<S.Icon type={type} name={icon} />
		</S.Container>
	)
}