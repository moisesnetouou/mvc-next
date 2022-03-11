import { GetServerSideProps } from "next";
import { getSession, signIn, useSession } from "next-auth/react"
import { useEffect } from "react";

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const session = await getSession({ req});  

  if(session){
    return {
      redirect: {
        destination: '/app',
        permanent: false,
      }
    }
  }
  
  return {
    props: {

    }
  }
}

export default function Home() {
  const {data} = useSession();

  function handleSignIn(){
    signIn('github')
  }

  return (
    <div className="grid sm:grid-cols-2 ga-4">
      <p>{JSON.stringify(data)}</p>

      <button onClick={handleSignIn}>
        Github
      </button>
    </div>
  )
}
