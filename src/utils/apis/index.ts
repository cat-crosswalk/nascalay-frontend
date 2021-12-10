import { RoomApi, Configuration, ConfigurationParameters } from '/@/utils/apis/generated'

let path = {}
if (import.meta.env.VITE_ENV_STAGE === 'development') {
  path = {
    basePath: '/api'
  } as ConfigurationParameters
}

const api = new RoomApi(new Configuration(path))

export default api
export * from '/@/utils/apis/generated'
