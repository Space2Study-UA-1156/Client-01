import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useAxios from '~/hooks/use-axios'

const useViewMore = ({
  service,
  searchParamKey = 'page',
  cardsPerPage = 1
}) => {
  const [data, setData] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  const page = Number(searchParams.get(searchParamKey)) || 1
  const isPageInSearchParams = searchParams.has(searchParamKey)

  useEffect(() => {
    if (isPageInSearchParams) {
      fetchData({ limit: page * cardsPerPage })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isPageInSearchParams) {
      setData([])
    }
  }, [isPageInSearchParams])

  const onResponse = useCallback((response) => {
    setData((prev) => [...prev, ...response.items])
  }, [])

  const serviceFn = useCallback(
    (params) => service({ limit: cardsPerPage, ...params }),
    [service, cardsPerPage]
  )

  const { response, fetchData, error, loading } = useAxios({
    service: serviceFn,
    onResponse,
    defaultResponse: {},
    fetchOnMount: !isPageInSearchParams
  })

  const isViewMoreVisable = response.count > cardsPerPage * page

  const handleViewMore = () => {
    const nextPage = page + 1
    const skip = (nextPage - 1) * cardsPerPage

    searchParams.set(searchParamKey, nextPage)
    setSearchParams(searchParams)

    fetchData({ skip })
  }

  return {
    isViewMoreVisable,
    data,
    handleViewMore,
    loading,
    error
  }
}

export default useViewMore
