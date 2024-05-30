import { useCallback, useState } from 'react'
import { snackbarVariants } from '~/constants'
import { useSnackBarContext } from '~/context/snackbar-context'
import { reviewService } from '~/services/review-service'
import { userService } from '~/services/user-service'
import useAxios from './use-axios'

const useReview = (author, authorRole, offerId) => {
  const averageRating = author.averageRating[authorRole]

  const [rating, setRating] = useState(
    Number.isInteger(averageRating) ? averageRating.toFixed(1) : averageRating
  )
  const [reviewAmount, setReviewAmount] = useState(
    author.totalReviews[authorRole]
  )
  const { setAlert } = useSnackBarContext()

  const onGetUserByIdResponse = useCallback(
    (data) => {
      setRating(data.averageRating[authorRole])
      setReviewAmount(data.totalReviews[authorRole])
    },
    [authorRole]
  )

  const getUserById = useAxios({
    service: () => userService.getUserById(author._id, authorRole),
    defaultResponse: null,
    fetchOnMount: false,
    onResponse: onGetUserByIdResponse
  })

  const onCreateReviewResponse = useCallback(() => {
    getUserById.fetchData()
  }, [getUserById])

  const onCreateReviewResponseError = useCallback(
    (error) => {
      if (error.status === 409) {
        setAlert({
          severity: snackbarVariants.info,
          message: 'constant.reviewAlreadySubmitted'
        })
      }
    },
    [setAlert]
  )

  const createReview = useAxios({
    service: (data) => reviewService.createReview(data),
    defaultResponse: null,
    fetchOnMount: false,
    onResponse: onCreateReviewResponse,
    onResponseError: onCreateReviewResponseError
  })

  const handleRatingChange = (value) => {
    createReview.fetchData({
      rating: String(value),
      targetUserId: author._id,
      targetUserRole: authorRole,
      offer: offerId
    })
  }

  return { rating, reviewAmount, handleRatingChange }
}

export default useReview
