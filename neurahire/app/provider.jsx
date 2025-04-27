import React, { useEffect } from 'react'

function Provider({children}) {
    useEffect(()=>{
        createNewUser()
    },[])
    const createNewUser=async()=>{
       supabase.auth.getUser().then(async({
        data:{user}
        })=>{
            let { data: Users, error } = await supabase.from('us').select("*").eq('email',user?.email)
            if(Users.length==0){
                const { data, error }=  await supabase.from("us").insert([{
                    name:us?.us_metadata?.name,
                    email:us?.us_metadata?.email,
                    
                }])
                
            }
            
        })
    }
    return (
    <div>{children}</div>
  )
}

export default Provider