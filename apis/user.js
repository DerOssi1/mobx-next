import api from '@/utils/api'

export const login = data => api.post(`/api/login`, data)