import Card from '@/src/components/Card'
import Image from 'next/image'
import axios from 'axios'



async function fetchdata(){
 var res = await axios.get('http://localhost:3000/api/products')
 return res.data.message
}



const page = async () => {


 var product = await fetchdata()

  return (
    <>

  

    <div className='max-w-6xl mx-auto py-10 '>
    <div className=' gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
    
    {
      product.map(product =>{
    return(
      <Card  pro={product}/>
    )
      })

    }
   
   

    </div>
    </div>
    
    
    </>
  )
}

export default page;