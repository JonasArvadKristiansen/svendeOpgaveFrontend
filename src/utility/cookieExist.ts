
const tescookie = (cookie: string | undefined,  navigate: any) => {

  if (cookie === undefined) {
    console.log('failed and redirect and is undefined');
    
    navigate('/')
    return false
  }

  return true
};

export default tescookie;