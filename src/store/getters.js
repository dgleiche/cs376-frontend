const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  email: (state) => state.user.email
}
export default getters
