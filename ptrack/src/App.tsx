import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import type { Product } from './models/types'
import { changeTrackedState, getProducts } from './api/products'

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let fetchData = async () => {
      const products = await getProducts(false);
      setProducts(products);
    }
    fetchData();
  }, []);

  const changeTracking = async (product_id: number) => {
    let result = await changeTrackedState(product_id)
    if (result){
      let p1 = products.map(p => p.id == product_id ? { ...p, is_tracked: !p.is_tracked } : p);
      setProducts(p1);
    }
    
  };

  return (
    <>

      <div className="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
        <div className="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white rounded-none bg-clip-border">
          <div className="flex items-center justify-between ">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Tracking product prices..</h3>
              <p className="text-slate-500"> ..on websites</p>
            </div>
            <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
              {/*<button
                className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button">
                View All
              </button>*/}
              <Link to="/add-product" state={{ screen_title: 'Register product' }}
                className="flex select-none items-center gap-2 rounded bg-slate-800 py-2.5 px-4 text-xs font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:shadow-lg hover:shadow-slate-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" strokeWidth="2" className="w-4 h-4">
                  <path d="m21.49 6.13-9-5a1 1 0 0 0-.97 0l-9 5A1 1 0 0 0 2 7v10c0 .36.2.7.51.87l9 5c.3.17.67.17.97 0l9-5a1 1 0 0 0 .51-.87V7a1 1 0 0 0-.51-.87ZM12 3.14 18.94 7 16.5 8.36 9.56 4.5 12 3.14Zm0 7.72L5.06 7 7.5 5.64l6.94 3.86L12 10.86ZM4 8.7l7 3.89v7.71l-7-3.89V8.7Zm9 11.6v-7.71l7-3.89v7.71l-7 3.89Z"></path>
                  <path d="m21.49 6.13-9-5a1 1 0 0 0-.97 0l-9 5A1 1 0 0 0 2 7v10c0 .36.2.7.51.87l9 5c.3.17.67.17.97 0l9-5a1 1 0 0 0 .51-.87V7a1 1 0 0 0-.51-.87ZM12 3.14 18.94 7 16.5 8.36 9.56 4.5 12 3.14Zm0 7.72L5.06 7 7.5 5.64l6.94 3.86L12 10.86Zm1 9.44v-7.71l7-3.89v7.71l-7 3.89Z"></path>
                </svg>
                Add product
              </Link>
            </div>
          </div>

        </div>
        <div className="p-0 overflow-scroll">
          <table className="w-full mt-4 text-left table-auto min-w-max">
            <thead>
              <tr>
                <th
                  className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                  <p
                    className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                    Product
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                      stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                    </svg>
                  </p>
                </th>
                <th
                  className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                  <p
                    className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                    Current price
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                      stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                    </svg>
                  </p>
                </th>
                <th
                  className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                  <p
                    className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                    Initial price
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                      stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                    </svg>
                  </p>
                </th>
                <th
                  className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                  <p
                    className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                    Lowest price
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                      stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                    </svg>
                  </p>
                </th>
                <th
                  className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                  <p
                    className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr>
                  <td className="p-4 border-b border-slate-200">
                    <div className="flex items-center gap-3 max-w-lg">
                      {/* <img src={p.image_url}
                        alt={p.id.toString()} className="relative inline-block h-9 w-9 !rounded-full object-cover object-center" /> */}
                      <div className="flex flex-col">
                        <p className="text-sm font-semibold text-slate-700 w-[57ch] truncate">
                          {'(' + p.id + ') ' + p.name}
                        </p>
                        <span className="flex gap-4 text-sm text-slate-500">
                          <p><a href={p.url} target='_blank' className="hover:underline">Go to page</a></p>
                          {p.is_tracked ?
                            <p onClick={() => changeTracking(p.id)} className='cursor-pointer' title='Click to stop tracking' ><svg className='h-[15px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.7 5.3a1 1 0 0 0-1.4 0L9 16.6l-5.3-5.3a1 1 0 1 0-1.4 1.4l6 6q.3.3.7.3.5 0 .7-.3l12-12a1 1 0 0 0 0-1.4"></path><path d="M22.06 4.94a1.5 1.5 0 0 0-2.12 0L9 15.88l-4.94-4.94a1.5 1.5 0 0 0-2.12 2.12l6 6a1.5 1.5 0 0 0 2.12 0l12-12a1.5 1.5 0 0 0 0-2.12"></path></svg></p>
                            :
                            <p onClick={() => changeTracking(p.id)} className='cursor-pointer' title='Click to activate tracking' ><svg className='h-[15px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m13.41 12 5.29-5.29a1 1 0 1 0-1.41-1.41L12 10.59 6.71 5.3A1 1 0 1 0 5.3 6.71L10.59 12 5.3 17.29a1 1 0 1 0 1.41 1.41L12 13.41l5.29 5.29a1 1 0 1 0 1.41-1.41z"></path><path d="m14.12 12 4.94-4.94c.59-.59.59-1.54 0-2.12s-1.54-.59-2.12 0L12 9.88 7.06 4.94c-.59-.59-1.54-.59-2.12 0s-.59 1.54 0 2.12L9.88 12l-4.94 4.94c-.59.59-.59 1.54 0 2.12s1.54.59 2.12 0L12 14.12l4.94 4.94c.59.59 1.54.59 2.12 0s.59-1.54 0-2.12z"></path></svg></p>
                          }
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <div className="w-max">
                      <div
                        className="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-green-900 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20">
                        <span className="">{p.current_price}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <p className="text-sm text-slate-500">
                      {p.initial_price}
                    </p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <p className="text-sm text-slate-500">
                      {p.lowest_price}
                    </p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <div className="flex gap-8">
                      <p>
                        <Link to='/add-product/' state={{ product_id: p.id, product_name: p.name, product_url: p.url, product_current_price: p.current_price, product_tag_id: p.tag_id, screen_title: 'Edit product' }}
                          className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-4 h-4">
                              <path d="m21.71,11.29L13.71,3.29c-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41l6.29,6.29H3c-.55,0-1,.45-1,1s.45,1,1,1h15.59l-6.29,6.29c-.39.39-.39,1.02,0,1.41.2.2.45.29.71.29s.51-.1.71-.29l8-8c.39-.39.39-1.02,0-1.41Z"></path><path className="solid" d="m22.41 10.58-8-8a2 2 0 0 0-2.83 2.83L16.17 10H3c-1.1 0-2 .9-2 2s.9 2 2 2h13.17l-4.59 4.59a2 2 0 0 0 1.41 3.42 2 2 0 0 0 1.41-.59l8-8c.77-.77.78-2.05 0-2.83Z"></path>
                            </svg>
                          </span>
                        </Link>
                      </p>
                      <p>
                        <Link to={'/chart/' + p.id} state={{ product_name: p.name, product_url: p.url }}
                          className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-4 h-4">
                              <path d="M18.5 3H16c0-.55-.45-1-1-1s-1 .45-1 1h-4c0-.55-.45-1-1-1s-1 .45-1 1H5.5A2.5 2.5 0 0 0 3 5.5v13A2.5 2.5 0 0 0 5.5 21h13a2.5 2.5 0 0 0 2.5-2.5v-13A2.5 2.5 0 0 0 18.5 3Zm.5 15.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V10h14v8.5ZM19 8H5V5.5c0-.28.22-.5.5-.5H8c0 .55.45 1 1 1s1-.45 1-1h4c0 .55.45 1 1 1s1-.45 1-1h2.5c.28 0 .5.22.5.5V8ZM7 17a1 1 0 0 0 1 1h2c.55 0 1-.45 1-1s-.45-1-1-1v-4a1 1 0 0 0-1.71-.7l-1 1A1 1 0 0 0 8 14v2a1 1 0 0 0-1 1ZM13 17a1 1 0 0 0 1 1h2c.55 0 1-.45 1-1s-.45-1-1-1v-4a1 1 0 0 0-.62-.92 1 1 0 0 0-1.09.22l-1 1A1 1 0 0 0 14 14v2a1 1 0 0 0-1 1Z" fill="#000"></path>
                            </svg>
                          </span>
                        </Link>
                      </p>
                    </div>
                  </td>
                </tr>
              ))
              }

            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between p-3">
          <p className="block text-sm text-slate-500">
            Page 1 of 10
          </p>
          <div className="flex gap-1">
            <button
              className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button">
              Previous
            </button>
            <button
              className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button">
              Next
            </button>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
