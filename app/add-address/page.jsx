'use client'
import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const AddAddress = () => {
    const { getToken, router } = useAppContext()
    const [address, setAddress] = useState({
        fullName: '',
        phoneNumber: '',
        pincode: '',
        area: '',
        city: '',
        state: '',
    })
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Form validation function
    const validateForm = () => {
        const newErrors = {}
        
        // Full name validation
        if (!address.fullName.trim()) {
            newErrors.fullName = 'Full name is required'
        } else if (address.fullName.trim().length < 2) {
            newErrors.fullName = 'Full name must be at least 2 characters'
        }
        
        // Phone number validation
        if (!address.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required'
        } else if (!/^[6-9]\d{9}$/.test(address.phoneNumber.trim())) {
            newErrors.phoneNumber = 'Please enter a valid 10-digit phone number'
        }
        
        // Pincode validation
        if (!address.pincode.trim()) {
            newErrors.pincode = 'Pincode is required'
        } else if (!/^\d{6}$/.test(address.pincode.trim())) {
            newErrors.pincode = 'Please enter a valid 6-digit pincode'
        }
        
        // Area validation
        if (!address.area.trim()) {
            newErrors.area = 'Address area is required'
        } else if (address.area.trim().length < 10) {
            newErrors.area = 'Please provide a complete address'
        }
        
        // City validation
        if (!address.city.trim()) {
            newErrors.city = 'City is required'
        } else if (address.city.trim().length < 2) {
            newErrors.city = 'City name must be at least 2 characters'
        }
        
        // State validation
        if (!address.state.trim()) {
            newErrors.state = 'State is required'
        } else if (address.state.trim().length < 2) {
            newErrors.state = 'State name must be at least 2 characters'
        }
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
        // Validate form before submission
        if (!validateForm()) {
            toast.error('Please fix the errors below')
            return
        }
        
        setIsSubmitting(true)

        try {
            const token = await getToken()
            const response = await axios.post(`/api/user/add-address`, { address }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            
            if (response.data.success) {
                toast.success(response.data.message)
                router.push("/cart")
            } else {
                toast.error(response.data.message || 'Failed to add address')
            }
        } catch (error) {
            console.error('Add address error:', error)
            toast.error(error.response?.data?.message || error.message || 'Something went wrong')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 py-16 flex flex-col md:flex-row justify-between">
                <form onSubmit={onSubmitHandler} className="w-full">
                    <p className="text-2xl md:text-3xl text-gray-500">
                        Add Shipping <span className="font-semibold text-orange-600">Address</span>
                    </p>
                    <div className="space-y-3 max-w-sm mt-10">
                        <div>
                            <input
                                className={`px-2 py-2.5 focus:border-orange-500 transition border rounded outline-none w-full text-gray-500 ${
                                    errors.fullName ? 'border-red-500' : 'border-gray-500/30'
                                }`}
                                type="text"
                                placeholder="Full name"
                                onChange={(e) => {
                                    setAddress({ ...address, fullName: e.target.value })
                                    if (errors.fullName) {
                                        setErrors({ ...errors, fullName: '' })
                                    }
                                }}
                                value={address.fullName}
                            />
                            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                        </div>
                        
                        <div>
                            <input
                                className={`px-2 py-2.5 focus:border-orange-500 transition border rounded outline-none w-full text-gray-500 ${
                                    errors.phoneNumber ? 'border-red-500' : 'border-gray-500/30'
                                }`}
                                type="tel"
                                placeholder="Phone number"
                                maxLength="10"
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '') // Only allow digits
                                    setAddress({ ...address, phoneNumber: value })
                                    if (errors.phoneNumber) {
                                        setErrors({ ...errors, phoneNumber: '' })
                                    }
                                }}
                                value={address.phoneNumber}
                            />
                            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                        </div>
                        
                        <div>
                            <input
                                className={`px-2 py-2.5 focus:border-orange-500 transition border rounded outline-none w-full text-gray-500 ${
                                    errors.pincode ? 'border-red-500' : 'border-gray-500/30'
                                }`}
                                type="text"
                                placeholder="Pin code"
                                maxLength="6"
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '') // Only allow digits
                                    setAddress({ ...address, pincode: value })
                                    if (errors.pincode) {
                                        setErrors({ ...errors, pincode: '' })
                                    }
                                }}
                                value={address.pincode}
                            />
                            {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                        </div>
                        
                        <div>
                            <textarea
                                className={`px-2 py-2.5 focus:border-orange-500 transition border rounded outline-none w-full text-gray-500 resize-none ${
                                    errors.area ? 'border-red-500' : 'border-gray-500/30'
                                }`}
                                rows={4}
                                placeholder="Address (Area and Street)"
                                onChange={(e) => {
                                    setAddress({ ...address, area: e.target.value })
                                    if (errors.area) {
                                        setErrors({ ...errors, area: '' })
                                    }
                                }}
                                value={address.area}
                            />
                            {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area}</p>}
                        </div>
                        
                        <div className="flex space-x-3">
                            <div className="flex-1">
                                <input
                                    className={`px-2 py-2.5 focus:border-orange-500 transition border rounded outline-none w-full text-gray-500 ${
                                        errors.city ? 'border-red-500' : 'border-gray-500/30'
                                    }`}
                                    type="text"
                                    placeholder="City/District/Town"
                                    onChange={(e) => {
                                        setAddress({ ...address, city: e.target.value })
                                        if (errors.city) {
                                            setErrors({ ...errors, city: '' })
                                        }
                                    }}
                                    value={address.city}
                                />
                                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                            </div>
                            <div className="flex-1">
                                <input
                                    className={`px-2 py-2.5 focus:border-orange-500 transition border rounded outline-none w-full text-gray-500 ${
                                        errors.state ? 'border-red-500' : 'border-gray-500/30'
                                    }`}
                                    type="text"
                                    placeholder="State"
                                    onChange={(e) => {
                                        setAddress({ ...address, state: e.target.value })
                                        if (errors.state) {
                                            setErrors({ ...errors, state: '' })
                                        }
                                    }}
                                    value={address.state}
                                />
                                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                            </div>
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={`max-w-sm w-full mt-6 py-3 uppercase transition ${
                            isSubmitting 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-orange-600 hover:bg-orange-700'
                        } text-white`}
                    >
                        {isSubmitting ? 'Saving...' : 'Save address'}
                    </button>
                </form>
                <Image
                    className="md:mr-16 mt-16 md:mt-0"
                    src={assets.my_location_image}
                    alt="my_location_image"
                />
            </div>
            <Footer />
        </>
    );
};

export default AddAddress;