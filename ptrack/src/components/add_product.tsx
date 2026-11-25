import { useState } from 'react'
import { createProduct, updateProduct } from '../api/products'
import type { Product } from '../models/types'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export function AddProduct() {
    const location = useLocation();
    const { product_id, product_name, product_url, product_current_price, product_tag_id, screen_title } = location.state || {};
    const np = { name: product_name, url: product_url, initial_price: product_current_price, current_price: 0, lowest_price: 0, tag_id: product_tag_id }
    const [newProduct, setNewProduct] = useState(np);
    const [successToast, setSuccessToast] = useState({show: false, msg: ''});
    const [warningToast, setWarningToast] = useState({show: false, msg: ''});
    const [errorToast, setErrorToast] = useState({show: false, msg: ''});
    const navigate = useNavigate();

    const saveProduct = async () => {
        if (newProduct.name != '' && newProduct.url != '' && newProduct.tag_id != '' && newProduct.initial_price > 0) {
            let p: Product = {
                id: 0,
                name: newProduct.name,
                url: newProduct.url,
                initial_price: newProduct.initial_price,
                current_price: 0,
                lowest_price: 0,
                is_tracked: true,
                tag_id: newProduct.tag_id,
            };
            let result = await createProduct(p)
            if (result){
                setNewProduct({ name: '', url: '', initial_price: 0, current_price: 0, lowest_price: 0, tag_id: '' })
                setSuccessToast({ show: true, msg: 'Product saved successfully.' })
            }
            else{
                setErrorToast({ show: true, msg: 'Something went wrong.' })
            }
        }
        else {
            setWarningToast({ show: true, msg: 'Complete the product information.' })
        }
    };

    const editProduct = async () => {
        if (newProduct.name != '' && newProduct.url != '' && newProduct.tag_id != '' && newProduct.initial_price > 0) {
            let p: Product = {
                id: product_id,
                name: newProduct.name,
                url: newProduct.url,
                initial_price: newProduct.initial_price,
                current_price: newProduct.initial_price,
                lowest_price: 0,
                is_tracked: true,
                tag_id: newProduct.tag_id,
            };
            let result = await updateProduct(p)
            if (result){
                setTimeout(() => {
                    navigate('/index.html');
                }, 1000);
                setSuccessToast({ show: true, msg: 'Product saved successfully.' })
                
            }
            else{
                setErrorToast({ show: true, msg: 'Something went wrong.' })
            }
        }
        else {
            setWarningToast({ show: true, msg: 'Complete the product information.' })
        }
    };

    return (
        <>
            <style>
                {`
                    @keyframes toastFadeOut {
                      0%, 80% {
                        opacity: 1;
                        transform: translateX(0);
                        max-height: 150px;
                        margin-bottom: 0;
                      }
                      99% {
                        opacity: 0;
                        transform: translateX(100%);
                        max-height: 150px;
                      }
                      100% {
                        opacity: 0;
                        max-height: 0;
                        padding: 0;
                        border-width: 0;
                        visibility: hidden;
                        pointer-events: none;
                      }
                    }
                `}
            </style>

            <div style={{ height: "100%", minHeight: "600px", width: "100%", minWidth: "800px", overflow: "hidden" }} className="component-container">
                <div data-dialog-backdrop="dialog" data-dialog-backdrop-close="true" className="absolute left-0 top-0 inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
                    <div data-dialog="dialog"
                        className="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-slate-700 shadow-md">
                        <div className="flex flex-col p-6">
                            <h4
                                className="text-2xl mb-1 font-semibold text-slate-700">
                                {screen_title}
                            </h4>
                            <p className="mb-3 mt-1 text-slate-400">
                                Enter product information
                            </p>

                            <div className="w-full max-w-sm min-w-[200px] mt-4">
                                <label className="block mb-1 text-sm text-slate-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={newProduct.name}
                                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                    className="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                    placeholder="" />
                            </div>
                            <div className="w-full max-w-sm min-w-[200px] mt-4">
                                <label className="block mb-1 text-sm text-slate-700">
                                    Url
                                </label>
                                <input
                                    type="text"
                                    value={newProduct.url}
                                    onChange={(e) => setNewProduct({ ...newProduct, url: e.target.value })}
                                    className="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                    placeholder="" />
                            </div>
                            <div className="w-full max-w-sm min-w-[200px] mt-4">
                                <label className="block mb-1 text-sm text-slate-700">
                                    HTML tag
                                </label>
                                <input
                                    type="text"
                                    value={newProduct.tag_id}
                                    onChange={(e) => setNewProduct({ ...newProduct, tag_id: e.target.value })}
                                    className="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                    placeholder="" />
                            </div>
                            <div className="w-full max-w-sm min-w-[200px] mt-4">
                                <label className="block mb-1 text-sm text-slate-700">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    value={newProduct.initial_price}
                                    onChange={(e) => setNewProduct({ ...newProduct, initial_price: parseFloat(e.target.value) })}
                                    className="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                    placeholder="" />
                            </div>

                        </div>
                        <div className="p-6 pt-0">
                            <div className="flex space-x-2">
                                <button
                                    className="w-full mx-auto select-none rounded border border-red-600 py-2 px-4 text-center text-sm font-semibold text-red-600 transition-all hover:bg-red-600 hover:text-white hover:shadow-md hover:shadow-red-600/20 active:bg-red-700 active:text-white active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button"
                                    data-dialog-close="true">
                                    <Link to='/'>Cancel</Link>
                                </button>

                                { product_id == undefined ?
                                <button
                                    onClick={saveProduct}
                                    className="w-full mx-auto select-none rounded bg-slate-800 cursor-pointer py-2 px-4 text-center text-sm font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:shadow-lg hover:shadow-slate-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button"
                                    data-dialog-close="true">
                                    Save
                                </button> :
                                <button
                                    onClick={editProduct}
                                    className="w-full mx-auto select-none rounded bg-slate-800 cursor-pointer py-2 px-4 text-center text-sm font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:shadow-lg hover:shadow-slate-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button"
                                    data-dialog-close="true">
                                    Update
                                </button>
                                }
                            </div>
                            <p className="flex justify-center mt-4 font-sans text-sm text-slate-500">
                                Looking htmlFor more details? Contact
                                <a href="#admin"
                                    className="ml-1 text-sm font-bold leading-normal text-slate-500">
                                    Admin.
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Toast notification */}
                        <div className="fixed top-5 right-5 z-50 flex flex-col gap-3 pointer-events-none">

                            {successToast.show ?
                                <div className="pointer-events-auto">
                                    <input type="checkbox" id="toast-success" onChange={() => setSuccessToast({show: false, msg: '' })} className="peer hidden" />
                                    <div role="alert" className="peer-checked:hidden flex items-center w-full max-w-xs p-4 text-gray-700 bg-white rounded-lg shadow-lg border border-gray-200 dark:text-gray-200 dark:bg-gray-800 dark:border-gray-700 /*animate-[toastFadeOut_4s_ease-in-out_forwards] hover:[animation-play-state:paused]*/">


                                        <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" ></path>
                                            </svg>
                                        </div>


                                        <div className="ms-3 text-sm font-normal">{successToast.msg}</div>


                                        <label htmlFor="toast-success" aria-label="Close" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 cursor-pointer dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                        </label>
                                    </div>
                                </div> : ''
                            }

                            {warningToast.show ?
                                <div className="pointer-events-auto">
                                    <input type="checkbox" id="toast-warning" onChange={() => setWarningToast({show: false, msg: '' })} className="peer hidden" />
                                    <div role="alert" className="peer-checked:hidden flex items-center w-full max-w-xs p-4 text-gray-700 bg-white rounded-lg shadow-lg border border-gray-200 dark:text-gray-200 dark:bg-gray-800 dark:border-gray-700">

                                        <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-amber-500 bg-amber-100 rounded-lg dark:bg-amber-800 dark:text-amber-200">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" ></path>
                                            </svg>
                                        </div>

                                        <div className="ms-3 text-sm font-normal">{warningToast.msg}</div>

                                        <label htmlFor="toast-warning" aria-label="Close" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 cursor-pointer dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                        </label>
                                    </div>
                                </div> : ''
                            }

                            {errorToast.show ?
                                <div className="pointer-events-auto">
                                    <input type="checkbox" id="toast-error" onChange={() => setErrorToast({show: false, msg: '' })} className="peer hidden" />
                                    <div role="alert" className="peer-checked:hidden flex items-center w-full max-w-xs p-4 text-gray-700 bg-white rounded-lg shadow-lg border border-gray-200 dark:text-gray-200 dark:bg-gray-800 dark:border-gray-700">


                                        <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" ></path>
                                            </svg>
                                        </div>


                                        <div className="ms-3 text-sm font-normal">{errorToast.msg}</div>


                                        <label htmlFor="toast-error" aria-label="Close" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 cursor-pointer dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                        </label>
                                    </div>
                                </div> : ''
                            }
                        </div>

                </div>
            </div>
        </>

    );
}