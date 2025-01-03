import { useEffect, useState } from 'react'
import { PaginatedData } from '../models'
import { useAlertContext } from '../contexts/alert/AlertContext'

interface UsePaginationOptions<T> {
	fetchData: (page: number, pageSize: number) => Promise<PaginatedData<T>>
	initialPage?: number
	initialPageSize?: number
}

export function usePagination<T>({
	fetchData,
	initialPage = 1,
	initialPageSize = 10
}: UsePaginationOptions<T>) {
	const [data, setData] = useState<T[]>([])
	const [page, setPage] = useState<number>(initialPage)
	const [pageSize, setPageSize] = useState<number>(initialPageSize)
	const [total, setTotal] = useState<number>(0)
	const [loading, setLoading] = useState<boolean>(false)
	const { showError } = useAlertContext()

	const loadPage = async (page: number, pageSize: number) => {
		setLoading(true)
		try {
			const response = await fetchData(page, pageSize)
			setData(response.data)
			setTotal(response.total)
		} catch (err) {
			showError((err as Error).message || 'Error fetching data')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		loadPage(page, pageSize)
	}, [page, pageSize])

	const nextPage = () => {
		if (page * pageSize < total) {
			setPage((prev) => prev + 1)
		}
	}

	const prevPage = () => {
		if (page > 1) {
			setPage((prev) => prev - 1)
		}
	}

	const setPageAndSize = (newPage: number, newPageSize: number) => {
		setPage(newPage)
		setPageSize(newPageSize)
	}

	const refresh = async () => {
		await loadPage(page, pageSize)
	}
	return {
		refresh,
		data,
		page,
		pageSize,
		total,
		loading,
		nextPage,
		prevPage,
		setPageAndSize
	}
}
