import { RoomApi, Configuration } from '/@/utils/apis/generated'

const api = new RoomApi(new Configuration({ basePath: '/api' }))

export default api
export * from '/@/utils/apis/generated'
