import  backendApi  from 'configs/api/backendApi';
export const logout = async ()=>{
    return backendApi.post('/logout')
}