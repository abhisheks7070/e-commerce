import React from 'react'

const Products = (props) => {
  return (<>
      {
        props.products.map((e) => {
          return (
          <div className='flex flex-col items-center gap-3 w-[20vw] bg-slate-500 p-3 border-2 border-black text-left' key={e.id}>
              <div><img className='w-[15vw] h-[30vh] object-fill ' src={e.image} alt="" /></div>
              <div>{e.title}</div>
              <div><span className='font-bold'>DESCRIPTION: </span>{e.description}</div>
              <div>{e.rating.rate}</div>
            </div>

            )
        })
      }
      </>
  )
}

export default Products
