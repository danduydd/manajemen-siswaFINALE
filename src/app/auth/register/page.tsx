'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Eye, EyeOff, User, Mail, ShieldCheck, ArrowLeft, Check, Key } from "lucide-react";

export default function HomePage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!acceptedTerms) {
            alert("You must accept the terms and conditions to register.");
            return;
        }

        if (!formData.password || formData.password !== formData.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        console.log("Form submitted:", formData);
        router.push("/auth/login");
    };

    const getPasswordStrength = (password: string) => {
        if (password.length < 6) return { text: "Weak", color: "text-red-600" };
        if (password.length < 10) return { text: "Medium", color: "text-yellow-600" };
        return { text: "strong", color: "text-green-600" };
    };

    const passwordStrength = getPasswordStrength(formData.password);
    const isFormValid = acceptedTerms && formData.name && formData.email && formData.password && (formData.password === formData.confirmPassword);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-100 p-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/10 rounded-3xl pointer-events-none" />
                    <div className="relative z-10">
                        <a href="/auth/login" className="flex items-center gap-2 text-gray-600 hover:text-blue-800 mb-6">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Login
                        </a>
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500/5 to-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                                <User className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
                            <p className="text-gray-600">Join us today! It takes only a few steps.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                                        <User className="w-4 h-4" />
                                    </span>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Your Full Name"
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                                        <Mail className="w-4 h-4" />
                                    </span>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Your Email Address"
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Password</label>
                                <div className="relative">
                                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Your Password"
                                        className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-2xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>

                                {formData.password && (
                                    <div className={`text-sm font-medium mt-1 ${passwordStrength.color}`}>
                                        {passwordStrength.text}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                                <div className="relative">
                                    <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        placeholder="Confirm Password"
                                        className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-2xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>

                                {formData.confirmPassword && (
                                    formData.password !== formData.confirmPassword ? (
                                        <div className="text-sm font-medium mt-1 text-red-600">
                                            Password do not match
                                        </div>
                                    ) : (
                                        <div className="text-sm font-medium mt-1 text-green-600">
                                            Password match
                                        </div>
                                    )
                                )}
                            </div>

                            <div className="flex items-center gap-2 pt-1">
                                <button
                                    type="button"
                                    onClick={() => setAcceptedTerms(!acceptedTerms)}
                                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                                        acceptedTerms ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 bg-white'
                                    }`}
                                >
                                    {acceptedTerms && <Check className="w-3.5 h-3.5" />}
                                </button>
                                <span className="text-xs text-gray-600 select-none">
                                    I accept the terms and conditions
                                </span>
                            </div>

                            <button
                                type="submit"
                                disabled={!isFormValid}
                                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all"
                            >
                                Register
                            </button>

                            <div className="text-center">
                                <p className="text-sm text-gray-600">
                                    Already have an account ?
                                    <a href="/auth/login" className="text-blue-600 hover:underline"> Login</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}