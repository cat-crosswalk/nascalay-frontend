import {
  RoomApi,
  Configuration,
  ConfigurationParameters,
} from '/@/utils/apis/generated'

let path = {}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
if (import.meta.env.VITE_ENV_STAGE === 'development') {
  path = {
    basePath: '/api',
  } as ConfigurationParameters
}

const api = new RoomApi(new Configuration(path))

export default api
export * from '/@/utils/apis/generated'
