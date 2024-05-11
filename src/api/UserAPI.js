
export const signIn = async () => {
    const response = await fetch('https://6639d7581ae792804becf778.mockapi.io/User/1');
    return response.json();
}
