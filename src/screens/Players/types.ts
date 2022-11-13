export interface RoutesProps {
	group: string;
}

export interface NewPlayerParamsProps {
	newPlayer: {
		name: string;
		team: string;
	},
	group: string;
}

export interface DeletePlayerParamsProps {
	playerName: string
	group: string;
}
