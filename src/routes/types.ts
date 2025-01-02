export enum TypeRoute {
	private = 'private',
	public = 'public'
}

export type RouteList = {
	name: string
	type: keyof typeof TypeRoute | (keyof typeof TypeRoute)[]
	path: string
	Component: React.ReactNode
}
