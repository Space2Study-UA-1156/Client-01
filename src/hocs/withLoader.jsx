import Loader from '~/components/loader/Loader'

export const withLoader = (Component) => {
  return function WihLoadingComponent({
    isLoading,
    isPending,
    isNotReady,
    ...props
  }) {
    return isLoading || isPending || isNotReady ? (
      <Loader />
    ) : (
      <Component {...props} />
    )
  }
}
