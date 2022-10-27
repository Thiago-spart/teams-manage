import { useTheme } from "styled-components/native"
import * as S from "./styles"
import { InputProps } from "./types"

export const Input: React.FC<InputProps> = ({ inputRef, ...rest}) => {
	const { COLORS } = useTheme()
	
	return (
		<S.Container 
			ref={inputRef}
			placeholderTextColor={COLORS.GRAY_300}
			{...rest} 
		/>
	)
}