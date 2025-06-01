
// import React, { useState, useEffect } from 'react';
// import { getUserProfile, updateUserProfile, getCategories } from '../services/api/userService';
// import InputField from './Shared/InputField';
// import Button from './Shared/Button';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
// import { setUser } from '../redux/slices/authSlice';
// import { useNavigate } from 'react-router-dom';

// interface Category {
//   _id: string;
//   name: string;
//   __v?: number;
// }

// interface UserProfile {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   phone: string;
//   email: string;
//   dob: string;
//   articlePreferences: Category[];
// }

// const SettingsPage: React.FC = () => {
//   const dispatch = useDispatch();
//   const { user, accessToken, refreshToken } = useSelector((state: RootState) => state.auth);

//   const [profile, setProfile] = useState<UserProfile>({
//     _id:'',
//     firstName: '',
//     lastName: '',
//     phone: '',
//     email: '',
//     dob: '',
//     articlePreferences: [],
//   });

//   const [editProfile, setEditProfile] = useState({
//     firstName: '',
//     lastName: '',
//     dob: '',
//     articlePreferences: [] as string[], // Stores _id strings for editing
//   });
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [errors, setErrors] = useState({
//     firstName: '',
//     lastName: '',
//     dob: '',
//     articlePreferences: '',
//   });
//   const [success, setSuccess] = useState('');
//   const navigate = useNavigate()
//   useEffect(() => {
//     if(!user){
//       navigate('/login')
//     }
//     const fetchData = async () => {
//       try {
//         const [user, cats] = await Promise.all([getUserProfile(), getCategories()]);
//         console.log("catag", user);
//         setProfile({
//           ...user,
//           dob: user.dob.split('T')[0], // Format for display
//         });
//         setEditProfile({
//           firstName: user.firstName,
//           lastName: user.lastName,
//           dob: user.dob.split('T')[0], // Format for input
//           articlePreferences: user.articlePreferences.map((cat) => cat._id), // Extract _id strings
//         });
//         setCategories(cats);
//       } catch (error: any) {
//         console.error('Error fetching data:', error);
//         setErrors((prev) => ({
//           ...prev,
//           firstName: 'Failed to load profile',
//         }));
//       }
//     };
//     fetchData();
//   }, [navigate,user]);

//   const handleEditToggle = () => {
//     setIsEditing(!isEditing);
//     setErrors({ firstName: '', lastName: '', dob: '', articlePreferences: '' });
//     setSuccess('');
//     if (!isEditing) {
//       setEditProfile({
//         firstName: profile.firstName,
//         lastName: profile.lastName,
//         dob: profile.dob,
//         articlePreferences: profile.articlePreferences.map((cat) => cat._id),
//       });
//     }
//   };

//   const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setEditProfile((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: '' }));
//   };

//   const handlePreferencesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
//     setEditProfile((prev) => ({ ...prev, articlePreferences: selectedOptions }));
//     setErrors((prev) => ({ ...prev, articlePreferences: '' }));
//   };

//   const validateProfile = () => {
//     const newErrors = { firstName: '', lastName: '', dob: '', articlePreferences: '' };
//     if (!editProfile.firstName.trim()) newErrors.firstName = 'First name is required';
//     if (!editProfile.lastName.trim()) newErrors.lastName = 'Last name is required';
//     if (!editProfile.dob) {
//       newErrors.dob = 'Date of birth is required';
//     } else if (new Date(editProfile.dob) > new Date()) {
//       newErrors.dob = 'Date of birth cannot be in the future';
//     }
//     if (editProfile.articlePreferences.length === 0) {
//       newErrors.articlePreferences = 'Select at least one category';
//     }
//     setErrors(newErrors);
//     return Object.values(newErrors).every((e) => !e);
//   };

//   const handleProfileSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateProfile()) return;

//     try {
//       await updateUserProfile({
//         firstName: editProfile.firstName,
//         lastName: editProfile.lastName,
//         dob: editProfile.dob,
//         articlePreferences: editProfile.articlePreferences,
//       });
//       // Fetch updated profile to get populated articlePreferences
//       const updatedUser = await getUserProfile();
//       setProfile({
//         ...updatedUser,
//         dob: updatedUser.dob.split('T')[0],
//       });

//       // Update Redux store with the new user details
//       dispatch(
//         setUser({
//           user: {
//             firstName: updatedUser.firstName,
//             lastName: updatedUser.lastName,
//             email: updatedUser.email,
//             articlePreferences: updatedUser.articlePreferences.map((cat) => cat._id), // Map to array of _id strings
//           },
//           accessToken, // Preserve existing accessToken
//           refreshToken, // Preserve existing refreshToken
//         })
//       );

//       setSuccess('Profile updated successfully');
//       setIsEditing(false);
//       setTimeout(() => setSuccess(''), 3000);
//     } catch (error: any) {
//       console.error('Error updating profile:', error);
//       setErrors((prev) => ({
//         ...prev,
//         firstName: error.response?.data?.message || 'Failed to update profile',
//       }));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4">
//       <div
//         className="bg-white p-6 rounded-2xl shadow-xl max-w-lg mx-auto"
//         role="main"
//         aria-label="Settings Page"
//       >
//         <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Settings</h1>
//         {success && (
//           <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-center">
//             {success}
//           </div>
//         )}

//         {/* Display User Details */}
//         {!isEditing ? (
//           <div className="space-y-4">
//             <div>
//               <label className="block text-gray-700 font-medium mb-1">First Name</label>
//               <p className="text-gray-900">{profile.firstName}</p>
//             </div>
//             <div>
//               <label className="block text-gray-700 font-medium mb-1">Last Name</label>
//               <p className="text-gray-900">{profile.lastName}</p>
//             </div>
//             <div>
//               <label className="block text-gray-700 font-medium mb-1">Phone</label>
//               <p className="text-gray-900">{profile.phone}</p>
//             </div>
//             <div>
//               <label className="block text-gray-700 font-medium mb-1">Email</label>
//               <p className="text-gray-900">{profile.email}</p>
//             </div>
//             <div>
//               <label className="block text-gray-700 font-medium mb-1">Date of Birth</label>
//               <p className="text-gray-900">{new Date(profile.dob).toLocaleDateString()}</p>
//             </div>
//             <div>
//               <label className="block text-gray-700 font-medium mb-1">Article Preferences</label>
//               <div className="flex flex-wrap gap-2">
//                 {profile.articlePreferences.length > 0 ? (
//                   profile.articlePreferences.map((categoryObj) => (
//                     <span
//                       key={categoryObj._id} // Use _id as the key
//                       className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md"
//                     >
//                       {categoryObj.name || 'Unknown'}
//                     </span>
//                   ))
//                 ) : (
//                   <p className="text-gray-500 italic">No preferences selected</p>
//                 )}
//               </div>
//             </div>
//             <div className="flex justify-end">
//               <Button
//                 onClick={handleEditToggle}
//                 className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
//               >
//                 Edit
//               </Button>
//             </div>
//           </div>
//         ) : (
//           /* Edit Form */
//           <form onSubmit={handleProfileSubmit} className="space-y-4">
//             <InputField
//               label="First Name"
//               type="text"
//               name="firstName"
//               value={editProfile.firstName}
//               onChange={handleProfileChange}
//               required
//               error={errors.firstName}
//               placeholder="Enter first name"
//             />
//             <InputField
//               label="Last Name"
//               type="text"
//               name="lastName"
//               value={editProfile.lastName}
//               onChange={handleProfileChange}
//               required
//               error={errors.lastName}
//               placeholder="Enter last name"
//             />
//             <div>
//               <label className="block text-gray-700 font-medium mb-1">Phone (Not Editable)</label>
//               <p className="text-gray-900">{profile.phone}</p>
//             </div>
//             <div>
//               <label className="block text-gray-700 font-medium mb-1">Email (Not Editable)</label>
//               <p className="text-gray-900">{profile.email}</p>
//             </div>
//             <InputField
//               label="Date of Birth"
//               type="date"
//               name="dob"
//               value={editProfile.dob}
//               onChange={handleProfileChange}
//               required
//               error={errors.dob}
//             />
//             <div>
//               <label className="block text-gray-700 font-medium mb-1">Article Preferences</label>
//               <select
//                 multiple
//                 value={editProfile.articlePreferences}
//                 onChange={handlePreferencesChange}
//                 className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               >
//                 {categories.map((category) => (
//                   <option key={category._id} value={category._id}>
//                     {category.name}
//                   </option>
//                 ))}
//               </select>
//               {errors.articlePreferences && (
//                 <p className="text-red-500 text-sm mt-1">{errors.articlePreferences}</p>
//               )}
//               <p className="text-gray-500 text-sm mt-1">
//                 Hold Ctrl (Windows) or Command (Mac) to select multiple categories
//               </p>
//             </div>
//             <div className="flex justify-end space-x-3">
//               <Button
//                 type="button"
//                 onClick={handleEditToggle}
//                 className="bg-gray-500 hover:bg-gray-600 transition-colors duration-300"
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
//               >
//                 Submit
//               </Button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SettingsPage;



import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile, getCategories } from '../services/api/userService';
import InputField from './Shared/InputField';
import Button from './Shared/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setUser } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

interface Category {
  _id: string;
  name: string;
  __v?: number;
}

interface UserProfile {
  _id: string; // Add _id to UserProfile
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dob: string;
  articlePreferences: Category[];
}

const SettingsPage: React.FC = () => {
  const dispatch = useDispatch();
  const { user, accessToken, refreshToken } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const [profile, setProfile] = useState<UserProfile>({
    _id: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    dob: '',
    articlePreferences: [],
  });

  const [editProfile, setEditProfile] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    articlePreferences: [] as string[],
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    articlePreferences: '',
  });
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    const fetchData = async () => {
      try {
        const [userData, cats] = await Promise.all([getUserProfile(), getCategories()]);
        setProfile({
          _id: userData._id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
          email: userData.email,
          dob: userData.dob.split('T')[0],
          articlePreferences: userData.articlePreferences,
        });
        setEditProfile({
          firstName: userData.firstName,
          lastName: userData.lastName,
          dob: userData.dob.split('T')[0],
          articlePreferences: userData.articlePreferences.map((cat: Category) => cat._id),
        });
        setCategories(cats);
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setErrors((prev) => ({
          ...prev,
          firstName: 'Failed to load profile',
        }));
      }
    };
    fetchData();
  }, [navigate, user]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setErrors({ firstName: '', lastName: '', dob: '', articlePreferences: '' });
    setSuccess('');
    if (!isEditing) {
      setEditProfile({
        firstName: profile.firstName,
        lastName: profile.lastName,
        dob: profile.dob,
        articlePreferences: profile.articlePreferences.map((cat) => cat._id),
      });
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditProfile((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handlePreferencesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
    setEditProfile((prev) => ({ ...prev, articlePreferences: selectedOptions }));
    setErrors((prev) => ({ ...prev, articlePreferences: '' }));
  };

  const validateProfile = () => {
    const newErrors = { firstName: '', lastName: '', dob: '', articlePreferences: '' };
    if (!editProfile.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!editProfile.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!editProfile.dob) {
      newErrors.dob = 'Date of birth is required';
    } else if (new Date(editProfile.dob) > new Date()) {
      newErrors.dob = 'Date of birth cannot be in the future';
    }
    if (editProfile.articlePreferences.length === 0) {
      newErrors.articlePreferences = 'Select at least one category';
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => !e);
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateProfile()) return;

    try {
      await updateUserProfile({
        firstName: editProfile.firstName,
        lastName: editProfile.lastName,
        dob: editProfile.dob,
        articlePreferences: editProfile.articlePreferences,
      });
      const updatedUser = await getUserProfile();
      setProfile({
        _id: updatedUser._id, // Store _id
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        phone: updatedUser.phone,
        email: updatedUser.email,
        dob: updatedUser.dob.split('T')[0],
        articlePreferences: updatedUser.articlePreferences,
      });

      dispatch(
        setUser({
          user: {
            _id: updatedUser._id, // Include _id
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            articlePreferences: updatedUser.articlePreferences.map((cat: Category) => cat._id),
          },
          accessToken,
          refreshToken,
        })
      );

      setSuccess('Profile updated successfully');
      setIsEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      setErrors((prev) => ({
        ...prev,
        firstName: error.response?.data?.message || 'Failed to update profile',
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div
        className="bg-white p-6 rounded-2xl shadow-xl max-w-lg mx-auto"
        role="main"
        aria-label="Settings Page"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Settings</h1>
        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-center">
            {success}
          </div>
        )}

        {!isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">First Name</label>
              <p className="text-gray-900">{profile.firstName}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Last Name</label>
              <p className="text-gray-900">{profile.lastName}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Phone</label>
              <p className="text-gray-900">{profile.phone}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <p className="text-gray-900">{profile.email}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Date of Birth</label>
              <p className="text-gray-900">{new Date(profile.dob).toLocaleDateString()}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Article Preferences</label>
              <div className="flex flex-wrap gap-2">
                {profile.articlePreferences.length > 0 ? (
                  profile.articlePreferences.map((categoryObj) => (
                    <span
                      key={categoryObj._id}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md"
                    >
                      {categoryObj.name || 'Unknown'}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No preferences selected</p>
                )}
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handleEditToggle}
                className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
              >
                Edit
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <InputField
              label="First Name"
              type="text"
              name="firstName"
              value={editProfile.firstName}
              onChange={handleProfileChange}
              required
              error={errors.firstName}
              placeholder="Enter first name"
            />
            <InputField
              label="Last Name"
              type="text"
              name="lastName"
              value={editProfile.lastName}
              onChange={handleProfileChange}
              required
              error={errors.lastName}
              placeholder="Enter last name"
            />
            <div>
              <label className="block text-gray-700 font-medium mb-1">Phone (Not Editable)</label>
              <p className="text-gray-900">{profile.phone}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email (Not Editable)</label>
              <p className="text-gray-900">{profile.email}</p>
            </div>
            <InputField
              label="Date of Birth"
              type="date"
              name="dob"
              value={editProfile.dob}
              onChange={handleProfileChange}
              required
              error={errors.dob}
            />
            <div>
              <label className="block text-gray-700 font-medium mb-1">Article Preferences</label>
              <select
                multiple
                value={editProfile.articlePreferences}
                onChange={handlePreferencesChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.articlePreferences && (
                <p className="text-red-500 text-sm mt-1">{errors.articlePreferences}</p>
              )}
              <p className="text-gray-500 text-sm mt-1">
                Hold Ctrl (Windows) or Command (Mac) to select multiple categories
              </p>
            </div>
            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                onClick={handleEditToggle}
                className="bg-gray-500 hover:bg-gray-600 transition-colors duration-300"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
              >
                Submit
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;