export interface PaginatedData<T> {
	data: T[]
	page: number
	pageSize: number
	total: number
}

export interface LineChartData {
	name: string
	value: number
	data?: any
}
