import AsyncStorage from "@react-native-async-storage/async-storage"

const checkPermission = async (acceptedPermissions: string[]) => {
    const user = await AsyncStorage.getItem('user')
    if(!user) return false
    const userPermission = JSON.parse(user).role
    return acceptedPermissions.includes(userPermission)
}

export default checkPermission