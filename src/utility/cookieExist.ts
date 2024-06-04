
const cookieExist = (cookie: string | undefined,  navigate: any) => {

  if (cookie === undefined) {
    console.error('Fejlede og ville sende dig tilbage til forsiden');
    navigate('/')
    return false
  }

  return true
};

export default cookieExist;