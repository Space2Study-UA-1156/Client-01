export const URLs = {
  example: {
    get: '/example'
  },
  location: {
    getCountries: '/location/countries',
    getCities: 'location/cities'
  },
  auth: {
    login: '/auth/login',
    googleAuth: '/auth/google-auth',
    signup: '/auth/signup',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    confirm: '/auth/confirm-email',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password'
  },
  users: {
    get: '/users',
    update: '/users',
    delete: '/users/delete',
    myProfile: '/users/myProfile'
  },
  offers: {
    create: '/offers',
    get: '/offers'
  },
  reviews: {
    create: '/reviews',
    get: '/reviews'
  },
  categories: {
    get: '/categories',
    create: '/categories',
    getNames: '/categories/names',
    priceRange: '/price-range',
    getOffers: '/categories/:categoryId/subjects/:subjectId/offers'
  },
  subjects: {
    get: '/subjects',
    getNames: '/subjects/names',
    create: '/subjects'
  },
  cooperations: {
    get: '/cooperations',
    create: '/cooperations',
    update: '/cooperations'
  },
  languages: {
    get: '/languages'
  },
  requests: {
    create: '/requests'
  }
}
