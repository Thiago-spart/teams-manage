import * as S from "./styles"
import { HighlightProps } from "./types"

export const Highlight: React.FC<HighlightProps> = ({ title, subtitle }) => {
	return (
		<S.Container>
			<S.Title>
				{title}
			</S.Title>

			<S.Subtitle>
				{subtitle}
			</S.Subtitle>
		</S.Container>
	)
}