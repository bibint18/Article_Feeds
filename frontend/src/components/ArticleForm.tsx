// import React, { useState, useEffect } from 'react';
// import InputField from './Shared/InputField';
// import Button from './Shared/Button';
// import { createArticle } from '../services/api/articleService';
// import { getCloudinaryConfig } from '../services/files/cloudinary';

// interface ArticleFormProps {
//   onClose: () => void;
//   onSuccess: () => void;
// }

// const ArticleForm: React.FC<ArticleFormProps> = ({ onClose, onSuccess }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     image: null as File | null,
//     tags: '',
//     category: '',
//   });
//   const [errors, setErrors] = useState({
//     title: '',
//     description: '',
//     tags: '',
//     category: '',
//   });
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
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
//       let imageUrl = '';
//       if (formData.image) {
//         const { cloudName, uploadPreset } = getCloudinaryConfig();
//         console.log("data",cloudName,uploadPreset)
//         const uploadData = new FormData();
//         uploadData.append('file', formData.image);
//         uploadData.append('upload_preset', uploadPreset);
//         uploadData.append('cloud_name', cloudName);

//         const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
//           method: 'POST',
//           body: uploadData,
//         });
//         const data = await response.json();
//         console.log("data from cloudinary",data)
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

//       await createArticle(articleData);
//       onSuccess();
//     } catch (error: any) {
//       setErrors((prev) => ({ ...prev, description: error.message || 'Failed to create article' }));
//     }
//   };

//   useEffect(() => {
//     return () => {
//       if (imagePreview) {
//         URL.revokeObjectURL(imagePreview);
//       }
//     };
//   }, [imagePreview]);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create New Article</h2>
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
//               Create
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
import { createArticle } from '../services/api/articleService';
import axiosInstance from '../services/axiosInstance';

interface ArticleFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null as File | null,
    tags: '',
    category: '',
  });
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    tags: '',
    category: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const categories = ['Technology', 'Health', 'Sports', 'News'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
      let imageUrl = '';
      if (formData.image) {
        // Fetch Cloudinary signature from backend
        const signatureResponse = await axiosInstance.get('/cloudinary/signature');
        const { signature, timestamp, cloudName, apiKey } = signatureResponse.data;

        console.log('Signature data:', { signature, timestamp, cloudName, apiKey });

        const uploadData = new FormData();
        uploadData.append('file', formData.image);
        uploadData.append('timestamp', timestamp.toString());
        uploadData.append('signature', signature);
        uploadData.append('api_key', apiKey);
        uploadData.append('folder', 'mern_articles');

        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: uploadData,
        });
        const data = await response.json();
        console.log('Cloudinary response:', data);

        if (!data.secure_url) {
          throw new Error('Image upload failed');
        }
        imageUrl = data.secure_url;
      }

      const articleData = {
        title: formData.title,
        description: formData.description,
        image: imageUrl || undefined,
        tags: formData.tags.split(',').map((tag) => tag.trim()).filter((tag) => tag),
        category: formData.category,
      };

      await createArticle(articleData);
      onSuccess();
    } catch (error: any) {
      console.error('Error:', error);
      setErrors((prev) => ({ ...prev, description: error.message || 'Failed to create article' }));
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create New Article</h2>
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
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleForm;