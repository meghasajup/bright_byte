import React, { useState } from 'react';
import { User, Key, Upload, Eye, EyeOff, X, Check, Mail, Phone } from 'lucide-react';

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [profileImage, setProfileImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 pt-16 md:p-0 md:pt-14">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 h-32 relative">
          <div className="absolute -bottom-16 left-8">
            <div className="relative w-32 h-32 bg-white rounded-full p-1 shadow-md">
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                  <User size={40} />
                </div>
              )}
              <label className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full cursor-pointer transition-colors duration-200 shadow-md">
                <Upload size={16} />
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="pt-20 px-8 pb-8">
          <div className="mb-8 border-b">
            <div className="flex space-x-4">
              <button 
                onClick={() => setActiveSection('profile')}
                className={`pb-4 px-2 relative ${activeSection === 'profile' 
                  ? 'text-blue-600 font-medium' 
                  : 'text-gray-500 hover:text-gray-700'}`}
              >
                Personal Info
                {activeSection === 'profile' && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>
                )}
              </button>
              <button 
                onClick={() => setActiveSection('security')}
                className={`pb-4 px-2 relative ${activeSection === 'security' 
                  ? 'text-blue-600 font-medium' 
                  : 'text-gray-500 hover:text-gray-700'}`}
              >
                Security
                {activeSection === 'security' && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>
                )}
              </button>
            </div>
          </div>

          {activeSection === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-xl font-medium text-gray-800">Admin Profile</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      defaultValue="Alex Johnson" 
                      className="w-full py-3 px-4 pl-10 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <User className="absolute left-3 top-3.5 text-gray-400" size={16} />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      defaultValue="alex@example.com" 
                      className="w-full py-3 px-4 pl-10 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      disabled
                    />
                    <Mail className="absolute left-3 top-3.5 text-gray-400" size={16} />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <input 
                      type="tel" 
                      defaultValue="+1 (555) 987-6543" 
                      className="w-full py-3 px-4 pl-10 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <Phone className="absolute left-3 top-3.5 text-gray-400" size={16} />
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <button className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="space-y-6">
              <h2 className="text-xl font-medium text-gray-800 mb-4">Password Management</h2>
              
              {!showResetForm ? (
                <div className="space-y-6">
                  <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Change Password</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                        <div className="relative">
                          <input 
                            type={showPassword ? "text" : "password"} 
                            className="w-full py-3 px-4 pl-10 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                          <Key className="absolute left-3 top-3.5 text-gray-400" size={16} />
                          <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <div className="relative">
                          <input 
                            type={showPassword ? "text" : "password"} 
                            className="w-full py-3 px-4 pl-10 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                          <Key className="absolute left-3 top-3.5 text-gray-400" size={16} />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                        <div className="relative">
                          <input 
                            type={showPassword ? "text" : "password"} 
                            className="w-full py-3 px-4 pl-10 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                          <Key className="absolute left-3 top-3.5 text-gray-400" size={16} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <button className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Update Password
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Forgot Password</h3>
                    <p className="text-gray-600 mb-4">Can't remember your password? Reset it with your email address.</p>
                    <button 
                      onClick={() => setShowResetForm(true)}
                      className="px-6 py-2.5 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Reset Password
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-800">Reset Password</h3>
                    <button 
                      onClick={() => setShowResetForm(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <p className="text-gray-600 mb-4">Enter your email address to receive password reset instructions.</p>
                  
                  <div className="mb-4">
                    <div className="relative">
                      <input 
                        type="email" 
                        placeholder="Enter your email address"
                        className="w-full py-3 px-4 pl-10 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <Mail className="absolute left-3 top-3.5 text-gray-400" size={16} />
                    </div>
                  </div>
                  
                  <button className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Send Reset Link
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;