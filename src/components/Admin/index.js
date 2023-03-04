import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import "./index.css"
import { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'




const apiStatusConstants = {
    fail: "Failed",
    success: "Successful",
    load: "Loading",
    initial: "initial"
}

const Admin = () => {

    const [selectedItem, setSelectedItem] = useState("")
    const [getProductsAPIstatus, setGetProductsAPIstatus] = useState(apiStatusConstants.initial)
    const [products, setProducts] = useState("")
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [quality, setQuality] = useState("")
    const [quantity, setQuanitity] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")
    const [isUpdateButtonClicked, setIsUpdateButtonClicked] = useState(false)


    const updateProduct = async () => {
        // const url = "http://localhost:4000/product/update"
        const url = "https://ansronebe.onrender.com/product/update"
        const options = {
            method: "POST",
            body: JSON.stringify({
                title, category, quality, quantity, imageUrl, description, price, id: selectedItem._id
            }),
            headers: {
                "content-type": "application/json"
            }
        }
        try {
            const response = await fetch(url, options)
            if (response.ok) {
                alert("Product Details Updated Successfully")
                setIsUpdateButtonClicked(false)
                window.location.reload();
            } else {
                alert("Something went wrong! Try again.")
                setIsUpdateButtonClicked(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onClickUpdateProduct = () => {
        updateProduct()
        setIsUpdateButtonClicked(true)
    }

    const onChangeSelect = (event, option) => {
        console.log(option)
        setSelectedItem(option)
        setCategory(option.category)
        setTitle(option.title)
        setDescription(option.description)
        setImageUrl(option.imageUrl)
        setPrice(option.price)
        setQuality(option.quality)
        setQuanitity(option.quantity)
    }

    const getProducts = async () => {
        setGetProductsAPIstatus(apiStatusConstants.load)
        // const url = "http://localhost:4000/products"
        const url = "https://ansronebe.onrender.com/products"
        const options = {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        }
        try {
            const response = await fetch(url, options)
            const result = await response.json()
            const list = result.productsList
            const finalList = list.map(obj => ({ ...obj, label: obj.title }))
            setProducts(finalList)
            setGetProductsAPIstatus(apiStatusConstants.success)
        } catch (error) {
            console.log("Something went wrong in products api call", error)
            setGetProductsAPIstatus(apiStatusConstants.fail)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])



    const renderSuccessView = () => (
        <div className="adminParentCon mt-5 p-4 rounded mb-5">
            <div className="d-flex flex-column">
                <h1 className="h2" style={{ color: "#E8E8E8	" }}>ADMIN PANEL</h1>
                <div className="col-6 align-self-center mt-3 p-4 updateCon rounded">
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={products}
                        renderInput={params => <TextField {...params} label="Search Product" variant="standard" />}
                        onChange={onChangeSelect}
                        value={selectedItem}
                        className="w-100"
                        type="select"
                    />
                    <div className=' mt-2 mb-2'>
                        <TextField id="standard-basic" label="Cateogory" variant="standard" className='w-100' value={category} onChange={(event) => setCategory(event.target.value)} />
                    </div>

                    <div className=' mt-2 mb-2'>
                        <TextField id="standard-basic" label='Title' variant="standard" className='w-100' value={title} onChange={(event) => setTitle(event.target.value)} />
                    </div>
                    <div className=' mt-2 mb-2'>
                        <TextField id="standard-basic" label="Image" variant="standard" className='w-100' value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} />
                    </div>
                    <div className=' mt-2 mb-2'>
                        <TextField id="standard-basic" label="Price" variant="standard" className='w-100' value={price} onChange={(event) => setPrice(event.target.value)} />
                    </div>
                    <div className=' mt-2 mb-2'>
                        <TextField id="standard-basic" label="Rating" variant="standard" className='w-100' value={quality} onChange={(event) => setQuality(event.target.value)} />
                    </div>
                    <div className=' mt-2 mb-2'>
                        <TextField id="standard-basic" label="Quantity" variant="standard" className='w-100' value={quantity} onChange={(event) => setQuanitity(event.target.value)} />
                    </div>
                    <div className=' mt-2 mb-2'>
                        <TextField id="standard-basic" label="Description" variant="standard" className='w-100' value={description} onChange={(event) => setDescription(event.target.value)} />
                    </div>
                    <Button variant="contained" disabled={isUpdateButtonClicked} className="float-right mt-3" onClick={onClickUpdateProduct}>Update</Button>
                </div>
            </div>
        </div>
    )


    const renderFailureView = () => (
        <div className="failview min-vh-100 d-flex flex-column justify-content-center align-items-center">
            <div>
                <div className="text-center">
                    <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
                        alt="products failure"
                        className="sizeFailure"
                    />
                </div>
                <h1 className="text-center">Something Went Wrong.</h1>
                <div className="text-center">
                    <button
                        type="button"
                        className="btn btn-primary"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    )

    const renderLoadingView = () => (
        <div
            className="text-center loader d-flex justify-content-center align-items-center vh-100"
            testid="loader"
        >
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        </div>
    )



    const renderUi = () => {
        switch (getProductsAPIstatus) {
            case apiStatusConstants.success:
                return renderSuccessView()
            case apiStatusConstants.fail:
                return renderFailureView()
            case apiStatusConstants.load:
                return renderLoadingView()
            default:
                return null
        }
    }

    return <>{renderUi()}</>
}

export default Admin