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

  const pageUrlValue = Number(searchParams.get(searchParamKey)) || 1
  const page = pageUrlValue > 0 ? pageUrlValue : 1
  const isPageInSearchParams = searchParams.has(searchParamKey)

  useEffect(() => {
    if (isPageInSearchParams) {
      fetchData({ limit: page * cardsPerPage })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onResponse = useCallback(
    (response) => {
      if (searchParams.has(searchParamKey)) {
        setData((prev) => [...prev, ...response.items])
      } else {
        setData(response.items)
      }
    },
    [searchParamKey, searchParams]
  )

  const serviceFn = useCallback(
    (params) =>
      service({
        limit: cardsPerPage,
        ...params
      }),
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