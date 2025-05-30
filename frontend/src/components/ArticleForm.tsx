


// import React, { useState, useEffect } from 'react';
// import InputField from './Shared/InputField';
// import Button from './Shared/Button';
// import { createArticle, updateArticle } from '../services/api/articleService';
// import axiosInstance from '../services/axiosInstance';

// interface Article {
//   _id: string;
//   title: string;
//   description: string;
//   imageUrl: string;
//   tags: string[];
//   category: { _id: string; name: string };
// }

// interface ArticleFormProps {
//   onClose: () => void;
//   onSuccess: () => void;
//   initialData?: Article;
// }

// const ArticleForm: React.FC<ArticleFormProps> = ({ onClose, onSuccess, initialData }) => {
//   const [formData, setFormData] = useState({
//     title: initialData?.title || '',
//     description: initialData?.description || '',
//     image: null as File | null,
//     tags: initialData?.tags.join(', ') || '',
//     category: initialData?.category.name || '',
//   });
//   const [errors, setErrors] = useState({
//     title: '',
//     description: '',
//     tags: '',
//     category: '',
//   });
//   const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null);
//   const categories = ['Technology', 'Health', 'Sports', 'News'];

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: '' }));
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setFormData((prev) => ({ ...prev, image: file }));
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const validate = () => {
//     const newErrors = { title: '', description: '', tags: '', category: '' };
//     if (!formData.title.trim()) {
//       newErrors.title = 'Title is required';
//     }
//     if (!formData.description.trim()) {
//       newErrors.description = 'Description is required';
//     }
//     if (!formData.category) {
//       newErrors.category = 'Category is required';
//     }
//     setErrors(newErrors);
//     return Object.values(newErrors).every((e) => !e);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validate()) {
//       return;
//     }

//     try {
//       let imageUrl = initialData?.imageUrl || '';
//       if (formData.image) {
//         const signatureResponse = await axiosInstance.get('/cloudinary/signature');
//         const { signature, timestamp, cloudName, apiKey } = signatureResponse.data;

//         const uploadData = new FormData();
//         uploadData.append('file', formData.image);
//         uploadData.append('timestamp', timestamp.toString());
//         uploadData.append('signature', signature);
//         uploadData.append('api_key', apiKey);
//         uploadData.append('folder', 'mern_articles');

//         const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
//           method: 'POST',
//           body: uploadData,
//         });
//         const data = await response.json();

//         if (!data.secure_url) {
//           throw new Error('Image upload failed');
//         }
//         imageUrl = data.secure_url;
//       }

//       const articleData = {
//         title: formData.title,
//         description: formData.description,
//         image: imageUrl || undefined,
//         tags: formData.tags.split(',').map((tag) => tag.trim()).filter((tag) => tag),
//         category: formData.category,
//       };

//       if (initialData) {
//         await updateArticle(initialData._id, articleData);
//       } else {
//         await createArticle(articleData);
//       }
//       onSuccess();
//     } catch (error: any) {
//       console.error('Error:', error);
//       setErrors((prev) => ({ ...prev, description: error.message || 'Failed to save article' }));
//     }
//   };

//   useEffect(() => {
//     return () => {
//       if (imagePreview && !initialData?.imageUrl) {
//         URL.revokeObjectURL(imagePreview);
//       }
//     };
//   }, [imagePreview, initialData]);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//           {initialData ? 'Edit Article' : 'Create New Article'}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <InputField
//             label="Title"
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//             error={errors.title}
//             placeholder="Enter article title"
//           />
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               required
//               className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                 errors.description ? 'border-red-500' : 'border-gray-300'
//               }`}
//               rows={5}
//               placeholder="Enter article description"
//             />
//             {errors.description && <p className="text-red-500 text-sm mt-2">{errors.description}</p>}
//           </div>
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Image</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="w-full p-3 border rounded-lg"
//             />
//             {imagePreview && (
//               <img src={imagePreview} alt="Preview" className="mt-4 w-full h-48 object-cover rounded-lg" />
//             )}
//           </div>
//           <InputField
//             label="Tags (comma-separated)"
//             type="text"
//             name="tags"
//             value={formData.tags}
//             onChange={handleChange}
//             error={errors.tags}
//             placeholder="e.g., tech, news"
//           />
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Category</label>
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               required
//               className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                 errors.category ? 'border-red-500' : 'border-gray-300'
//               }`}
//             >
//               <option value="">Select a category</option>
//               {categories.map((category) => (
//                 <option key={category} value={category}>
//                   {category}
//                 </option>
//               ))}
//             </select>
//             {errors.category && <p className="text-red-500 text-sm mt-2">{errors.category}</p>}
//           </div>
//           <div className="flex justify-end space-x-4">
//             <Button
//               onClick={onClose}
//               className="bg-gray-600 hover:bg-gray-700 transition-colors duration-300"
//             >
//               Cancel
//             </Button>
//             <Button type="submit" className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300">
//               {initialData ? 'Update' : 'Create'}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ArticleForm;





// import React, { useState, useEffect } from 'react';
// import InputField from './Shared/InputField';
// import Button from './Shared/Button';
// import { createArticle, updateArticle } from '../services/api/articleService';
// import axiosInstance from '../services/axiosInstance';

// interface Article {
//   _id: string;
//   title: string;
//   description: string;
//   imageUrl: string;
//   tags: string[];
//   category: { _id: string; name: string };
// }

// interface ArticleFormProps {
//   onClose: () => void;
//   onSuccess: () => void;
//   initialData?: Article;
// }

// const ArticleForm: React.FC<ArticleFormProps> = ({ onClose, onSuccess, initialData }) => {
//   const [formData, setFormData] = useState({
//     title: initialData?.title || '',
//     description: initialData?.description || '',
//     image: null as File | null,
//     tags: initialData?.tags.join(', ') || '',
//     category: initialData?.category.name || '',
//   });
//   const [errors, setErrors] = useState({
//     title: '',
//     description: '',
//     tags: '',
//     category: '',
//   });
//   const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null);
//   const categories = ['Technology', 'Health', 'Sports', 'News'];

//   // Handle escape key to close modal
//   useEffect(() => {
//     const handleEscape = (event: KeyboardEvent) => {
//       if (event.key === 'Escape') {
//         onClose();
//       }
//     };
//     document.addEventListener('keydown', handleEscape);
//     return () => document.removeEventListener('keydown', handleEscape);
//   }, [onClose]);

//   // Prevent background scroll when modal is open
//   useEffect(() => {
//     document.body.style.overflow = 'hidden';
//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: '' }));
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setFormData((prev) => ({ ...prev, image: file }));
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const validate = () => {
//     const newErrors = { title: '', description: '', tags: '', category: '' };
//     if (!formData.title.trim()) {
//       newErrors.title = 'Title is required';
//     }
//     if (!formData.description.trim()) {
//       newErrors.description = 'Description is required';
//     }
//     if (!formData.category) {
//       newErrors.category = 'Category is required';
//     }
//     setErrors(newErrors);
//     return Object.values(newErrors).every((e) => !e);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validate()) {
//       return;
//     }

//     try {
//   //     let imageUrl = initialData?.imageUrl || '';
//   //     if (formData.image) {
//   //       const signatureResponse = await axiosInstance.get('/cloudinary/signature');
//   //       const { signature, timestamp, cloudName, apiKey } = signatureResponse.data;
//   //       console.log("signature",signature,timestamp,cloudName,apiKey)
//   //       const uploadData = new FormData();
//   //       uploadData.append('file', formData.image);
//   //       uploadData.append('timestamp', timestamp.toString());
//   //       uploadData.append('signature', signature);
//   //       uploadData.append('api_key', apiKey);
//   //       uploadData.append('folder', 'mern_articles');
//   //       console.log('uploaddata',uploadData)

//   //       const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
//   //         method: 'POST',
//   //         body: uploadData,
//   //       });
//   //       console.log("response cloudinary",response)
//   //       const data = await response.json();

//   //       if (!data.secure_url) {
//   //         throw new Error('Image upload failed');
//   //       }
//   //       imageUrl = data.secure_url;
//   //     }

//   //     const articleData = {
//   //       title: formData.title,
//   //       description: formData.description,
//   //       image: imageUrl || undefined,
//   //       tags: formData.tags.split(',').map((tag) => tag.trim()).filter((tag) => tag),
//   //       category: formData.category,
//   //     };

//   //     if (initialData) {
//   //       await updateArticle(initialData._id, articleData);
//   //     } else {
//   //       await createArticle(articleData);
//   //     }
//   //     onSuccess();
//   //   } catch (error: any) {
//   //     console.error('Error:', error);
//   //     setErrors((prev) => ({ ...prev, description: error.message || 'Failed to save article' }));
//   //   }
//   // };

//   let imageUrl = initialData?.imageUrl || '';
//       if (formData.image) {
//         try {
//           const signatureResponse = await axiosInstance.get('/cloudinary/signature');
//           const { signature, timestamp, cloudName, apiKey } = signatureResponse.data;
//           console.log('Signature:', { signature, timestamp, cloudName, apiKey });

//           if (!formData.image || !(formData.image instanceof File)) {
//             throw new Error('No valid image file selected');
//           }

//           const uploadData = new FormData();
//           uploadData.append('file', formData.image);
//           uploadData.append('timestamp', timestamp.toString());
//           uploadData.append('signature', signature);
//           uploadData.append('api_key', apiKey);
//           uploadData.append('folder', 'mern_articles');

//           // Log FormData contents
//           for (const [key, value] of uploadData.entries()) {
//             console.log(`FormData ${key}:`, value);
//           }

//           const controller = new AbortController();
//           const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

//           const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
//             method: 'POST',
//             body: uploadData,
//             signal: controller.signal,
//           });

//           clearTimeout(timeoutId);
//           console.log('Cloudinary response:', response);

//           const data = await response.json();
//           console.log('Cloudinary data:', data);

//           if (!data.secure_url) {
//             throw new Error(`Image upload failed: ${data.error?.message || 'No secure_url'}`);
//           }
//           imageUrl = data.secure_url;
//         } catch (imageError: any) {
//           console.warn('Image upload failed:', imageError.message);
//           setErrors((prev) => ({
//             ...prev,
//             description: 'Failed to upload image. Saving article without image.',
//           }));
//           imageUrl = ''; // Proceed without image
//         }
//       }

//       const articleData = {
//         title: formData.title,
//         description: formData.description,
//         image: imageUrl || undefined,
//         tags: formData.tags.split(',').map((tag) => tag.trim()).filter((tag) => tag),
//         category: formData.category,
//       };

//       if (initialData) {
//         await updateArticle(initialData._id, articleData);
//       } else {
//         await createArticle(articleData);
//       }
//       onSuccess();
//     } catch (error: any) {
//       console.error('Error saving article:', error);
//       setErrors((prev) => ({
//         ...prev,
//         description: error.message || 'Failed to save article. Please try again.',
//       }));
//     }
//   };

//   useEffect(() => {
//     return () => {
//       if (imagePreview && !initialData?.imageUrl) {
//         URL.revokeObjectURL(imagePreview);
//       }
//     };
//   }, [imagePreview, initialData]);

//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 overflow-y-auto"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto my-4 sm:my-8 relative"
//         onClick={(e) => e.stopPropagation()}
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby="modal-title"
//       >
//         {/* Close button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
//           aria-label="Close modal"
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>

//         <h2 id="modal-title" className="text-2xl font-bold text-gray-800 mb-6 text-center">
//           {initialData ? 'Edit Article' : 'Create New Article'}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <InputField
//             label="Title"
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//             error={errors.title}
//             placeholder="Enter article title"
//           />
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               required
//               className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                 errors.description ? 'border-red-500' : 'border-gray-300'
//               }`}
//               rows={5}
//               placeholder="Enter article description"
//             />
//             {errors.description && <p className="text-red-500 text-sm mt-2">{errors.description}</p>}
//           </div>
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Image</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="w-full p-3 border rounded-lg"
//             />
//             {imagePreview && (
//               <img src={imagePreview} alt="Preview" className="mt-4 w-full h-48 object-cover rounded-lg" />
//             )}
//           </div>
//           <InputField
//             label="Tags (comma-separated)"
//             type="text"
//             name="tags"
//             value={formData.tags}
//             onChange={handleChange}
//             error={errors.tags}
//             placeholder="e.g., tech, news"
//           />
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Category</label>
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               required
//               className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                 errors.category ? 'border-red-500' : 'border-gray-300'
//               }`}
//             >
//               <option value="">Select a category</option>
//               {categories.map((category) => (
//                 <option key={category} value={category}>
//                   {category}
//                 </option>
//               ))}
//             </select>
//             {errors.category && <p className="text-red-500 text-sm mt-2">{errors.category}</p>}
//           </div>
//           <div className="flex justify-end space-x-4">
//             <Button
//               onClick={onClose}
//               className="bg-gray-600 hover:bg-gray-700 transition-colors duration-300"
//             >
//               Cancel
//             </Button>
//             <Button type="submit" className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300">
//               {initialData ? 'Update' : 'Create'}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ArticleForm;










import React, { useState, useEffect } from 'react';
import InputField from './Shared/InputField';
import Button from './Shared/Button';
import { createArticle, updateArticle } from '../services/api/articleService';
import axiosInstance from '../services/axiosInstance';

interface Article {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  category: { _id: string; name: string };
}

interface ArticleFormProps {
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Article;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ onClose, onSuccess, initialData }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    image: null as File | null,
    tags: initialData?.tags.join(', ') || '',
    category: initialData?.category.name || '',
  });
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    tags: '',
    category: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null);
  const categories = ['Technology', 'Health', 'Sports', 'News'];

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Selected file:', file.name, file.type, file.size); // Debug file
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    const newErrors = { title: '', description: '', tags: '', category: '' };
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => !e);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    try {
      let imageUrl = initialData?.imageUrl || '';
      if (formData.image) {
        try {
          const signatureResponse = await axiosInstance.get('/cloudinary/signature');
          const { signature, timestamp, cloudName, apiKey } = signatureResponse.data;
          console.log('Signature:', { signature, timestamp, cloudName, apiKey });

          if (!formData.image || !(formData.image instanceof File)) {
            throw new Error('No valid image file selected');
          }

          const uploadData = new FormData();
          uploadData.append('file', formData.image);
          uploadData.append('timestamp', timestamp.toString());
          uploadData.append('signature', signature);
          uploadData.append('api_key', apiKey);
          uploadData.append('folder', 'mern_articles');

          // Log FormData contents
          for (const [key, value] of uploadData.entries()) {
            console.log(`FormData ${key}:`, value);
          }

          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout

          const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: uploadData,
            signal: controller.signal,
          });

          clearTimeout(timeoutId);
          console.log('Cloudinary response status:', response.status, response.statusText);

          const data = await response.json();
          console.log('Cloudinary data:', data);

          if (!response.ok) {
            throw new Error(`Image upload failed: ${data.error?.message || 'Unknown error'}`);
          }

          if (!data.secure_url) {
            throw new Error(`Image upload failed: No secure_url in response`);
          }
          imageUrl = data.secure_url;
        } catch (imageError: any) {
          console.warn('Image upload failed:', imageError.message);
          setErrors((prev) => ({
            ...prev,
            description: `Failed to upload image: ${imageError.message}. Saving article without image.`,
          }));
          imageUrl = ''; // Proceed without image
        }
      }

      const articleData = {
        title: formData.title,
        description: formData.description,
        image: imageUrl || undefined,
        tags: formData.tags.split(',').map((tag) => tag.trim()).filter((tag) => tag),
        category: formData.category,
      };

      if (initialData) {
        await updateArticle(initialData._id, articleData);
      } else {
        await createArticle(articleData);
      }
      onSuccess();
    } catch (error: any) {
      console.error('Error saving article:', error);
      setErrors((prev) => ({
        ...prev,
        description: error.message || 'Failed to save article. Please try again.',
      }));
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview && !initialData?.imageUrl) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview, initialData]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto my-4 sm:my-8 relative"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 id="modal-title" className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {initialData ? 'Edit Article' : 'Create New Article'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="Title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            error={errors.title}
            placeholder="Enter article title"
          />
          <div>
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              rows={5}
              placeholder="Enter article description"
            />
            {errors.description && <p className="text-red-500 text-sm mt-2">{errors.description}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 border rounded-lg"
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-4 w-full h-48 object-cover rounded-lg" />
            )}
          </div>
          <InputField
            label="Tags (comma-separated)"
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            error={errors.tags}
            placeholder="e.g., tech, news"
          />
          <div>
            <label className="block text-gray-700 font-medium mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-2">{errors.category}</p>}
          </div>
          <div className="flex justify-end space-x-4">
            <Button
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 transition-colors duration-300"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300">
              {initialData ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleForm;